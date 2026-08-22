'use client'

import { useState } from 'react'
import { createHashtag, deleteHashtag } from '@/app/admin/actions'
import styles from '../admin.module.scss'

export default function HashtagsClient({ hashtags }) {
  const [errorMsg, setErrorMsg] = useState('')
  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    const formData = new FormData()
    formData.append('name', newName)

    const res = await createHashtag(formData)
    if (res.error) setErrorMsg(res.error)
    else {
      setNewName('')
      setCreating(false)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hashtag? It will be removed from all associated posts.')) return
    setLoading(true)
    setErrorMsg('')

    const res = await deleteHashtag(id)
    if (res.error) setErrorMsg(res.error)
    setLoading(false)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Manage Hashtags</h1>
          <p className={styles.pageSubtitle}>Total hashtags: {hashtags.length}</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setCreating(!creating)}>
          {creating ? 'Cancel' : '+ New Hashtag'}
        </button>
      </div>

      {errorMsg && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {errorMsg}
        </div>
      )}

      {creating && (
        <form
          onSubmit={handleCreate}
          style={{
            background: '#faf8f5',
            padding: 20,
            borderRadius: 12,
            marginBottom: 24,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-end',
            border: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>Hashtag Name</label>
            <input
              className={styles.input}
              style={{ marginBottom: 0 }}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. startup"
              required
            />
          </div>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Saving...' : 'Save Hashtag'}
          </button>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.recentPostsTable}>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Post Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hashtags.map((tag) => (
              <tr key={tag.id}>
                <td>
                  <code style={{ background: '#f5f0eb', padding: '4px 8px', borderRadius: 4, color: 'var(--green-dark)', fontWeight: 600 }}>
                    #{tag.name}
                  </code>
                </td>
                <td>
                  <span
                    style={{
                      background: '#f5f0eb',
                      color: 'var(--text-secondary)',
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {tag.postCount} Posts
                  </span>
                </td>
                <td>
                  <button className={styles.btnDanger} style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleDelete(tag.id)} disabled={loading}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {hashtags.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                  No hashtags found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
