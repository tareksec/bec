'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import styles from '../../admin.module.scss'

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

export default function CreatePostPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    status: 'published',
  })

  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [selectedHashtags, setSelectedHashtags] = useState([])
  const [hashtagInput, setHashtagInput] = useState('')

  const [uploadingImage, setUploadingImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      if (!supabase) return

      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('id, name')
        .order('name')

      if (catError) {
        setError(`Could not load categories: ${catError.message}`)
      } else {
        setCategories(catData || [])
      }

      const { data: hashData, error: hashError } = await supabase
        .from('hashtags')
        .select('id, name')
        .order('name')

      if (hashError) {
        console.error('Could not load hashtags:', hashError.message)
      }
    }
    loadData()
  }, [])

  const handleTitleChange = (e) => {
    const val = e.target.value
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: generateSlug(val),
    }))
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

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(`covers/${Date.now()}-${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploadingImage(false)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('post-images').getPublicUrl(uploadData.path)

    setFormData((prev) => ({ ...prev, cover_image: publicUrl }))
    setUploadingImage(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase client is not available.')
      return
    }

    if (!formData.title || !formData.slug) {
      setError('Title and Slug are required.')
      return
    }

    setSaving(true)
    setError('')

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      setError('You must be logged in to create a post.')
      setSaving(false)
      return
    }

    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert([
        {
          title: formData.title.trim(),
          slug: formData.slug.trim(),
          excerpt: formData.excerpt?.trim() || null,
          content: formData.content || '',
          cover_image: formData.cover_image || null,
          status: formData.status || 'draft',
          author_id: session.user.id,
        },
      ])
      .select('id')
      .single()

    if (postError) {
      setError(postError.message)
      setSaving(false)
      return
    }

    const postId = postData.id

    // Handle categories
    if (selectedCategories.length > 0) {
      const categoryInserts = selectedCategories.map((catId) => ({
        post_id: postId,
        category_id: catId,
      }))
      const { error: catError } = await supabase.from('post_categories').insert(categoryInserts)
      if (catError) {
        console.error('Category linking notice:', catError.message)
      }
    }

    // Handle hashtags (using maybeSingle to prevent PGRST116 errors)
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

  return (
    <div className={styles.card} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Create New Blog Post</h1>
          <p className={styles.pageSubtitle}>Fill in details to publish or draft a new BEC article</p>
        </div>
        <button className={styles.btnSecondary} onClick={() => router.push('/admin/posts')}>
          Cancel
        </button>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 14, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          ⚠ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Title</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Post title..."
              value={formData.title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Slug</label>
            <input
              className={styles.input}
              type="text"
              placeholder="post-slug"
              value={formData.slug}
              onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Excerpt</label>
          <textarea
            className={styles.textarea}
            placeholder="Short summary for SEO and preview cards..."
            value={formData.excerpt}
            onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Content</label>
          <RichTextEditor
            value={formData.content}
            onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Cover Image</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ fontSize: 13 }} />
            {uploadingImage && <span style={{ fontSize: 13, color: 'var(--green-dark)' }}>Uploading to storage...</span>}
            {formData.cover_image && (
              <div style={{ width: '100%', maxHeight: 200, height: 180, position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Image
                  src={formData.cover_image}
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
              value={formData.cover_image}
              onChange={(e) => setFormData((p) => ({ ...p, cover_image: e.target.value }))}
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
            value={formData.status}
            onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button type="submit" className={styles.btnPrimary} disabled={saving || uploadingImage}>
            {saving ? 'Creating Post…' : 'Create Post'}
          </button>
          <button type="button" className={styles.btnSecondary} onClick={() => router.push('/admin/posts')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
