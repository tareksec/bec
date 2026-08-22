'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import Subscribe from '@/components/sections/home2/Subscribe'
import { supabase } from '@/lib/supabase/client'
import styles from './blog.module.scss'

const DEFAULT_CATEGORIES = [
  { id: 'cat-all', name: 'All' },
  { id: 'cat-career', name: 'Career Tips' },
  { id: 'cat-business', name: 'Business' },
  { id: 'cat-insights', name: 'Industry Insights' },
  { id: 'cat-training', name: 'Training' },
]

function calculateReadTime(text = '') {
  const clean = text.replace(/<[^>]*>/g, '')
  const words = clean.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function getExcerpt(post) {
  if (post?.excerpt) return post.excerpt
  const text = (post?.content || post?.description || '').replace(/<[^>]*>/g, '').trim()
  if (!text) return 'Explore professional insights and strategies from the Bangladesh Executive Chamber.'
  return text.slice(0, 140) + (text.length > 140 ? '...' : '')
}

function getPostCategory(post) {
  if (post?.post_categories && post.post_categories.length > 0 && post.post_categories[0]?.categories?.name) {
    return post.post_categories[0].categories.name
  }
  return post?.category || 'General'
}

function getMediumSlug(title = '') {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getSafeImageUrl(url, fallback = '/assets/images/resource/news-1.jpg') {
  if (!url || typeof url !== 'string') return fallback
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed
  }
  return fallback
}

function formatDate(dateStr) {
  if (!dateStr) return 'Recent'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Recent'
  }
}

function BlogGridContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get('q') || ''

  const [activeCategory, setActiveCategory] = useState('All')
  const [blogPosts, setBlogPosts] = useState([])
  const [mediumPosts, setMediumPosts] = useState([])
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(q)

  useEffect(() => {
    setSearchInput(q)
  }, [q])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      let postsQuery = null
      let catsQuery = null

      if (supabase) {
        postsQuery = supabase
          .from('posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            content,
            cover_image,
            status,
            created_at,
            author_id,
            post_categories (
              categories (id, name, slug)
            ),
            post_hashtags (
              hashtags (id, name)
            )
          `)
          .order('created_at', { ascending: false })

        if (q) {
          postsQuery = postsQuery.ilike('title', `%${q}%`)
        }

        catsQuery = supabase.from('categories').select('id, name, slug').order('name')
      }

      const [postsRes, catsRes, mediumRes] = await Promise.all([
        postsQuery ? postsQuery : Promise.resolve({ data: [] }),
        catsQuery ? catsQuery : Promise.resolve({ data: [] }),
        fetch('/api/medium').catch(() => null),
      ])

      // Handle categories
      if (catsRes?.data && catsRes.data.length > 0) {
        const uniqueCats = [{ id: 'cat-all', name: 'All' }, ...catsRes.data]
        setCategories(uniqueCats)
      } else {
        setCategories(DEFAULT_CATEGORIES)
      }

      // Handle Supabase posts
      if (postsRes?.data && Array.isArray(postsRes.data)) {
        // Show published posts or all non-archived posts
        const publishedPosts = postsRes.data.filter((p) => p.status === 'published')
        const visiblePosts = publishedPosts.length > 0
          ? publishedPosts
          : postsRes.data.filter((p) => p.status !== 'archived')
        setBlogPosts(visiblePosts.length > 0 ? visiblePosts : postsRes.data)
      } else {
        if (postsRes?.error) {
          console.error('Supabase posts fetch error:', postsRes.error)
        }
        setBlogPosts([])
      }

      // Handle Medium posts
      if (mediumRes?.ok) {
        const mediumData = await mediumRes.json()
        setMediumPosts(Array.isArray(mediumData) ? mediumData : [])
      } else {
        setMediumPosts([])
      }

      setLoading(false)
    }

    fetchData()
  }, [q])

  // Count posts per category for the sidebar
  const categoryCounts = useMemo(() => {
    const counts = {}
    categories.forEach((c) => {
      counts[c.name] = 0
    })
    blogPosts.forEach((post) => {
      if (post.post_categories && post.post_categories.length > 0) {
        post.post_categories.forEach((pc) => {
          if (pc.categories?.name) {
            counts[pc.categories.name] = (counts[pc.categories.name] || 0) + 1
          }
        })
      } else {
        const cat = getPostCategory(post)
        counts[cat] = (counts[cat] || 0) + 1
      }
    })
    return counts
  }, [categories, blogPosts])

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (!activeCategory || activeCategory.toLowerCase() === 'all') {
      return blogPosts
    }
    return blogPosts.filter((post) => {
      const cat = getPostCategory(post)
      if (cat.toLowerCase() === activeCategory.toLowerCase()) return true
      if (post.post_categories && post.post_categories.length > 0) {
        return post.post_categories.some(
          (pc) => pc.categories?.name?.toLowerCase() === activeCategory.toLowerCase()
        )
      }
      return false
    })
  }, [blogPosts, activeCategory])

  // Trending top 5 posts
  const trendingPosts = useMemo(() => {
    return blogPosts.slice(0, 5)
  }, [blogPosts])

  // Split featured (first post) and remaining grid posts
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : []

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchInput.trim())}`)
    } else {
      router.push('/blog')
    }
  }

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName)
    if (q) {
      router.push('/blog')
    }
  }

  return (
    <Layout headerStyle={3} footerStyle={2}>
      <div className={styles.blogWrapper}>
        {/* TOP SECTION — HERO BAR */}
        <section className={styles.heroBar}>
          <div className={styles.heroContainer}>
            <div className={styles.heroTop}>
              <div className={styles.heroHeadingWrap}>
                <div className={styles.heroSubheading}>Bangladesh Executive Chamber</div>
                <h1 className={styles.heroTitle}>Articles &amp; Insights</h1>
                <p className={styles.heroSubtitle}>
                  Explore expert analysis, leadership perspectives, and actionable strategies shaping industries across Bangladesh.
                </p>
              </div>

              {/* Search Bar */}
              <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  name="q"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles, topics..."
                  aria-label="Search articles"
                />
                <button type="submit" aria-label="Search button">
                  <i className="icon-1"></i>
                </button>
              </form>
            </div>

            {/* Category Filter Pills */}
            <div className={styles.categoryPillsScroll}>
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase()
                return (
                  <button
                    key={cat.id || cat.name}
                    type="button"
                    className={`${styles.filterPill} ${isActive ? styles.activePill : ''}`}
                    onClick={() => handleCategoryClick(cat.name)}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* MAIN CONTAINER — TWO COLUMN GRID (70% / 30%) */}
        <div className={styles.mainContainer}>
          <div className={styles.blogLayoutGrid}>
            {/* LEFT COLUMN (70% WIDTH) */}
            <main className={styles.mainColumn}>
              {loading ? (
                // SKELETON LOADING STATE
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div className={styles.skeletonCard}>
                    <div className={styles.skeletonImg} />
                    <div className={styles.skeletonContent}>
                      <div className={`${styles.skeletonLine} ${styles.titleLine}`} />
                      <div className={styles.skeletonLine} />
                      <div className={`${styles.skeletonLine} ${styles.shortLine}`} />
                    </div>
                  </div>
                  <div className={styles.postGrid}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={styles.skeletonCard}>
                        <div className={styles.skeletonImg} />
                        <div className={styles.skeletonContent}>
                          <div className={`${styles.skeletonLine} ${styles.titleLine}`} />
                          <div className={styles.skeletonLine} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredPosts.length === 0 ? (
                // EMPTY STATE
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <i className="icon-38"></i>
                  </div>
                  <h3>{blogPosts.length === 0 ? 'No Published Articles Yet' : 'No Articles Found'}</h3>
                  <p>
                    {q
                      ? `We couldn't find any articles matching "${q}". Try another keyword or browse all topics.`
                      : blogPosts.length === 0
                      ? 'Articles published from the admin dashboard will appear here.'
                      : `There are currently no articles in the "${activeCategory}" category.`}
                  </p>
                  {blogPosts.length > 0 ? (
                    <button
                      type="button"
                      className={styles.resetBtn}
                      onClick={() => {
                        setActiveCategory('All')
                        if (q) router.push('/blog')
                      }}
                    >
                      View All Articles
                    </button>
                  ) : (
                    <Link href="/admin/posts/create" className={styles.resetBtn}>
                      Create an Article
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  {/* FEATURED POST (FIRST / LATEST POST) */}
                  {featuredPost && (
                    <Link
                      href={`/blog-details?slug=${encodeURIComponent(featuredPost.slug || '')}`}
                      className={styles.featuredCard}
                    >
                      <div className={styles.featuredImageWrapper}>
                        <img
                          src={getSafeImageUrl(featuredPost.cover_image, '/assets/images/placeholder.jpg')}
                          alt={featuredPost.title || 'Featured Article'}
                          className={styles.featuredImg}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/assets/images/placeholder.jpg'
                          }}
                        />
                        <span className={styles.categoryBadge}>
                          {getPostCategory(featuredPost)}
                        </span>
                      </div>

                      <div className={styles.featuredContent}>
                        <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                        <p className={styles.featuredExcerpt}>{getExcerpt(featuredPost)}</p>

                        <div className={styles.metaRow}>
                          <div className={styles.authorWrap}>
                            <div className={styles.authorAvatar}>
                              {featuredPost.author ? featuredPost.author.charAt(0).toUpperCase() : 'B'}
                            </div>
                            <span className={styles.authorName}>
                              {featuredPost.author || 'BEC Editorial'}
                            </span>
                          </div>

                          <div className={styles.metaDetails}>
                            <span>{formatDate(featuredPost.created_at)}</span>
                            <span className={styles.dotSeparator}></span>
                            <span>{calculateReadTime(featuredPost.content || featuredPost.excerpt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* POST GRID (REMAINING POSTS - 2 COLUMNS) */}
                  {gridPosts.length > 0 && (
                    <div className={styles.postGrid}>
                      {gridPosts.map((post) => {
                        const postCat = getPostCategory(post)
                        const postReadTime = calculateReadTime(post.content || post.excerpt)

                        return (
                          <Link
                            key={post.id || post.slug}
                            href={`/blog-details?slug=${encodeURIComponent(post.slug || '')}`}
                            className={styles.postCard}
                          >
                            <div className={styles.postCardImageWrap}>
                              <img
                                src={getSafeImageUrl(post.cover_image, '/assets/images/placeholder.jpg')}
                                alt={post.title || 'Article Cover'}
                                className={styles.postCardImg}
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = '/assets/images/placeholder.jpg'
                                }}
                              />
                              <span className={styles.categoryBadge}>{postCat}</span>
                            </div>

                            <div className={styles.postCardContent}>
                              <h3 className={styles.postCardTitle}>{post.title}</h3>
                              <p className={styles.postCardExcerpt}>{getExcerpt(post)}</p>

                              <div className={styles.postCardMeta}>
                                <span>{formatDate(post.created_at)}</span>
                                <span className={styles.dotSeparator}></span>
                                <span>{postReadTime}</span>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </main>

            {/* RIGHT COLUMN (30% WIDTH) — SIDEBAR */}
            <aside className={styles.sidebarColumn}>
              {/* 1. TRENDING SECTION (1-5 NUMBERED LIST) */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarTitleWrap}>
                  <h3 className={styles.sidebarTitle}>
                    <span>Trending Now</span>
                  </h3>
                  <span className={styles.sidebarTitleBadge}>Top 5</span>
                </div>

                <ul className={styles.trendingList}>
                  {trendingPosts.map((item, index) => {
                    const rank = String(index + 1).padStart(2, '0')
                    return (
                      <li key={item.id || item.slug}>
                        <Link
                          href={`/blog-details?slug=${encodeURIComponent(item.slug || '')}`}
                          className={styles.trendingItem}
                        >
                          <span className={styles.trendingNumber}>{rank}</span>
                          <div className={styles.trendingContent}>
                            <h4 className={styles.trendingTitle}>{item.title}</h4>
                            <span className={styles.trendingDate}>{formatDate(item.created_at)}</span>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* 2. CATEGORIES SECTION */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarTitleWrap}>
                  <h3 className={styles.sidebarTitle}>Categories</h3>
                </div>

                <ul className={styles.categoriesList}>
                  {categories.map((cat) => {
                    const isAll = cat.name.toLowerCase() === 'all'
                    const count = isAll ? blogPosts.length : (categoryCounts[cat.name] || 0)
                    const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase()

                    return (
                      <li key={cat.id || cat.name}>
                        <a
                          href="#"
                          className={`${styles.categoryItem} ${isActive ? styles.activeCategoryItem : ''}`}
                          onClick={(e) => {
                            e.preventDefault()
                            handleCategoryClick(cat.name)
                          }}
                        >
                          <span>{cat.name}</span>
                          <span className={styles.categoryCount}>{count}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* 3. MEDIUM POSTS SECTION */}
              {mediumPosts.length > 0 && (
                <div className={styles.sidebarCard}>
                  <div className={styles.sidebarTitleWrap}>
                    <h3 className={styles.sidebarTitle}>Medium Publications</h3>
                    <span className={styles.sidebarTitleBadge}>RSS</span>
                  </div>

                  <ul className={styles.mediumList}>
                    {mediumPosts.slice(0, 3).map((mPost, idx) => {
                      const mSlug = getMediumSlug(mPost.title)
                      return (
                        <li key={mPost.guid || idx}>
                          <Link href={`/blog/medium/${mSlug}`} className={styles.mediumItem}>
                            <div className={styles.mediumMeta}>
                              <span className={styles.mediumBadge}>M</span>
                              <span className={styles.mediumDate}>{formatDate(mPost.pubDate)}</span>
                            </div>
                            <h4 className={styles.mediumTitle}>{mPost.title}</h4>
                            <span className={styles.mediumLink}>
                              Read on Medium &rarr;
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <Subscribe />
    </Layout>
  )
}

export default function Blog_Grid() {
  return (
    <div className="boxed_wrapper">
      <Suspense fallback={<div style={{ padding: '80px 20px', textAlign: 'center' }}>Loading BEC Insights...</div>}>
        <BlogGridContent />
      </Suspense>
    </div>
  )
}