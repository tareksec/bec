'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import styles from '../admin.module.scss'

const isMissingTaskTableError = (message) =>
  /Could not find the table 'public.tasks'|PGRST205|tasks.*does not exist/i.test(message || '')

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [tableMissing, setTableMissing] = useState(false)

  const loadTasks = async () => {
    if (!supabase) return

    setLoading(true)
    setTableMissing(false)
    const { data, error: loadError } = await supabase
      .from('tasks')
      .select('id, title, description, status, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (loadError) {
      const missingTable = isMissingTaskTableError(loadError.message)
      setTableMissing(missingTable)
      setError(
        missingTable
          ? 'The Supabase tasks table does not exist yet. Create the public.tasks table in Supabase to enable task management.'
          : loadError.message
      )
      setTasks([])
    } else {
      setTasks(data || [])
      setError('')
    }

    setLoading(false)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabase || !form.title.trim()) return

    if (tableMissing) {
      setError('The Supabase tasks table is missing. Create the table first in Supabase before adding tasks.')
      return
    }

    setSaving(true)
    setError('')

    const { error: insertError } = await supabase.from('tasks').insert([
      {
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status || 'pending',
      },
    ]).select('id')

    if (insertError) {
      const missingTable = isMissingTaskTableError(insertError.message)
      setTableMissing(missingTable)
      setError(
        missingTable
          ? 'The Supabase tasks table does not exist yet.'
          : insertError.message
      )
      setSaving(false)
      return
    }

    setForm({ title: '', description: '', status: 'pending' })
    await loadTasks()
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!supabase || !id) return

    if (tableMissing) {
      setError('The Supabase tasks table is missing.')
      return
    }

    const { error: deleteError } = await supabase.from('tasks').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    await loadTasks()
  }

  const handleStatusChange = async (id, nextStatus) => {
    if (!supabase || !id) return

    const { error: updateError } = await supabase.from('tasks').update({ status: nextStatus }).eq('id', id)
    if (updateError) {
      setError(updateError.message)
      return
    }

    await loadTasks()
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Tasks</h1>
          <p className={styles.pageSubtitle}>Track internal team tasks and editorial workflows</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className={styles.btnSecondary} onClick={() => loadTasks()}>Refresh</button>
          <Link href="/admin" className={styles.btnSecondary}>Back to dashboard</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#faf8f5', padding: 20, borderRadius: 12, border: '1px solid var(--border)', marginBottom: 24, display: 'grid', gap: 14 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>Title</label>
          <input
            className={styles.input}
            style={{ marginBottom: 0 }}
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Task title"
            disabled={tableMissing}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>Description</label>
          <textarea
            className={styles.textarea}
            style={{ minHeight: 70, marginBottom: 0 }}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Task details"
            disabled={tableMissing}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>Status</label>
          <select
            className={styles.select}
            style={{ marginBottom: 0 }}
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            disabled={tableMissing}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <button type="submit" className={styles.btnPrimary} disabled={saving || tableMissing}>
            {saving ? 'Saving...' : tableMissing ? 'Table missing' : 'Add task'}
          </button>
        </div>
      </form>

      {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}

      {loading ? (
        <div style={{ color: 'var(--text-secondary)', padding: 24, textAlign: 'center' }}>Loading tasks…</div>
      ) : tasks.length === 0 ? (
        <div style={{ background: '#faf8f5', border: '1px solid var(--border)', borderRadius: 12, padding: 24, color: 'var(--text-secondary)', textAlign: 'center' }}>
          No tasks found. Add your first task above.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tasks.map((task) => (
            <div key={task.id} style={{ background: '#faf8f5', borderRadius: 12, border: '1px solid var(--border)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: 16 }}>{task.title || 'Untitled task'}</strong>
                <span
                  className={`${styles.badge} ${
                    task.status === 'completed'
                      ? styles.badgePublished
                      : task.status === 'in_progress'
                        ? styles.badgeDraft
                        : styles.badgeArchived
                  }`}
                >
                  {task.status || 'pending'}
                </span>
              </div>
              <p style={{ margin: '0 0 12px', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>
                {task.description || 'No description provided.'}
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <select
                  value={task.status || 'pending'}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={styles.select}
                  style={{ width: 160, marginBottom: 0, padding: '6px 10px', fontSize: 13 }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button className={styles.btnDanger} onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
