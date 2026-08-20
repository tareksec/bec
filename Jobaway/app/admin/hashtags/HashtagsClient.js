'use client'

import { useState } from 'react'
import { createHashtag, deleteHashtag } from '@/app/admin/actions'

const S = {
  container: { background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', color: '#e2e8f0' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  btnPrimary: { padding: '10px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' },
  btnSmall: (color) => ({ padding: '6px 12px', borderRadius: 6, border: 'none', background: color, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginRight: 6 }),
  input: { padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 14, outline: 'none', width: '100%' },
  
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.5px' },
  td: { padding: '16px', borderBottom: '1px solid #1e293b', verticalAlign: 'middle' },
  
  error: { background: '#7f1d1d', color: '#fecaca', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 },
  badge: { background: '#334155', color: '#cbd5e1', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }
}

export default function HashtagsClient({ hashtags }) {
  const [errorMsg, setErrorMsg] = useState('')
  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true); setErrorMsg('')
    const formData = new FormData()
    formData.append('name', newName)
    
    const res = await createHashtag(formData)
    if (res.error) setErrorMsg(res.error)
    else {
      setNewName(''); setCreating(false)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hashtag? It will be removed from all associated posts.')) return
    setLoading(true); setErrorMsg('')
    
    const res = await deleteHashtag(id)
    if (res.error) setErrorMsg(res.error)
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' }}>
      <div style={S.container}>
        <div style={S.header}>
          <h1 style={S.title}>Manage Hashtags</h1>
          <button style={S.btnPrimary} onClick={() => setCreating(!creating)}>
            {creating ? 'Cancel' : '+ New Hashtag'}
          </button>
        </div>

        {errorMsg && <div style={S.error}>{errorMsg}</div>}

        {creating && (
          <form onSubmit={handleCreate} style={{ background: '#0f172a', padding: 20, borderRadius: 12, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Hashtag Name</label>
              <input style={S.input} value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. startup" required />
            </div>
            <button type="submit" style={S.btnPrimary} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        )}

        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Tag</th>
              <th style={S.th}>Post Count</th>
              <th style={S.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hashtags.map(tag => (
              <tr key={tag.id}>
                <td style={S.td}>
                  <code style={{ background: '#0f172a', padding: '4px 8px', borderRadius: 4, color: '#a78bfa' }}>#{tag.name}</code>
                </td>
                <td style={S.td}>
                  <span style={S.badge}>{tag.postCount} Posts</span>
                </td>
                <td style={S.td}>
                  <button style={S.btnSmall('#ef4444')} onClick={() => handleDelete(tag.id)} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
            {hashtags.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No hashtags found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
