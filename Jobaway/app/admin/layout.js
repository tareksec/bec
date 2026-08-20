'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  // If loading or not logged in, just render children (which handles login UI in page.js)
  if (!session) {
    return <div style={{ background: '#0f172a', minHeight: '100vh' }}>{children}</div>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
