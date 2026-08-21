import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  let tasks = []

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Tasks load error:', error)
    } else {
      tasks = data || []
    }
  } catch (error) {
    console.error('Tasks page error:', error)
  }

  return (
    <div style={{ padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' }}>
      <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: 28, color: '#fff' }}>Tasks</h1>
          <Link href="/admin" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Back to dashboard</Link>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {tasks.length === 0 ? (
            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 24, color: '#cbd5e1' }}>
              No tasks found yet. The tasks table is either empty or not configured in Supabase.
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id || task.title || Math.random()} style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #334155', padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  <strong style={{ color: '#fff', fontSize: 18 }}>{task.title || 'Untitled task'}</strong>
                  <span style={{ background: '#334155', color: '#cbd5e1', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    {task.status || 'pending'}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{task.description || 'No description provided.'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
