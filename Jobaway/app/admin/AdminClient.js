'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, hasSupabaseConfig } from '@/lib/supabase/client'

/* ──────────────────────────────────────────────
   CSS-in-JS styles (kept in one object so we
   don't need an external CSS file)
   ────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: "var(--arimo), var(--noto-bengali), sans-serif",
  },
  /* ── Login ── */
  loginWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', padding: 20,
  },
  loginCard: {
    background: '#1e293b', borderRadius: 16, padding: '40px 36px',
    width: '100%', maxWidth: 420, boxShadow: '0 25px 50px rgba(0,0,0,.4)',
  },
  loginTitle: { fontSize: 26, fontWeight: 700, marginBottom: 6, color: '#fff', textAlign: 'center' },
  loginSub: { fontSize: 14, color: '#94a3b8', marginBottom: 28, textAlign: 'center' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 },
  input: {
    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #334155',
    background: '#0f172a', color: '#e2e8f0', fontSize: 14, marginBottom: 18, outline: 'none',
    boxSizing: 'border-box',
  },
  btnPrimary: {
    width: '100%', padding: '12px 0', borderRadius: 8, border: 'none',
    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
    fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'opacity .2s',
  },
  /* ── Dashboard shell ── */
  topBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 28px', background: '#1e293b', borderBottom: '1px solid #334155',
    position: 'sticky', top: 0, zIndex: 50,
  },
  topBarTitle: { fontSize: 18, fontWeight: 700, color: '#fff' },
  btnLogout: {
    padding: '8px 18px', borderRadius: 8, border: '1px solid #475569',
    background: 'transparent', color: '#cbd5e1', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', transition: 'all .2s',
  },
  tabBar: {
    display: 'flex', gap: 0, background: '#1e293b', borderBottom: '1px solid #334155',
    overflowX: 'auto', padding: '0 28px',
  },
  tab: (active) => ({
    padding: '12px 22px', cursor: 'pointer', fontSize: 14, fontWeight: 600,
    color: active ? '#a78bfa' : '#94a3b8', borderBottom: active ? '2px solid #a78bfa' : '2px solid transparent',
    background: 'transparent', border: 'none', borderBottomWidth: 2,
    borderBottomStyle: 'solid', borderBottomColor: active ? '#a78bfa' : 'transparent',
    whiteSpace: 'nowrap', transition: 'all .15s',
  }),
  content: { padding: '28px', maxWidth: 1200, margin: '0 auto' },
  /* ── Table ── */
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: {
    textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid #334155',
    color: '#94a3b8', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.5px',
  },
  td: { padding: '10px 14px', borderBottom: '1px solid #1e293b', verticalAlign: 'top' },
  /* ── Buttons ── */
  btnSm: (color = '#6366f1') => ({
    padding: '5px 14px', borderRadius: 6, border: 'none', background: color,
    color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginRight: 6,
  }),
  btnAdd: {
    padding: '10px 22px', borderRadius: 8, border: 'none',
    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
    fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 20,
  },
  /* ── Modal ── */
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20,
  },
  modal: {
    background: '#1e293b', borderRadius: 16, padding: '32px 28px',
    width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
    boxShadow: '0 25px 50px rgba(0,0,0,.5)',
  },
  modalTitle: { fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 },
  /* ── Misc ── */
  error: {
    background: '#7f1d1d', color: '#fecaca', padding: '10px 16px', borderRadius: 8,
    marginBottom: 16, fontSize: 13,
  },
  success: {
    background: '#14532d', color: '#bbf7d0', padding: '10px 16px', borderRadius: 8,
    marginBottom: 16, fontSize: 13,
  },
  loading: { textAlign: 'center', padding: 40, color: '#94a3b8' },
  badge: (on) => ({
    display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
    background: on ? '#14532d' : '#7f1d1d', color: on ? '#bbf7d0' : '#fecaca',
  }),
  emptyState: { textAlign: 'center', padding: 60, color: '#475569' },
}

/* ──────────────────────────────────────────────
   Confirmation dialog (replace window.confirm
   with an in-page modal for better UX)
   ────────────────────────────────────────────── */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={S.overlay}>
      <div style={{ ...S.modal, maxWidth: 400, textAlign: 'center' }}>
        <p style={{ fontSize: 16, marginBottom: 24, lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button style={S.btnSm('#ef4444')} onClick={onConfirm}>Yes, Delete</button>
          <button style={S.btnSm('#475569')} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Generic form modal
   ────────────────────────────────────────────── */
function FormModal({ title, fields, data, onChange, onSave, onCancel, saving }) {
  const [uploadingState, setUploadingState] = useState({})

  const handleUpload = async (e, key) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploadingState(prev => ({ ...prev, [key]: true }))
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      alert(`Upload failed: ${uploadError.message}`)
      setUploadingState(prev => ({ ...prev, [key]: false }))
      return
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)
    
    onChange(key, urlData.publicUrl)
    setUploadingState(prev => ({ ...prev, [key]: false }))
  }

  return (
    <div style={S.overlay} onClick={onCancel}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <h3 style={S.modalTitle}>{title}</h3>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={S.label}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                style={{ ...S.input, minHeight: 80, resize: 'vertical' }}
                value={data[f.key] || ''}
                onChange={e => onChange(f.key, e.target.value)}
              />
            ) : f.type === 'image' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleUpload(e, f.key)} 
                  style={{ color: '#cbd5e1', fontSize: 13 }}
                  disabled={uploadingState[f.key]}
                />
                <input
                  style={{ ...S.input, marginBottom: 0 }}
                  type="text"
                  placeholder="Or paste URL here..."
                  value={data[f.key] || ''}
                  onChange={e => onChange(f.key, e.target.value)}
                  disabled={uploadingState[f.key]}
                />
                {uploadingState[f.key] && <span style={{ fontSize: 12, color: '#a78bfa' }}>Uploading...</span>}
                {data[f.key] && !uploadingState[f.key] && (
                  <img src={data[f.key]} alt="Preview" style={{ height: 60, objectFit: 'cover', borderRadius: 4, alignSelf: 'flex-start', marginTop: 8 }} />
                )}
              </div>
            ) : (
              <input
                style={S.input}
                type={f.type || 'text'}
                value={data[f.key] || ''}
                onChange={e => onChange(f.key, e.target.value)}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button style={{ ...S.btnPrimary, width: 'auto', padding: '10px 28px' }} onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button style={{ ...S.btnSm('#475569'), padding: '10px 20px', fontSize: 14 }} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════
   TAB: POSTS
   ══════════════════════════════════════════════ */
function PostsTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)   // null | { mode:'create'|'edit', data:{} }
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fields = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
    { key: 'author', label: 'Author' },
  ]

  const load = useCallback(async () => {
    setLoading(true); setError('')
    const { data, error: err } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (err) setError(err.message); else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true); setError('')
    const d = modal.data
    if (modal.mode === 'create') {
      const { error: err } = await supabase.from('posts').insert([{ title: d.title, slug: d.slug, excerpt: d.excerpt, content: d.content, image_url: d.image_url, author: d.author }])
      if (err) { setError(err.message); setSaving(false); return }
    } else {
      const { error: err } = await supabase.from('posts').update({ title: d.title, slug: d.slug, excerpt: d.excerpt, content: d.content, image_url: d.image_url, author: d.author }).eq('id', d.id)
      if (err) { setError(err.message); setSaving(false); return }
    }
    setSaving(false); setModal(null); load()
  }

  const del = async (id) => {
    const { error: err } = await supabase.from('posts').delete().eq('id', id)
    if (err) setError(err.message)
    setConfirmDelete(null); load()
  }

  if (loading) return <div style={S.loading}>Loading posts…</div>
  return (
    <>
      {error && <div style={S.error}>⚠ {error}</div>}
      <button style={S.btnAdd} onClick={() => setModal({ mode: 'create', data: {} })}>+ New Post</button>
      {rows.length === 0 ? <div style={S.emptyState}>No posts yet. Create your first one!</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead><tr><th style={S.th}>Title</th><th style={S.th}>Slug</th><th style={S.th}>Author</th><th style={S.th}>Created</th><th style={S.th}>Actions</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={S.td}>{r.title}</td>
                  <td style={S.td}>{r.slug}</td>
                  <td style={S.td}>{r.author}</td>
                  <td style={S.td}>{r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}</td>
                  <td style={S.td}>
                    <button style={S.btnSm('#6366f1')} onClick={() => setModal({ mode: 'edit', data: { ...r } })}>Edit</button>
                    <button style={S.btnSm('#ef4444')} onClick={() => setConfirmDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal && <FormModal title={modal.mode === 'create' ? 'Create Post' : 'Edit Post'} fields={fields} data={modal.data} onChange={(k, v) => setModal(p => ({ ...p, data: { ...p.data, [k]: v } }))} onSave={save} onCancel={() => setModal(null)} saving={saving} />}
      {confirmDelete && <ConfirmDialog message="Are you sure you want to delete this post? This action cannot be undone." onConfirm={() => del(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}
    </>
  )
}


/* ══════════════════════════════════════════════
   TAB: REVIEWS
   ══════════════════════════════════════════════ */
function ReviewsTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    const { data, error: err } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
    if (err) setError(err.message); else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const toggle = async (id, current) => {
    const { error: err } = await supabase.from('reviews').update({ approved: !current }).eq('id', id)
    if (err) setError(err.message); else load()
  }

  const del = async (id) => {
    const { error: err } = await supabase.from('reviews').delete().eq('id', id)
    if (err) setError(err.message)
    setConfirmDelete(null); load()
  }

  if (loading) return <div style={S.loading}>Loading reviews…</div>
  return (
    <>
      {error && <div style={S.error}>⚠ {error}</div>}
      {rows.length === 0 ? <div style={S.emptyState}>No reviews yet.</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead><tr><th style={S.th}>Name</th><th style={S.th}>Review</th><th style={S.th}>Rating</th><th style={S.th}>Status</th><th style={S.th}>Actions</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={S.td}>{r.name}</td>
                  <td style={{ ...S.td, maxWidth: 300 }}>{r.content}</td>
                  <td style={S.td}>{r.rating ?? '—'}</td>
                  <td style={S.td}><span style={S.badge(r.approved)}>{r.approved ? 'Approved' : 'Pending'}</span></td>
                  <td style={S.td}>
                    <button style={S.btnSm(r.approved ? '#f59e0b' : '#22c55e')} onClick={() => toggle(r.id, r.approved)}>{r.approved ? 'Reject' : 'Approve'}</button>
                    <button style={S.btnSm('#ef4444')} onClick={() => setConfirmDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {confirmDelete && <ConfirmDialog message="Delete this review permanently?" onConfirm={() => del(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}
    </>
  )
}


/* ══════════════════════════════════════════════
   TAB: EVENTS
   ══════════════════════════════════════════════ */
function EventsTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fields = [
    { key: 'title', label: 'Event Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'location', label: 'Location' },
    { key: 'event_date', label: 'Event Date', type: 'date' },
    { key: 'image_url', label: 'Image URL', type: 'image' },
  ]

  const load = useCallback(async () => {
    setLoading(true); setError('')
    const { data, error: err } = await supabase.from('events').select('*').order('event_date', { ascending: false })
    if (err) setError(err.message); else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true); setError('')
    const d = modal.data
    const payload = { title: d.title, description: d.description, location: d.location, event_date: d.event_date || null, image_url: d.image_url }
    if (modal.mode === 'create') {
      const { error: err } = await supabase.from('events').insert([payload])
      if (err) { setError(err.message); setSaving(false); return }
    } else {
      const { error: err } = await supabase.from('events').update(payload).eq('id', d.id)
      if (err) { setError(err.message); setSaving(false); return }
    }
    setSaving(false); setModal(null); load()
  }

  const del = async (id) => {
    const { error: err } = await supabase.from('events').delete().eq('id', id)
    if (err) setError(err.message)
    setConfirmDelete(null); load()
  }

  if (loading) return <div style={S.loading}>Loading events…</div>
  return (
    <>
      {error && <div style={S.error}>⚠ {error}</div>}
      <button style={S.btnAdd} onClick={() => setModal({ mode: 'create', data: {} })}>+ New Event</button>
      {rows.length === 0 ? <div style={S.emptyState}>No events yet.</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead><tr><th style={S.th}>Title</th><th style={S.th}>Date</th><th style={S.th}>Location</th><th style={S.th}>Actions</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={S.td}>{r.title}</td>
                  <td style={S.td}>{r.event_date ? new Date(r.event_date).toLocaleDateString() : '—'}</td>
                  <td style={S.td}>{r.location}</td>
                  <td style={S.td}>
                    <button style={S.btnSm('#6366f1')} onClick={() => setModal({ mode: 'edit', data: { ...r } })}>Edit</button>
                    <button style={S.btnSm('#ef4444')} onClick={() => setConfirmDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal && <FormModal title={modal.mode === 'create' ? 'Create Event' : 'Edit Event'} fields={fields} data={modal.data} onChange={(k, v) => setModal(p => ({ ...p, data: { ...p.data, [k]: v } }))} onSave={save} onCancel={() => setModal(null)} saving={saving} />}
      {confirmDelete && <ConfirmDialog message="Delete this event permanently?" onConfirm={() => del(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}
    </>
  )
}


/* ══════════════════════════════════════════════
   TAB: MEMBERS
   ══════════════════════════════════════════════ */
function MembersTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fields = [
    { key: 'name', label: 'Full Name' },
    { key: 'designation', label: 'Designation / Role' },
    { key: 'bio', label: 'Short Bio', type: 'textarea' },
    { key: 'image_url', label: 'Photo URL', type: 'image' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'email', label: 'Email' },
  ]

  const load = useCallback(async () => {
    setLoading(true); setError('')
    const { data, error: err } = await supabase.from('members').select('*').order('created_at', { ascending: false })
    if (err) setError(err.message); else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true); setError('')
    const d = modal.data
    const payload = { name: d.name, designation: d.designation, bio: d.bio, image_url: d.image_url, linkedin: d.linkedin, email: d.email }
    if (modal.mode === 'create') {
      const { error: err } = await supabase.from('members').insert([payload])
      if (err) { setError(err.message); setSaving(false); return }
    } else {
      const { error: err } = await supabase.from('members').update(payload).eq('id', d.id)
      if (err) { setError(err.message); setSaving(false); return }
    }
    setSaving(false); setModal(null); load()
  }

  const del = async (id) => {
    const { error: err } = await supabase.from('members').delete().eq('id', id)
    if (err) setError(err.message)
    setConfirmDelete(null); load()
  }

  if (loading) return <div style={S.loading}>Loading members…</div>
  return (
    <>
      {error && <div style={S.error}>⚠ {error}</div>}
      <button style={S.btnAdd} onClick={() => setModal({ mode: 'create', data: {} })}>+ New Member</button>
      {rows.length === 0 ? <div style={S.emptyState}>No members yet.</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead><tr><th style={S.th}>Name</th><th style={S.th}>Role</th><th style={S.th}>Email</th><th style={S.th}>Actions</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={S.td}>{r.name}</td>
                  <td style={S.td}>{r.designation}</td>
                  <td style={S.td}>{r.email}</td>
                  <td style={S.td}>
                    <button style={S.btnSm('#6366f1')} onClick={() => setModal({ mode: 'edit', data: { ...r } })}>Edit</button>
                    <button style={S.btnSm('#ef4444')} onClick={() => setConfirmDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal && <FormModal title={modal.mode === 'create' ? 'Add Member' : 'Edit Member'} fields={fields} data={modal.data} onChange={(k, v) => setModal(p => ({ ...p, data: { ...p.data, [k]: v } }))} onSave={save} onCancel={() => setModal(null)} saving={saving} />}
      {confirmDelete && <ConfirmDialog message="Remove this member permanently?" onConfirm={() => del(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}
    </>
  )
}


/* ══════════════════════════════════════════════
   TAB: STATS (site_stats)
   ══════════════════════════════════════════════ */
function StatsTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    const { data, error: err } = await supabase.from('site_stats').select('*').order('id', { ascending: true })
    if (err) setError(err.message); else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const update = (idx, field, value) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r))
  }

  const saveAll = async () => {
    setSaving(true); setError(''); setSuccess('')
    for (const r of rows) {
      const { error: err } = await supabase.from('site_stats').update({ label: r.label, value: r.value }).eq('id', r.id)
      if (err) { setError(err.message); setSaving(false); return }
    }
    setSaving(false); setSuccess('Stats saved successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  if (loading) return <div style={S.loading}>Loading stats…</div>
  return (
    <>
      {error && <div style={S.error}>⚠ {error}</div>}
      {success && <div style={S.success}>✓ {success}</div>}
      {rows.length === 0 ? (
        <div style={S.emptyState}>No stats rows found in <code>site_stats</code>. Create rows in Supabase first.</div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead><tr><th style={S.th}>ID</th><th style={S.th}>Label</th><th style={S.th}>Value</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td style={S.td}>{r.id}</td>
                    <td style={S.td}><input style={{ ...S.input, marginBottom: 0 }} value={r.label || ''} onChange={e => update(i, 'label', e.target.value)} /></td>
                    <td style={S.td}><input style={{ ...S.input, marginBottom: 0 }} value={r.value ?? ''} onChange={e => update(i, 'value', e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button style={{ ...S.btnAdd, marginTop: 20 }} onClick={saveAll} disabled={saving}>{saving ? 'Saving…' : 'Save All Stats'}</button>
        </>
      )}
    </>
  )
}


/* ══════════════════════════════════════════════
   TAB: NEWSLETTER
   ══════════════════════════════════════════════ */
function NewsletterTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    const { data, error: err } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false })
    if (err) setError(err.message); else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  if (loading) return <div style={S.loading}>Loading subscribers…</div>
  return (
    <>
      {error && <div style={S.error}>⚠ {error}</div>}
      <p style={{ marginBottom: 16, color: '#94a3b8', fontSize: 14 }}>Total subscribers: <strong style={{ color: '#e2e8f0' }}>{rows.length}</strong></p>
      {rows.length === 0 ? <div style={S.emptyState}>No subscribers yet.</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead><tr><th style={S.th}>Email</th><th style={S.th}>Subscribed At</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={S.td}>{r.email}</td>
                  <td style={S.td}>{r.created_at ? new Date(r.created_at).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}


/* ══════════════════════════════════════════════
   MAIN: Admin Page
   ══════════════════════════════════════════════ */
/* ══════════════════════════════════════════════
   TAB: OVERVIEW
   ══════════════════════════════════════════════ */
function OverviewTab({ stats }) {
  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts || 0, icon: '📝', change: '+12% from last month', color: '#6366f1' },
    { label: 'Published Posts', value: stats.publishedPosts || 0, icon: '✅', change: '+5% from last month', color: '#22c55e' },
    { label: 'Draft Posts', value: stats.draftPosts || 0, icon: '✍️', change: '-2% from last month', color: '#f59e0b' },
    { label: 'Categories', value: stats.totalCategories || 0, icon: '📁', change: '+1% from last month', color: '#8b5cf6' },
    { label: 'Hashtags', value: stats.totalHashtags || 0, icon: '#️⃣', change: '+8% from last month', color: '#ec4899' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
      {statCards.map((c, i) => (
        <div key={i} style={{ background: '#1e293b', borderRadius: 16, padding: 24, border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</p>
              <h4 style={{ color: '#fff', fontSize: 32, fontWeight: 700, margin: 0 }}>{c.value}</h4>
            </div>
            <div style={{ background: `${c.color}20`, color: c.color, width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              {c.icon}
            </div>
          </div>
          <div style={{ color: c.change.startsWith('+') ? '#22c55e' : '#ef4444', fontSize: 13, fontWeight: 500 }}>
            {c.change}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN: Admin Page
   ══════════════════════════════════════════════ */
const TABS = [
  { key: 'overview', label: 'Overview', icon: '📊' },
  { key: 'posts', label: 'Posts', icon: '📝' },
  { key: 'reviews', label: 'Reviews', icon: '⭐' },
  { key: 'events', label: 'Events', icon: '📅' },
  { key: 'members', label: 'Members', icon: '👥' },
  { key: 'stats', label: 'Stats', icon: '📈' },
  { key: 'newsletter', label: 'Newsletter', icon: '📧' },
]

export default function AdminClient({ initialStats }) {
  const [session, setSession] = useState(undefined)   // undefined = loading, null = no session
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // ── Check session on mount + subscribe ──
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  // ── If supabase client is not configured ──
  if (!hasSupabaseConfig || !supabase) {
    return (
      <div style={S.page}>
        <div style={S.loginWrap}>
          <div style={S.loginCard}>
            <h1 style={S.loginTitle}>Configuration Error</h1>
            <div style={S.error}>Supabase environment variables are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.</div>
          </div>
        </div>
      </div>
    )
  }

  // ── Login handler ──
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError(''); setLoginLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
    setLoginLoading(false)
  }

  // ── Logout handler ──
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  // ── Loading state ──
  if (session === undefined) {
    return <div style={S.page}><div style={S.loading}>Checking authentication…</div></div>
  }

  // ── LOGIN SCREEN ──
  if (!session) {
    return (
      <div style={S.page}>
        <div style={S.loginWrap}>
          <div style={S.loginCard}>
            <h1 style={S.loginTitle}>BEC Admin</h1>
            <p style={S.loginSub}>Sign in with your admin credentials</p>
            {loginError && <div style={S.error}>⚠ {loginError}</div>}
            <form onSubmit={handleLogin}>
              <label style={S.label}>Email</label>
              <input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@bec.com.bd" />
              <label style={S.label}>Password</label>
              <input style={S.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
              <button type="submit" style={S.btnPrimary} disabled={loginLoading}>
                {loginLoading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ──
  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab stats={initialStats} />
      case 'posts': return <PostsTab />
      case 'reviews': return <ReviewsTab />
      case 'events': return <EventsTab />
      case 'members': return <MembersTab />
      case 'stats': return <StatsTab />
      case 'newsletter': return <NewsletterTab />
      default: return null
    }
  }

  return (
    <div style={S.page}>
      {/* Top bar */}
      <div style={S.topBar}>
        <div style={S.topBarTitle}>BEC Admin Dashboard</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>{session.user.email}</span>
          <button style={S.btnLogout} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={S.tabBar}>
        {TABS.map(t => (
          <button key={t.key} style={S.tab(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={S.content}>
        {renderTab()}
      </div>
    </div>
  )
}
