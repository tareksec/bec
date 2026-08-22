'use client'

import { useState } from 'react'
import { createCategory, updateCategory, deleteCategory } from '@/app/admin/actions'
import styles from '../admin.module.scss'

export default function CategoriesClient({ categories = [] }) {
  const [errorMsg, setErrorMsg] = useState('')
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  // Create state
  const [newName, setNewName] = useState('')
  const [newSlug, setNewSlug] = useState('')

  // Edit state
  const [editName, setEditName] = useState('')
  const [editSlug, setEditSlug] = useState('')

  const handleNameChange = (val, setter, slugSetter) => {
    setter(val)
    slugSetter(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    const formData = new FormData()
    formData.append('name', newName)
    formData.append('slug', newSlug)

    const res = await createCategory(formData)
    if (res.error) {
      setErrorMsg(res.error)
    } else {
      setNewName('')
      setNewSlug('')
      setCreating(false)
    }
    setLoading(false)
  }

  const handleUpdate = async (id) => {
    setLoading(true)
    setErrorMsg('')
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', editName)
    formData.append('slug', editSlug)

    const res = await updateCategory(formData)
    if (res.error) {
      setErrorMsg(res.error)
    } else {
      setEditingId(null)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    setLoading(true)
    setErrorMsg('')

    const res = await deleteCategory(id)
    if (res.error) setErrorMsg(res.error)
    setLoading(false)
  }

  const startEdit = (cat) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditSlug(cat.slug)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Manage Categories</h1>
          <p className={styles.pageSubtitle}>Total categories: {categories.length}</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setCreating(!creating)}>
          {creating ? 'Cancel' : '+ New Category'}
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
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>
              Category Name
            </label>
            <input
              className={styles.input}
              style={{ marginBottom: 0 }}
              value={newName}
              onChange={(e) => handleNameChange(e.target.value, setNewName, setNewSlug)}
              placeholder="e.g. Technology"
              required
            />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>
              Slug
            </label>
            <input
              className={styles.input}
              style={{ marginBottom: 0 }}
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="e.g. technology"
              required
            />
          </div>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Saving...' : 'Save Category'}
          </button>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.recentPostsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Post Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>
                  {editingId === cat.id ? (
                    <input
                      className={styles.input}
                      style={{ marginBottom: 0 }}
                      value={editName}
                      onChange={(e) => handleNameChange(e.target.value, setEditName, setEditSlug)}
                    />
                  ) : (
                    <strong>{cat.name}</strong>
                  )}
                </td>
                <td>
                  {editingId === cat.id ? (
                    <input
                      className={styles.input}
                      style={{ marginBottom: 0 }}
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                    />
                  ) : (
                    <code style={{ background: '#f5f0eb', padding: '4px 8px', borderRadius: 4, color: 'var(--green-dark)', fontWeight: 600 }}>
                      {cat.slug}
                    </code>
                  )}
                </td>
                <td>
                  <span
                    style={{
                      background: '#f5f0eb',
                      color: 'var(--green-dark)',
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {cat.postCount || 0} {cat.postCount === 1 ? 'Post' : 'Posts'}
                  </span>
                </td>
                <td>
                  {editingId === cat.id ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className={styles.btnPrimary} style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleUpdate(cat.id)} disabled={loading}>
                        Save
                      </button>
                      <button className={styles.btnSecondary} style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setEditingId(null)} disabled={loading}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className={styles.btnSecondary} style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => startEdit(cat)}>
                        Edit
                      </button>
                      <button className={styles.btnDanger} style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleDelete(cat.id)} disabled={loading}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
