import Link from 'next/link'

const styles = {
  page: { padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' },
  card: { background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  title: { margin: 0, fontSize: 28, color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 },
  metric: { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 18 },
  label: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px' },
  value: { marginTop: 10, fontSize: 28, fontWeight: 700, color: '#fff' },
  panel: { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 20, minHeight: 180 },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 },
  item: { display: 'flex', justifyContent: 'space-between', gap: 8, borderBottom: '1px solid #1e293b', paddingBottom: 8 },
}

export default function CalendarPage() {
  const events = [
    { title: 'Editorial planning', date: 'Mon, 12 Aug', time: '10:00 AM' },
    { title: 'Client sync', date: 'Tue, 13 Aug', time: '02:30 PM' },
    { title: 'Campaign review', date: 'Wed, 14 Aug', time: '09:00 AM' },
    { title: 'Team sprint', date: 'Thu, 15 Aug', time: '11:15 AM' },
  ]

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Calendar</h1>
          <Link href="/admin" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Back to dashboard</Link>
        </div>

        <div style={styles.grid}>
          <div style={styles.metric}>
            <div style={styles.label}>This week</div>
            <div style={styles.value}>14</div>
          </div>
          <div style={styles.metric}>
            <div style={styles.label}>Meetings</div>
            <div style={styles.value}>6</div>
          </div>
          <div style={styles.metric}>
            <div style={styles.label}>Deadlines</div>
            <div style={styles.value}>3</div>
          </div>
        </div>

        <div style={styles.panel}>
          <h2 style={{ marginTop: 0, color: '#fff', marginBottom: 18 }}>Upcoming items</h2>
          <ul style={styles.list}>
            {events.map((event, index) => (
              <li key={index} style={styles.item}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{event.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{event.date}</div>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{event.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
