'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'

const DEFAULT_NEWS = [
  {
    id: 1,
    title: 'Building a Personal Brand That Opens Doors',
    slug: 'linkedin-optimization-the-job-titles',
    category: 'News & Insights',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
  },
  {
    id: 2,
    title: 'Five Hiring Mistakes Growing Companies Make',
    slug: 'the-future-of-business-entrepreneurship-in-2025',
    category: 'News & Insights',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  },
  {
    id: 3,
    title: 'Why Networking Still Wins in a Digital Economy',
    slug: 'effective-leadership-management-techniques',
    category: 'News & Insights',
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80',
  },
]

export default function News() {
  const [posts, setPosts] = useState(DEFAULT_NEWS)

  useEffect(() => {
    async function fetchLatestNews() {
      if (!supabase) return
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          cover_image,
          created_at,
          post_categories (
            categories (id, name)
          )
        `)
        .order('created_at', { ascending: false })
        .limit(3)

      if (!error && data && data.length > 0) {
        const mapped = data.map((p, idx) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          category: p.post_categories?.[0]?.categories?.name || 'News & Insights',
          image: p.cover_image || DEFAULT_NEWS[idx % DEFAULT_NEWS.length].image,
        }))
        setPosts(mapped)
      }
    }

    fetchLatestNews()
  }, [])

  return (
    <>
      <section className="news-section pb_90">
        <div className="auto-container">
          <div className="sec-title centred pb_60 sec-title-animation animation-style2">
            <span className="sub-title mb_10 title-animation">Media</span>
            <h2 className="title-animation">Latest News</h2>
          </div>
          <div className="row clearfix">
            {posts.map((item, index) => {
              const postHref = item.slug
                ? `/blog-details?slug=${encodeURIComponent(item.slug)}`
                : `/blog-details?id=${encodeURIComponent(item.id)}`

              return (
                <div key={item.id || index} className="col-lg-4 col-md-6 col-sm-12 news-block">
                  <div
                    className="news-block-one wow fadeInUp animated"
                    data-wow-delay={`${index * 300}ms`}
                    data-wow-duration="1500ms"
                  >
                    <div className="inner-box">
                      <div className="bg-layer">
                        <Image
                          src={item.image || '/assets/images/placeholder.jpg'}
                          alt={item.title || 'News'}
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="overlay-bg-layer">
                        <Image
                          src={item.image || '/assets/images/placeholder.jpg'}
                          alt={item.title || 'News'}
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="content-box">
                        <span className="post-date">{item.category}</span>
                        <h4>
                          <Link href={postHref}>{item.title}</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
