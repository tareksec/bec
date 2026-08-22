'use client'

import styles from '../admin.module.scss'

const CircularProgress = ({ percentage = 0, label = 'PUBLISHED' }) => {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const validPercentage = Math.min(Math.max(Math.round(Number(percentage) || 0), 0), 100)
  const offset = circumference - (validPercentage / 100) * circumference

  return (
    <div className={styles.circularWrap}>
      <svg className={styles.circularSvg} width="160" height="160" viewBox="0 0 160 160">
        <circle
          className={styles.circularBg}
          cx="80"
          cy="80"
          r={radius}
        />
        <circle
          className={styles.circularProgressCircle}
          cx="80"
          cy="80"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.circularText}>
        <span className={styles.circularPercent}>{validPercentage}%</span>
        <span className={styles.circularLabel}>{label}</span>
      </div>
    </div>
  )
}

export default CircularProgress
