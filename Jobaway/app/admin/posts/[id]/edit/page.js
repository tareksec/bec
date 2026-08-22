'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import styles from '../../../admin.module.scss'

const RichTextEditor = dynamic(() => import('@/app/admin/components/RichTextEditor'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 200, padding: 20, background: '#faf8f5', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>Loading editor…</div>,
})

const generateSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params?.id

  const [post, setPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [selectedHashtags, setSelectedHashtags] = useState([])
  const [hashtagInput, setHashtagInput] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPostAndMeta = async () => {
      if (!supabase || !postId) return

      setLoading(true)

      const [postRes, catRes] = await Promise.all([
        supabase
          .from('posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            content,
            cover_image,
            status,
            post_categories ( category_id ),
            post_hashtags ( hashtags ( id, name ) )
          `)
          .eq('id', postId)
          .maybeSingle(),
        supabase
          .from('categories')
          .select('id, name')
          .order('name'),
      ])

      if (postRes.error || !postRes.data) {
        setError(postRes.error?.message || 'Post not found')
        setPost(null)
      } else {
        setPost(postRes.data)
        const currentCatIds = (postRes.data.post_categories || []).map((pc) => pc.category_id)
        setSelectedCategories(currentCatIds)

        const currentTags = (postRes.data.post_hashtags || [])
          .map((ph) => ph.hashtags?.name)
          .filter(Boolean)
        setSelectedHashtags(currentTags)
        setError('')
      }

      setCategories(catRes.data || [])
      setLoading(false)
    }

    loadPostAndMeta()
  }, [postId])

  const handleChange = (field, value) => {
    setPost((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'title' && !prev?.slug) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const handleHashtagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tag = hashtagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
      if (tag && !selectedHashtags.includes(tag)) {
        setSelectedHashtags((prev) => [...prev, tag])
      }
      setHashtagInput('')
    }
  }

  const removeHashtag = (tagToRemove) => {
    setSelectedHashtags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const toggleCategory = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    )
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')

    const fileExt = file.name.split('.').pop()
    const filePath = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`)
      setUploadingImage(false)
      return
    }

    if (!uploadData?.path) {
      setError('Image upload failed: Supabase did not return a path.')
      setUploadingImage(false)
      return
    }

    const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(uploadData.path)
    setPost((prev) => ({ ...prev, cover_image: urlData.publicUrl }))
    setUploadingImage(false)
  }

  const handleSave = async () => {
    if (!supabase || !post || !postId) return

    setSaving(true)
    setError('')

    // 1. Update post fields
    const { error: updateError } = await supabase
      .from('posts')
      .update({
        title: post.title.trim(),
        slug: post.slug.trim(),
        excerpt: post.excerpt?.trim() || null,
        content: post.content || '',
        cover_image: post.cover_image || null,
        status: post.status || 'draft',
      })
      .eq('id', postId)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    // 2. Synchronize post_categories
    await supabase.from('post_categories').delete().eq('post_id', postId)
    if (selectedCategories.length > 0) {
      const categoryInserts = selectedCategories.map((catId) => ({
        post_id: postId,
        category_id: catId,
      }))
      await supabase.from('post_categories').insert(categoryInserts)
    }

    // 3. Synchronize post_hashtags
    await supabase.from('post_hashtags').delete().eq('post_id', postId)
    if (selectedHashtags.length > 0) {
      for (const tagName of selectedHashtags) {
        let hashtagId = null
        const { data: existingTag } = await supabase
          .from('hashtags')
          .select('id')
          .eq('name', tagName)
          .maybeSingle()

        if (existingTag?.id) {
          hashtagId = existingTag.id
        } else {
          const { data: newTag, error: tagErr } = await supabase
            .from('hashtags')
            .insert([{ name: tagName }])
            .select('id')
            .single()

          if (!tagErr && newTag?.id) {
            hashtagId = newTag.id
          }
        }

        if (hashtagId) {
          await supabase.from('post_hashtags').insert([{ post_id: postId, hashtag_id: hashtagId }])
        }
      }
    }

    router.push('/admin/posts')
  }

  const handleDelete = async () => {
    if (!supabase || !postId) return

    const confirmed = window.confirm('Are you sure you want to delete this post?')
    if (!confirmed) return

    await supabase.from('post_categories').delete().eq('post_id', postId)
    await supabase.from('post_hashtags').delete().eq('post_id', postId)

    const { error: deleteError } = await supabase.from('posts').delete().eq('id', postId)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    router.push('/admin/posts')
  }

  if (loading) {
    return (
      <div className={styles.card} style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: 40 }}>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Loading post data…</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className={styles.card} style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 className={styles.pageTitle} style={{ fontSize: 22 }}>Post not found</h1>
        <p style={{ color: 'var(--text-secondary)' }}>The requested post could not be loaded or was removed.</p>
        <Link href="/admin/posts" className={styles.btnSecondary}>Return to posts</Link>
      </div>
    )
  }

  return (
    <div className={styles.card} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Edit Post</h1>
          <p className={styles.pageSubtitle}>Update BEC article details, categories, and tags</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className={styles.btnSecondary} onClick={() => router.push('/admin/posts')}>Back to posts</button>
          <button className={styles.btnDanger} onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 18, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Title</label>
            <input
              className={styles.input}
              value={post.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Slug</label>
            <input
              className={styles.input}
              value={post.slug || ''}
              onChange={(e) => handleChange('slug', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Excerpt</label>
          <textarea
            className={styles.textarea}
            value={post.excerpt || ''}
            onChange={(e) => handleChange('excerpt', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Content</label>
          <RichTextEditor
            value={post.content || ''}
            onChange={(val) => handleChange('content', val)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Cover Image</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ fontSize: 13 }} />
            {uploadingImage && <span style={{ fontSize: 13, color: 'var(--green-dark)' }}>Uploading to storage...</span>}
            {post.cover_image && (
              <div style={{ width: '100%', maxHeight: 200, height: 180, position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Image
                  src={post.cover_image}
                  alt="Cover Preview"
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            )}
            <input
              className={styles.input}
              type="text"
              placeholder="Or paste image URL directly..."
              value={post.cover_image || ''}
              onChange={(e) => handleChange('cover_image', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Categories</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map((cat) => {
              const selected = selectedCategories.includes(cat.id)
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    border: '1px solid',
                    borderColor: selected ? 'var(--green-dark)' : 'var(--border-subtle)',
                    background: selected ? 'var(--green-dark)' : '#ffffff',
                    color: selected ? '#ffffff' : 'var(--text-secondary)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Hashtags</label>
          <input
            className={styles.input}
            placeholder="Type a hashtag and press Enter..."
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={handleHashtagKeyDown}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedHashtags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: '#f5f0eb',
                  color: 'var(--text-primary)',
                  padding: '4px 12px',
                  borderRadius: 16,
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeHashtag(tag)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#999', fontSize: 14 }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Status</label>
          <select
            className={styles.select}
            value={post.status || 'draft'}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button
            className={styles.btnPrimary}
            onClick={handleSave}
            disabled={saving || uploadingImage}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button className={styles.btnSecondary} onClick={() => router.push('/admin/posts')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
