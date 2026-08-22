import Link from 'next/link'
import styles from '../admin.module.scss'

export default function TeamPage() {
  const team = [
    { name: 'Aisha Rahman', role: 'Operations Lead', email: 'aisha@bec.com.bd' },
    { name: 'Rafi Karim', role: 'Growth Strategist', email: 'rafi@bec.com.bd' },
    { name: 'Nadia Islam', role: 'Content Manager', email: 'nadia@bec.com.bd' },
    { name: 'Tariq Hossain', role: 'Product Analyst', email: 'tariq@bec.com.bd' },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>BEC Team</h1>
          <p className={styles.pageSubtitle}>Internal staff and operations team members</p>
        </div>
        <Link href="/admin" className={styles.btnSecondary}>
          Back to dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {team.map((member) => (
          <div
            key={member.email}
            style={{
              background: '#faf8f5',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-dark)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 8 }}>
              {member.name[0]}
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>{member.name}</div>
            <div style={{ color: 'var(--green-dark)', fontSize: 13, fontWeight: 600 }}>{member.role}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{member.email}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
