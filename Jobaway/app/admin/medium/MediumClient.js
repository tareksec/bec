'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getMediumSlug } from '@/lib/medium'
import styles from '../admin.module.scss'

export default function MediumClient({ initialPosts = [] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await fetch('/api/medium', { cache: 'no-store' })
      router.refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setRefreshing(false)
    }
  }

  const filteredPosts = initialPosts.filter((post) => {
    if (!search.trim()) return true
    return (post.title || '').toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Medium Articles</h1>
          <p className={styles.pageSubtitle}>
            Synced via RSS feed (Total: {initialPosts.length} articles)
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Syncing…' : '↻ Sync from Medium'}
          </button>
          <a
            href="https://medium.com/@mdtareksec"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Open Medium Profile ↗
          </a>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          className={styles.input}
          style={{ maxWidth: 360, marginBottom: 0 }}
          placeholder="Filter Medium articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.recentPostsTable}>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Article Title</th>
              <th>Published</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                  {initialPosts.length === 0
                    ? 'No Medium posts fetched yet or RSS feed currently unreachable.'
                    : 'No matching Medium articles found.'}
                </td>
              </tr>
            ) : (
              filteredPosts.map((post, idx) => {
                const slug = getMediumSlug(post.title || '')
                const postUrl = `/blog/medium/${slug}`

                return (
                  <tr key={post.guid || post.link || idx}>
                    <td>
                      <div style={{ width: 56, height: 38, position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', background: '#f5f0eb' }}>
                        <Image
                          src={post.thumbnail || '/assets/images/resource/news-1.jpg'}
                          alt={post.title || 'Medium article'}
                          width={56}
                          height={38}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          unoptimized
                        />
                      </div>
                    </td>
                    <td>
                      <Link href={postUrl} className={styles.postTitleLink}>
                        {post.title}
                      </Link>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {post.pubDate ? new Date(post.pubDate).toLocaleDateString() : '—'}
                    </td>
                    <td>
                      {Array.isArray(post.categories) && post.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          style={{
                            background: '#f5f0eb',
                            color: 'var(--green-dark)',
                            padding: '2px 8px',
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 600,
                            display: 'inline-block',
                            margin: '0 4px 4px 0',
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link
                          href={postUrl}
                          className={styles.btnSecondary}
                          style={{ padding: '4px 10px', fontSize: 12 }}
                        >
                          View on Site
                        </Link>
                        {post.link && (
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnSecondary}
                            style={{ padding: '4px 10px', fontSize: 12 }}
                          >
                            Medium ↗
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
