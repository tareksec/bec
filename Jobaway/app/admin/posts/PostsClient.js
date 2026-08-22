'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import styles from '../admin.module.scss'

export default function PostsClient({ posts = [], totalCount = 0, categories = [], page = 1, limit = 20 }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')

  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    if (key !== 'page') params.delete('page')
    router.push(`?${params.toString()}`)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      updateFilters('search', search)
    }
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    setDeleting(true)

    // Clean up post_categories and post_hashtags relations first
    await supabase.from('post_categories').delete().eq('post_id', deleteId)
    await supabase.from('post_hashtags').delete().eq('post_id', deleteId)

    const { error } = await supabase.from('posts').delete().eq('id', deleteId)
    setDeleting(false)
    setDeleteId(null)

    if (error) {
      alert(error.message)
    } else {
      router.refresh()
    }
  }

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Manage Posts</h1>
          <p className={styles.pageSubtitle}>Total posts: {totalCount}</p>
        </div>
        <Link href="/admin/posts/create" className={styles.btnPrimary}>
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          className={styles.input}
          style={{ flex: 1, minWidth: 200, marginBottom: 0 }}
          placeholder="Search by title... (Press Enter)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          onBlur={() => updateFilters('search', search)}
        />
        <select
          className={styles.select}
          style={{ width: 'auto', minWidth: 160, marginBottom: 0 }}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            updateFilters('category', e.target.value)
          }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          style={{ width: 'auto', minWidth: 140, marginBottom: 0 }}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            updateFilters('status', e.target.value)
          }}
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className={styles.recentPostsTable}>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Categories</th>
              <th>Hashtags</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => {
                const statusClass = post.status === 'published'
                  ? styles.badgePublished
                  : post.status === 'archived'
                    ? styles.badgeArchived
                    : styles.badgeDraft

                return (
                  <tr key={post.id}>
                    <td>
                      <div style={{ width: 56, height: 38, position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', background: '#f5f0eb' }}>
                        {(() => {
                          const rawCover = post.cover_image?.trim()
                          const safeCover = (rawCover && (rawCover.startsWith('http') || rawCover.startsWith('/')))
                            ? rawCover
                            : '/assets/images/resource/news-1.jpg'
                          return (
                            <Image
                              src={safeCover}
                              alt={post.title || 'Post cover'}
                              width={56}
                              height={38}
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                              unoptimized
                            />
                          )
                        })()}
                      </div>
                    </td>
                    <td>
                      <Link href={`/admin/posts/${post.id}/edit`} className={styles.postTitleLink}>
                        {post.title}
                      </Link>
                    </td>
                    <td>
                      {post.post_categories?.map(
                        (pc) =>
                          pc.categories && (
                            <span
                              key={pc.categories.id}
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
                              {pc.categories.name}
                            </span>
                          )
                      )}
                    </td>
                    <td>
                      {post.post_hashtags?.map(
                        (ph) =>
                          ph.hashtags && (
                            <span
                              key={ph.hashtags.id}
                              style={{
                                background: '#f5f0eb',
                                color: '#666',
                                padding: '2px 8px',
                                borderRadius: 12,
                                fontSize: 11,
                                display: 'inline-block',
                                margin: '0 4px 4px 0',
                              }}
                            >
                              #{ph.hashtags.name}
                            </span>
                          )
                      )}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${statusClass}`}>
                        {post.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link
                          href={`/blog-details?slug=${encodeURIComponent(post.slug || '')}`}
                          target="_blank"
                          className={styles.btnSecondary}
                          style={{ padding: '4px 10px', fontSize: 12 }}
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className={styles.btnSecondary}
                          style={{ padding: '4px 10px', fontSize: 12 }}
                        >
                          Edit
                        </Link>
                        <button
                          className={styles.btnDanger}
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => setDeleteId(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Showing page {page} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className={styles.btnSecondary}
              style={{ padding: '6px 12px', fontSize: 13 }}
              disabled={page <= 1}
              onClick={() => updateFilters('page', String(page - 1))}
            >
              Previous
            </button>
            <button
              className={styles.btnSecondary}
              style={{ padding: '6px 12px', fontSize: 13 }}
              disabled={page >= totalPages}
              onClick={() => updateFilters('page', String(page + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className={styles.overlay}>
          <div className={styles.modal} style={{ maxWidth: 400, textAlign: 'center' }}>
            <h3 className={styles.cardTitle} style={{ marginBottom: 12 }}>Confirm Deletion</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                className={styles.btnDanger}
                style={{ padding: '10px 20px', fontSize: 14 }}
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => setDeleteId(null)}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
