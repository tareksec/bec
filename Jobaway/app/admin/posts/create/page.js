'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase/client'
const RichTextEditor = dynamic(() => import('@/app/admin/components/RichTextEditor'), { ssr: false })

const S = {
  page: { minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif', padding: '40px 20px' },
  container: { maxWidth: 900, margin: '0 auto', background: '#1e293b', padding: 32, borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
  title: { fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: '#94a3b8', marginBottom: 8 },
  input: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, marginBottom: 20, outline: 'none' },
  textarea: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, minHeight: 100, marginBottom: 20, outline: 'none', resize: 'vertical' },
  select: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, marginBottom: 20, outline: 'none' },
  btnPrimary: { padding: '12px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 },
  btnSecondary: { padding: '12px 24px', borderRadius: 8, border: '1px solid #475569', background: 'transparent', color: '#cbd5e1', fontWeight: 600, fontSize: 16, cursor: 'pointer' },
  tagPill: { background: '#334155', color: '#e2e8f0', padding: '4px 10px', borderRadius: 16, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, margin: '0 8px 8px 0' },
  tagRemove: { cursor: 'pointer', color: '#94a3b8', fontSize: 16, lineHeight: 1 },
}

const generateSlug = (title) => title
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
    status: 'draft'
  })
  
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]) // Array of UUIDs
  
  const [hashtags, setHashtags] = useState([]) // Array of existing hashtags objects
  const [selectedHashtags, setSelectedHashtags] = useState([]) // Array of strings (names)
  const [hashtagInput, setHashtagInput] = useState('')
  
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Fetch initial data (categories and hashtags)
  useEffect(() => {
    async function loadData() {
      if (!supabase) return

      const { data: catData, error: catError } = await supabase.from('categories').select('*').order('name')
      if (catError) {
        setError(`Could not load categories: ${catError.message}`)
      } else {
        setCategories(catData || [])
      }

      const { data: hashData, error: hashError } = await supabase.from('hashtags').select('*').order('name')
      if (hashError) {
        setError(`Could not load hashtags: ${hashError.message}`)
      } else {
        setHashtags(hashData || [])
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }))
    }
  }, [formData.title])

  const handleTitleChange = (e) => {
    const val = e.target.value
    setFormData(prev => ({ ...prev, title: val }))
  }

  // Handle Hashtag Input (Enter key)
  const handleHashtagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tag = hashtagInput.trim().toLowerCase()
      if (tag && !selectedHashtags.includes(tag)) {
        setSelectedHashtags(prev => [...prev, tag])
      }
      setHashtagInput('')
    }
  }

  const removeHashtag = (tagToRemove) => {
    setSelectedHashtags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploadingImage(true)
    setError('')
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(`${Date.now()}-${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`)
      setUploadingImage(false)
      return
    }

    if (!uploadData?.path) {
      setError('Image upload failed: Supabase did not return an uploaded file path.')
      setUploadingImage(false)
      return
    }

    const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(uploadData.path)
    setFormData(prev => ({ ...prev, cover_image: urlData.publicUrl }))
    setUploadingImage(false)
  }

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase client is not available in this browser session.')
      return
    }

    if (!formData.title || !formData.slug) {
      setError("Title and Slug are required.")
      return
    }

    setSaving(true)
    setError('')

    // 1. Get current user
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setError("You must be logged in to create a post.")
      setSaving(false)
      return
    }

    // 2. Insert Post
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert([{
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image,
        status: formData.status,
        author_id: session.user.id
      }])
      .select()
      .single()

    if (postError) {
      setError(postError.message)
      setSaving(false)
      return
    }

    const postId = postData.id

    // 3. Handle Categories
    if (selectedCategories.length > 0) {
      const categoryInserts = selectedCategories.map(catId => ({
        post_id: postId,
        category_id: catId
      }))
      const { error: categoryError } = await supabase.from('post_categories').insert(categoryInserts)
      if (categoryError) {
        setError(`Post saved, but categories could not be saved: ${categoryError.message}`)
        setSaving(false)
        return
      }
    }

    // 4. Handle Hashtags (Ensure they exist first, then link)
    if (selectedHashtags.length > 0) {
      for (const tagName of selectedHashtags) {
        // Check if hashtag exists
        let { data: existingTag } = await supabase.from('hashtags').select('id').eq('name', tagName).single()
        
        let hashtagId
        if (!existingTag) {
          // Create new hashtag
          const { data: newTag, error: tagErr } = await supabase.from('hashtags').insert([{ name: tagName }]).select().single()
          if (!tagErr && newTag) hashtagId = newTag.id
        } else {
          hashtagId = existingTag.id
        }

        if (hashtagId) {
          const { error: linkError } = await supabase.from('post_hashtags').insert([{ post_id: postId, hashtag_id: hashtagId }])
          if (linkError) {
            setError(`Post saved, but hashtag links could not be saved: ${linkError.message}`)
            setSaving(false)
            return
          }
        }
      }
    }

    // Success! Redirect to Admin
    router.push('/admin/posts')
  }

  return (
    <div style={S.page}>
      <div style={S.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={S.title}>Create New Blog Post</h1>
          <button style={S.btnSecondary} onClick={() => router.push('/admin')}>Cancel</button>
        </div>

        {error && <div style={{ background: '#7f1d1d', color: '#fecaca', padding: 16, borderRadius: 8, marginBottom: 24 }}>⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={S.label}>Title</label>
              <input style={S.input} type="text" placeholder="Post title..." value={formData.title} onChange={handleTitleChange} required />
            </div>
            <div>
              <label style={S.label}>Slug</label>
              <input style={S.input} type="text" placeholder="post-slug" value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))} required />
            </div>
          </div>

          <label style={S.label}>Excerpt</label>
          <textarea style={S.textarea} placeholder="Short summary for SEO and preview cards..." value={formData.excerpt} onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))} />

          <label style={S.label}>Content</label>
          <div style={{ marginBottom: 24 }}>
            <RichTextEditor
              value={formData.content}
              onChange={val => setFormData(p => ({ ...p, content: val }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={S.label}>Cover Image</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ color: '#cbd5e1', fontSize: 14 }} />
                {uploadingImage && <span style={{ fontSize: 13, color: '#a78bfa' }}>Uploading to Supabase...</span>}
                {formData.cover_image && <img src={formData.cover_image} alt="Cover Preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }} />}
                <input style={S.input} type="text" placeholder="Or paste image URL directly..." value={formData.cover_image} onChange={e => setFormData(p => ({ ...p, cover_image: e.target.value }))} />
              </div>
            </div>

            <div>
              <label style={S.label}>Status</label>
              <select style={S.select} value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>

              <label style={S.label}>Categories</label>
              <select style={{ ...S.select, minHeight: 120 }} multiple value={selectedCategories} onChange={e => {
                const options = [...e.target.selectedOptions];
                setSelectedCategories(options.map(o => o.value));
              }}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block', marginTop: -15, marginBottom: 20 }}>Hold Ctrl/Cmd to select multiple</span>
            </div>
          </div>

          <label style={S.label}>Hashtags (Type and press Enter)</label>
          <div style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', marginBottom: 24 }}>
            {selectedHashtags.map(tag => (
              <span key={tag} style={S.tagPill}>
                #{tag} <span style={S.tagRemove} onClick={() => removeHashtag(tag)}>×</span>
              </span>
            ))}
            <input 
              type="text" 
              placeholder="Add hashtag..." 
              style={{ background: 'transparent', border: 'none', color: '#e2e8f0', outline: 'none', fontSize: 14, minWidth: 150 }}
              value={hashtagInput}
              onChange={e => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
              list="hashtag-suggestions"
            />
            <datalist id="hashtag-suggestions">
              {hashtags.map(h => <option key={h.id} value={h.name} />)}
            </datalist>
          </div>

          <button type="submit" style={S.btnPrimary} disabled={saving || uploadingImage}>
            {saving ? 'Publishing Post...' : 'Save Post'}
          </button>
        </form>
      </div>
    </div>
  )
}
