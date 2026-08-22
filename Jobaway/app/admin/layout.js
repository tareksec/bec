'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import AdminSidebar from './AdminSidebar'
import styles from './admin.module.scss'

export default function AdminLayout({ children }) {
  const [session, setSession] = useState(undefined)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setSession(null)
      return
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription?.unsubscribe()
  }, [])

  // If loading or not logged in, render children inside outer wrapper (handles login screen)
  if (!session) {
    return (
      <div className={styles.outerWrapper}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.outerWrapper}>
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <main className={styles.mainContent}>
        {/* Mobile toggle button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }} className="d-md-none">
          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </main>
    </div>
  )
}
