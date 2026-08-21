'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

const styles = {
  page: { padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' },
  card: { background: '#1e293b', borderRadius: 16, padding: 32, maxWidth: 900, margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  title: { margin: 0, color: '#fff', fontSize: 28 },
  form: { display: 'grid', gap: 18, background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 24 },
  label: { display: 'block', marginBottom: 8, color: '#94a3b8', fontWeight: 600 },
  input: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, outline: 'none' },
  textarea: { width: '100%', minHeight: 140, padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, outline: 'none', resize: 'vertical' },
  select: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, outline: 'none' },
  btnPrimary: { padding: '12px 22px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, cursor: 'pointer' },
  btnSecondary: { padding: '10px 18px', borderRadius: 8, border: '1px solid #475569', background: 'transparent', color: '#cbd5e1', fontWeight: 600, cursor: 'pointer' },
  danger: { background: '#ef4444', color: '#fff', padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 },
}

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params?.id

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPost = async () => {
      if (!supabase || !postId) return

      setLoading(true)
      const { data, error: loadError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (loadError) {
        setError(loadError.message)
        setPost(null)
      } else {
        setPost(data)
        setError('')
      }

      setLoading(false)
    }

    loadPost()
  }, [postId])

  const handleChange = (field, value) => {
    setPost((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!supabase || !post || !postId) return

    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('posts')
      .update({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.cover_image,
        status: post.status,
      })
      .eq('id', postId)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    router.push('/admin/posts')
  }

  const handleDelete = async () => {
    if (!supabase || !postId) return

    const confirmed = window.confirm('Delete this post?')
    if (!confirmed) return

    const { error: deleteError } = await supabase.from('posts').delete().eq('id', postId)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    router.push('/admin/posts')
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}><p style={{ color: '#cbd5e1', margin: 0 }}>Loading post…</p></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={{ marginTop: 0, color: '#fff' }}>Post not found</h1>
          <p style={{ color: '#cbd5e1' }}>The requested post could not be loaded. It may have been deleted or the data source is unavailable.</p>
          <Link href="/admin/posts" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Return to posts</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Edit Post</h1>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button style={styles.btnSecondary} onClick={() => router.push('/admin/posts')}>Back to posts</button>
            <button style={styles.danger} onClick={handleDelete}>Delete</button>
          </div>
        </div>

        {error && <div style={{ background: '#7f1d1d', color: '#fecaca', padding: 12, borderRadius: 8, marginBottom: 18 }}>{error}</div>}

        <div style={styles.form}>
          <div>
            <label style={styles.label}>Title</label>
            <input style={styles.input} value={post.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Slug</label>
            <input style={styles.input} value={post.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Excerpt</label>
            <textarea style={styles.textarea} value={post.excerpt || ''} onChange={(e) => handleChange('excerpt', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Content</label>
            <textarea style={{ ...styles.textarea, minHeight: 220 }} value={post.content || ''} onChange={(e) => handleChange('content', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Cover Image URL</label>
            <input style={styles.input} value={post.cover_image || ''} onChange={(e) => handleChange('cover_image', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Status</label>
            <select style={styles.select} value={post.status || 'draft'} onChange={(e) => handleChange('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <button style={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
