import Link from 'next/link'

const styles = {
  page: { padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' },
  card: { background: '#1e293b', borderRadius: 16, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  title: { margin: 0, fontSize: 28, color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 },
  member: { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 18 },
  name: { fontWeight: 700, color: '#fff', marginBottom: 4 },
  role: { color: '#a78bfa', fontSize: 13, marginBottom: 8 },
  meta: { color: '#94a3b8', fontSize: 13 },
}

export default function TeamPage() {
  const team = [
    { name: 'Aisha Rahman', role: 'Operations Lead', email: 'aisha@bec.example' },
    { name: 'Rafi Karim', role: 'Growth Strategist', email: 'rafi@bec.example' },
    { name: 'Nadia Islam', role: 'Content Manager', email: 'nadia@bec.example' },
    { name: 'Tariq Hossain', role: 'Product Analyst', email: 'tariq@bec.example' },
  ]

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Team</h1>
          <Link href="/admin" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Back to dashboard</Link>
        </div>

        <div style={styles.grid}>
          {team.map((member) => (
            <div key={member.email} style={styles.member}>
              <div style={styles.name}>{member.name}</div>
              <div style={styles.role}>{member.role}</div>
              <div style={styles.meta}>{member.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
