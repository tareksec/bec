import Link from 'next/link'
import styles from '../admin.module.scss'

export default function CalendarPage() {
  const events = [
    { title: 'Editorial planning & Review', date: 'Mon, 12 Aug', time: '10:00 AM' },
    { title: 'BEC Member Executive Sync', date: 'Tue, 13 Aug', time: '02:30 PM' },
    { title: 'Campaign & Media Review', date: 'Wed, 14 Aug', time: '09:00 AM' },
    { title: 'Career Acceleration Workshop', date: 'Thu, 15 Aug', time: '11:15 AM' },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Calendar</h1>
          <p className={styles.pageSubtitle}>Scheduled webinars, editorial sprints, and executive meetings</p>
        </div>
        <Link href="/admin" className={styles.btnSecondary}>
          Back to dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className={styles.quickStatRow}>
          <div>
            <div className={styles.quickStatLabel}>This week</div>
            <div className={styles.quickStatValue}>14</div>
          </div>
        </div>
        <div className={styles.quickStatRow}>
          <div>
            <div className={styles.quickStatLabel}>Meetings</div>
            <div className={styles.quickStatValue}>6</div>
          </div>
        </div>
        <div className={styles.quickStatRow}>
          <div>
            <div className={styles.quickStatLabel}>Deadlines</div>
            <div className={styles.quickStatValue} style={{ color: '#b45309' }}>3</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#faf8f5', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
        <h3 className={styles.cardTitle} style={{ fontSize: 16, marginBottom: 16 }}>Upcoming Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {events.map((event, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: '#ffffff',
                borderRadius: 8,
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{event.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>{event.date}</div>
              </div>
              <div style={{ color: 'var(--green-dark)', fontWeight: 600, fontSize: 13 }}>{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
