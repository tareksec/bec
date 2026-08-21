import Link from 'next/link'

const styles = {
  page: { padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' },
  card: { background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  title: { margin: 0, fontSize: 28, color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 },
  metric: { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 18 },
  label: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px' },
  value: { marginTop: 10, fontSize: 28, fontWeight: 700, color: '#fff' },
  trend: { color: '#86efac', fontSize: 13, marginTop: 8 },
}

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Visitors', value: '18.4K', trend: '+12.6%' },
    { label: 'Engagement', value: '64%', trend: '+8.1%' },
    { label: 'Leads', value: '324', trend: '+14.9%' },
    { label: 'Conversion', value: '3.7%', trend: '+1.2%' },
  ]

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Analytics</h1>
          <Link href="/admin" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Back to dashboard</Link>
        </div>

        <div style={styles.grid}>
          {metrics.map((item) => (
            <div key={item.label} style={styles.metric}>
              <div style={styles.label}>{item.label}</div>
              <div style={styles.value}>{item.value}</div>
              <div style={styles.trend}>{item.trend} vs last month</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
