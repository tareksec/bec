'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const styles = {
  page: { padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' },
  card: { background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 12, flexWrap: 'wrap' },
  title: { margin: 0, fontSize: 28, color: '#fff' },
  toolbar: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  form: { display: 'grid', gap: 14, background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 20, marginBottom: 24 },
  input: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, outline: 'none' },
  textarea: { width: '100%', minHeight: 100, padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, resize: 'vertical', outline: 'none' },
  select: { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontSize: 15, outline: 'none' },
  btn: { padding: '10px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, cursor: 'pointer' },
  secondary: { padding: '10px 18px', borderRadius: 8, border: '1px solid #475569', background: 'transparent', color: '#cbd5e1', fontWeight: 600, cursor: 'pointer' },
  danger: { padding: '8px 12px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 600, cursor: 'pointer' },
  taskCard: { background: '#0f172a', borderRadius: 12, border: '1px solid #334155', padding: 20, marginBottom: 16 },
  taskHeader: { display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8 },
  badge: { background: '#334155', color: '#cbd5e1', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600 }
}

const isMissingTaskTableError = (message) => /Could not find the table 'public.tasks'|PGRST205|tasks.*does not exist/i.test(message || '')

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
      .select('*')
      .order('created_at', { ascending: false })

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

    const { error: insertError } = await supabase
      .from('tasks')
      .insert([
        {
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status || 'pending',
        },
      ])

    if (insertError) {
      const missingTable = isMissingTaskTableError(insertError.message)
      setTableMissing(missingTable)
      setError(
        missingTable
          ? 'The Supabase tasks table does not exist yet. Create the public.tasks table in Supabase to enable task management.'
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
      setError('The Supabase tasks table is missing. Create the table first in Supabase before deleting tasks.')
      return
    }

    const { error: deleteError } = await supabase.from('tasks').delete().eq('id', id)
    if (deleteError) {
      const missingTable = isMissingTaskTableError(deleteError.message)
      setTableMissing(missingTable)
      setError(
        missingTable
          ? 'The Supabase tasks table does not exist yet. Create the public.tasks table in Supabase to enable task management.'
          : deleteError.message
      )
      return
    }

    await loadTasks()
  }

  const handleStatusChange = async (id, nextStatus) => {
    if (!supabase || !id) return

    if (tableMissing) {
      setError('The Supabase tasks table is missing. Create the table first in Supabase before changing task status.')
      return
    }

    const { error: updateError } = await supabase
      .from('tasks')
      .update({ status: nextStatus })
      .eq('id', id)

    if (updateError) {
      const missingTable = isMissingTaskTableError(updateError.message)
      setTableMissing(missingTable)
      setError(
        missingTable
          ? 'The Supabase tasks table does not exist yet. Create the public.tasks table in Supabase to enable task management.'
          : updateError.message
      )
      return
    }

    await loadTasks()
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Tasks</h1>
          <Link href="/admin" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Back to dashboard</Link>
        </div>

        <div style={styles.toolbar}>
          <button style={styles.secondary} onClick={() => loadTasks()}>Refresh</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontWeight: 600 }}>Title</label>
            <input
              style={styles.input}
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Task title"
              disabled={tableMissing}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontWeight: 600 }}>Description</label>
            <textarea
              style={styles.textarea}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Task details"
              disabled={tableMissing}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontWeight: 600 }}>Status</label>
            <select
              style={styles.select}
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
            <button type="submit" style={styles.btn} disabled={saving || tableMissing}>
              {saving ? 'Saving...' : tableMissing ? 'Table missing' : 'Add task'}
            </button>
          </div>
        </form>

        {error && <div style={{ background: '#7f1d1d', color: '#fecaca', padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}

        {loading ? (
          <div style={{ color: '#cbd5e1', padding: 12 }}>Loading tasks…</div>
        ) : tasks.length === 0 ? (
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 24, color: '#cbd5e1' }}>
            No tasks found. Add your first task above.
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={styles.taskCard}>
              <div style={styles.taskHeader}>
                <strong style={{ color: '#fff', fontSize: 18 }}>{task.title || 'Untitled task'}</strong>
                <span style={styles.badge}>{task.status || 'pending'}</span>
              </div>
              <p style={{ margin: '0 0 16px', color: '#cbd5e1', lineHeight: 1.6 }}>{task.description || 'No description provided.'}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <select
                  value={task.status || 'pending'}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  style={{ ...styles.select, width: 180 }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button style={styles.danger} onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
