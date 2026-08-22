'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import Subscribe from '@/components/sections/home2/Subscribe'
import { supabase } from '@/lib/supabase/client'
import styles from './post.module.scss'

function calculateReadTime(text = '') {
  const clean = text.replace(/<[^>]*>/g, '')
  const words = clean.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function formatDate(dateStr) {
  if (!dateStr) return 'Recently Published'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Recently Published'
  }
}

function slugify(text = '') {
  return text
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

function BlogDetailsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = searchParams.get('slug')
  const id = searchParams.get('id')

  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Interactive states
  const [scrollProgress, setScrollProgress] = useState(0)
  const [toc, setToc] = useState([])
  const [activeHeadingId, setActiveHeadingId] = useState('')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const contentRef = useRef(null)

  // 1. Fetch Post & Related Posts
  useEffect(() => {
    async function loadPostData() {
      if (!slug && !id) {
        setLoading(false)
        setError('No post identifier provided.')
        return
      }

      setLoading(true)
      setError(null)

      if (!supabase) {
        setLoading(false)
        setError('Database connection is not available.')
        return
      }

      let query = supabase
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
          author,
          post_categories (
            category_id,
            categories (id, name, slug)
          ),
          post_hashtags (
            hashtag_id,
            hashtags (id, name, slug)
          )
        `)

      query = slug ? query.eq('slug', slug) : query.eq('id', id)
      let { data, error: fetchErr } = await query.maybeSingle()

      // Fallback: try ID if slug failed
      if (!data && slug && id) {
        const idQuery = await supabase.from('posts').select('*').eq('id', id).maybeSingle()
        if (idQuery.data) {
          data = idQuery.data
          fetchErr = null
        }
      }

      if (fetchErr || !data) {
        setError('Article could not be found or has been moved.')
        setPost(null)
      } else {
        setPost(data)

        // Fetch Related Posts (up to 3)
        const primaryCatId = data.post_categories?.[0]?.category_id
        let relatedQuery = supabase
          .from('posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            cover_image,
            created_at,
            post_categories (
              categories (id, name, slug)
            )
          `)
          .neq('id', data.id)
          .order('created_at', { ascending: false })
          .limit(3)

        if (primaryCatId) {
          relatedQuery = relatedQuery.eq('post_categories.category_id', primaryCatId)
        }

        const { data: relData } = await relatedQuery
        if (relData && relData.length > 0) {
          setRelatedPosts(relData)
        } else {
          // Fallback: 3 most recent posts
          const { data: recentData } = await supabase
            .from('posts')
            .select(`
              id,
              title,
              slug,
              excerpt,
              cover_image,
              created_at,
              post_categories (
                categories (id, name, slug)
              )
            `)
            .neq('id', data.id)
            .order('created_at', { ascending: false })
            .limit(3)

          setRelatedPosts(recentData || [])
        }
      }

      setLoading(false)
    }

    loadPostData()
  }, [slug, id])

  // 2. Reading Progress Bar calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) {
        setScrollProgress(0)
        return
      }
      const currentScroll = window.scrollY
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3. Generate Table of Contents (TOC) & Heading IDs
  useEffect(() => {
    if (!post || !contentRef.current) return

    const headings = contentRef.current.querySelectorAll('h2, h3')
    const items = []

    headings.forEach((heading, idx) => {
      let headId = heading.getAttribute('id')
      if (!headId) {
        headId = slugify(heading.textContent) || `heading-${idx}`
        heading.setAttribute('id', headId)
      }

      items.push({
        id: headId,
        text: heading.textContent || `Section ${idx + 1}`,
        level: heading.tagName.toLowerCase(),
      })
    })

    setToc(items)

    // Heading Intersection Observer for active TOC highlight
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    )

    headings.forEach((h) => observer.observe(h))

    return () => {
      headings.forEach((h) => observer.unobserve(h))
      observer.disconnect()
    }
  }, [post])

  // Smooth scroll handler
  const scrollToHeading = (e, headingId) => {
    e.preventDefault()
    const targetElement = document.getElementById(headingId)
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      })
      setActiveHeadingId(headingId)
      setMobileTocOpen(false)
    }
  }

  // Copy link handler
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const categoryName = post?.post_categories?.[0]?.categories?.name || post?.category || 'Insights'
  const readTime = calculateReadTime(post?.content || post?.excerpt)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const currentTitle = post?.title || 'BEC Article'

  return (
    <Layout headerStyle={3} footerStyle={2}>
      {/* 1. TOP 3px FIXED READING PROGRESS BAR */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <div className={styles.pageWrapper}>
        {loading ? (
          // SKELETON LOADING STATE
          <div className={styles.skeletonDetail}>
            <div className={styles.skeletonHero} />
            <div className={styles.skeletonTitle} />
            <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee' }} />
              <div style={{ flex: 1 }}>
                <div className={`${styles.skeletonParagraph} ${styles.short}`} />
                <div style={{ width: '30%', height: 12, background: '#eee', borderRadius: 4 }} />
              </div>
            </div>
            <div className={styles.skeletonParagraph} />
            <div className={styles.skeletonParagraph} />
            <div className={`${styles.skeletonParagraph} ${styles.short}`} />
          </div>
        ) : error || !post ? (
          // ERROR STATE
          <div className={styles.errorBox}>
            <h3>Article Not Found</h3>
            <p>{error || 'The requested article could not be loaded.'}</p>
            <Link href="/blog" className={styles.backBtn}>
              &larr; Back to Articles
            </Link>
          </div>
        ) : (
          <div className={styles.articleLayout}>
            {/* MAIN ARTICLE AREA (MAX 780px) */}
            <article className={styles.articleMain}>
              {/* HERO COVER IMAGE */}
              <div className={styles.heroImageWrap}>
                <img
                  src={getSafeImageUrl(post.cover_image, '/assets/images/placeholder.jpg')}
                  alt={post.title}
                  className={styles.heroImage}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/assets/images/placeholder.jpg'
                  }}
                />
              </div>

              {/* BADGE ROW: CATEGORY + READ TIME */}
              <div className={styles.badgeRow}>
                <span className={styles.categoryBadge}>{categoryName}</span>
                <span className={styles.readTimeBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {readTime}
                </span>
              </div>

              {/* HEADER */}
              <header className={styles.postHeader}>
                <h1 className={styles.postTitle}>{post.title}</h1>
                {post.excerpt && <p className={styles.postExcerpt}>{post.excerpt}</p>}

                {/* AUTHOR & SHARE BAR */}
                <div className={styles.authorBar}>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      {post.author ? post.author.charAt(0).toUpperCase() : 'B'}
                    </div>
                    <div className={styles.authorMeta}>
                      <span className={styles.authorName}>{post.author || 'BEC Executive'}</span>
                      <span className={styles.publishDate}>{formatDate(post.created_at)}</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className={styles.shareButtons}>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                      title="Share on LinkedIn"
                      aria-label="Share on LinkedIn"
                    >
                      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                      title="Share on X (Twitter)"
                      aria-label="Share on X"
                    >
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                      title="Share on Facebook"
                      aria-label="Share on Facebook"
                    >
                      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.615V8z" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`${styles.shareBtn} ${styles.copyBtn}`}
                      title="Copy link to article"
                      aria-label="Copy Link"
                    >
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      {copied && <span className={styles.copyToast}>Copied!</span>}
                    </button>
                  </div>
                </div>
              </header>

              {/* MOBILE TABLE OF CONTENTS ACCORDION */}
              {toc.length > 0 && (
                <div className={styles.mobileTocAccordion}>
                  <div
                    className={styles.mobileTocHeader}
                    onClick={() => setMobileTocOpen(!mobileTocOpen)}
                  >
                    <span>Table of Contents ({toc.length} sections)</span>
                    <span>{mobileTocOpen ? '▲' : '▼'}</span>
                  </div>
                  {mobileTocOpen && (
                    <div className={styles.mobileTocBody}>
                      <ul className={styles.tocList}>
                        {toc.map((item) => (
                          <li
                            key={item.id}
                            className={`${styles.tocItem} ${item.level === 'h3' ? styles.tocLevel3 : ''}`}
                          >
                            <a
                              href={`#${item.id}`}
                              className={`${styles.tocLink} ${activeHeadingId === item.id ? styles.activeTocLink : ''}`}
                              onClick={(e) => scrollToHeading(e, item.id)}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ARTICLE BODY CONTENT */}
              <div
                ref={contentRef}
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />

              {/* TAGS / HASHTAGS ROW */}
              {post.post_hashtags && post.post_hashtags.length > 0 && (
                <div className={styles.tagsRow}>
                  <span className={styles.tagsLabel}>Tags:</span>
                  {post.post_hashtags.map((ph) => {
                    const tag = ph.hashtags
                    if (!tag) return null
                    return (
                      <Link
                        key={tag.id || tag.name}
                        href={`/blog?q=${encodeURIComponent(tag.name)}`}
                        className={styles.tagPill}
                      >
                        #{tag.name}
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* RELATED POSTS (3 CARDS IN A ROW) */}
              {relatedPosts.length > 0 && (
                <section className={styles.relatedSection}>
                  <div className={styles.relatedTitleWrap}>
                    <h3>Related Insights</h3>
                    <p>Continue exploring relevant industry analysis and leadership strategies.</p>
                  </div>

                  <div className={styles.relatedGrid}>
                    {relatedPosts.map((rel) => {
                      const relCat = rel.post_categories?.[0]?.categories?.name || 'General'
                      return (
                        <Link
                          key={rel.id || rel.slug}
                          href={`/blog-details?slug=${encodeURIComponent(rel.slug || '')}`}
                          className={styles.relatedCard}
                        >
                          <div className={styles.relatedImageWrap}>
                            <img
                              src={getSafeImageUrl(rel.cover_image, '/assets/images/placeholder.jpg')}
                              alt={rel.title || 'Related Article'}
                              className={styles.relatedImg}
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = '/assets/images/placeholder.jpg'
                              }}
                            />
                            <span className={styles.relatedBadge}>{relCat}</span>
                          </div>

                          <div className={styles.relatedContent}>
                            <h4 className={styles.relatedCardTitle}>{rel.title}</h4>
                            <span className={styles.relatedDate}>{formatDate(rel.created_at)}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )}
            </article>

            {/* DESKTOP STICKY TABLE OF CONTENTS (SIDEBAR) */}
            {toc.length > 0 && (
              <aside className={styles.tocSidebar}>
                <div className={styles.tocBox}>
                  <div className={styles.tocHeader}>
                    <span>Contents</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>

                  <ul className={styles.tocList}>
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        className={`${styles.tocItem} ${item.level === 'h3' ? styles.tocLevel3 : ''}`}
                      >
                        <a
                          href={`#${item.id}`}
                          className={`${styles.tocLink} ${activeHeadingId === item.id ? styles.activeTocLink : ''}`}
                          onClick={(e) => scrollToHeading(e, item.id)}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>

      <Subscribe />
    </Layout>
  )
}

export default function Blog_Details() {
  return (
    <div className="boxed_wrapper">
      <Suspense fallback={<div style={{ padding: '80px 20px', textAlign: 'center' }}>Loading BEC Article...</div>}>
        <BlogDetailsContent />
      </Suspense>
    </div>
  )
}