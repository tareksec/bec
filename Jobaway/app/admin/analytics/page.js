import Link from 'next/link'
import styles from '../admin.module.scss'

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Visitors', value: '18.4K', trend: '+12.6%' },
    { label: 'Engagement Rate', value: '64%', trend: '+8.1%' },
    { label: 'Inquiries & Leads', value: '324', trend: '+14.9%' },
    { label: 'Post Conversion', value: '3.7%', trend: '+1.2%' },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Analytics Overview</h1>
          <p className={styles.pageSubtitle}>Real-time performance metrics and reader engagement</p>
        </div>
        <Link href="/admin" className={styles.btnSecondary}>
          Back to dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {metrics.map((item) => (
          <div
            key={item.label}
            style={{
              background: '#faf8f5',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div className={styles.quickStatLabel}>{item.label}</div>
            <div className={styles.quickStatValue} style={{ margin: '8px 0 6px 0' }}>{item.value}</div>
            <div style={{ color: 'var(--green-dark)', fontSize: 13, fontWeight: 600 }}>
              {item.trend} vs last month
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
