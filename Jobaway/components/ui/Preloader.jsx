'use client'
import { useEffect, useState } from 'react'
import styles from './LumaSpin.module.scss'

const Preloader = () => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${styles['bec-preloader']} ${hidden ? styles['hidden'] : ''}`}>
      <div className={styles['luma-wrap']}>
        <span className={`${styles['luma-span']} ${styles['span-1']}`} />
        <span className={`${styles['luma-span']} ${styles['span-2']}`} />
      </div>
      <p className={styles['bec-label']}>BEC</p>
    </div>
  )
}

export default Preloader
