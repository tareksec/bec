'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

const S = {
  container: { background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', color: '#e2e8f0' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  btnPrimary: { padding: '10px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  
  filterBar: { display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  input: { padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 14, outline: 'none', flex: 1, minWidth: 200 },
  select: { padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 14, outline: 'none', minWidth: 150 },
  
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.5px' },
  td: { padding: '16px', borderBottom: '1px solid #1e293b', verticalAlign: 'middle' },
  
  badge: (status) => {
    const colors = {
      published: { bg: '#14532d', color: '#bbf7d0' },
      draft: { bg: '#78350f', color: '#fde68a' },
      archived: { bg: '#334155', color: '#cbd5e1' }
    }
    const theme = colors[status] || colors.draft
    return {
      display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
      background: theme.bg, color: theme.color, textTransform: 'capitalize'
    }
  },
  
  tagPill: { background: '#334155', color: '#e2e8f0', padding: '2px 8px', borderRadius: 12, fontSize: 11, display: 'inline-block', margin: '0 4px 4px 0' },
  actionBtn: (color) => ({ padding: '6px 12px', borderRadius: 6, border: 'none', background: color, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginRight: 6, textDecoration: 'none' }),
  
  pagination: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid #334155' },
  pageBtn: { padding: '8px 16px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', cursor: 'pointer', fontSize: 14 },
  
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 },
  modal: { background: '#1e293b', borderRadius: 16, padding: '32px 28px', width: '100%', maxWidth: 400, textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,.5)' }
}

export default function PostsClient({ posts, totalCount, categories, page, limit }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Filter state initialized from URL
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Update URL parameters to trigger server re-fetch
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Reset page to 1 when filters change
    if (key !== 'page') params.delete('page')
    
    router.push(`?${params.toString()}`)
  }

  // Handle Search input (debounce could be added, but Enter key or blur is fine for now)
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      updateFilters('search', search)
    }
  }

  // Delete Action
  const confirmDelete = async () => {
    setDeleting(true)
    const { error } = await supabase.from('posts').delete().eq('id', deleteId)
    setDeleting(false)
    setDeleteId(null)
    if (error) alert(error.message)
    else router.refresh()
  }

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div style={{ fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' }}>
      <div style={S.container}>
        
        {/* Header */}
        <div style={S.header}>
          <h1 style={S.title}>Manage Posts</h1>
          <Link href="/admin/posts/create" style={S.btnPrimary}>+ New Post</Link>
        </div>

        {/* Filters */}
        <div style={S.filterBar}>
          <input 
            style={S.input} 
            placeholder="Search by title... (Press Enter)" 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            onBlur={() => updateFilters('search', search)}
          />
          <select style={S.select} value={category} onChange={e => { setCategory(e.target.value); updateFilters('category', e.target.value) }}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={S.select} value={status} onChange={e => { setStatus(e.target.value); updateFilters('status', e.target.value) }}>
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Cover</th>
                <th style={S.th}>Title</th>
                <th style={S.th}>Categories</th>
                <th style={S.th}>Hashtags</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Date</th>
                <th style={S.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No posts found.</td></tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id}>
                    <td style={S.td}>
                      <img 
                        src={post.cover_image || 'https://via.placeholder.com/80?text=No+Image'} 
                        alt={post.title} 
                        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} 
                      />
                    </td>
                    <td style={S.td}>
                      <Link href={`/admin/posts/${post.id}/edit`} style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>
                        {post.title}
                      </Link>
                    </td>
                    <td style={S.td}>
                      {post.post_categories?.map(pc => (
                        <span key={pc.categories.id} style={S.tagPill}>{pc.categories.name}</span>
                      ))}
                    </td>
                    <td style={S.td}>
                      {post.post_hashtags?.map(ph => (
                        <span key={ph.hashtags.id} style={S.tagPill}>#{ph.hashtags.name}</span>
                      ))}
                    </td>
                    <td style={S.td}>
                      <span style={S.badge(post.status)}>{post.status}</span>
                    </td>
                    <td style={S.td} style={{ color: '#94a3b8', fontSize: 13 }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td style={S.td}>
                      <Link href={`/blog/${post.slug}`} target="_blank" style={S.actionBtn('#475569')}>View</Link>
                      <Link href={`/admin/posts/${post.id}/edit`} style={S.actionBtn('#6366f1')}>Edit</Link>
                      <button style={S.actionBtn('#ef4444')} onClick={() => setDeleteId(post.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={S.pagination}>
            <span style={{ fontSize: 14, color: '#94a3b8' }}>Showing page {page} of {totalPages}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={S.pageBtn} disabled={page <= 1} onClick={() => updateFilters('page', String(page - 1))}>Previous</button>
              <button style={S.pageBtn} disabled={page >= totalPages} onClick={() => updateFilters('page', String(page + 1))}>Next</button>
            </div>
          </div>
        )}

      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Confirm Deletion</h3>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>Are you sure you want to delete this post? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button style={{ ...S.actionBtn('#ef4444'), padding: '10px 20px', fontSize: 14 }} onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button style={{ ...S.actionBtn('#475569'), padding: '10px 20px', fontSize: 14 }} onClick={() => setDeleteId(null)} disabled={deleting}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
