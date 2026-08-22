'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase, hasSupabaseConfig } from '@/lib/supabase/client'
import CircularProgress from './components/CircularProgress'
import styles from './admin.module.scss'

/* ──────────────────────────────────────────────
   Confirmation dialog
   ────────────────────────────────────────────── */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ maxWidth: 420, textAlign: 'center' }}>
        <h3 className={styles.cardTitle} style={{ marginBottom: 12 }}>Confirmation</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className={styles.btnDanger} style={{ padding: '10px 20px', fontSize: 14 }} onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className={styles.btnSecondary} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Generic form modal
   ────────────────────────────────────────────── */
function FormModal({ title, fields, data, onChange, onSave, onCancel, saving }) {
  const [uploadingState, setUploadingState] = useState({})

  const handleUpload = async (e, key) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingState((prev) => ({ ...prev, [key]: true }))

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      alert(`Upload failed: ${uploadError.message}`)
      setUploadingState((prev) => ({ ...prev, [key]: false }))
      return
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    onChange(key, urlData.publicUrl)
    setUploadingState((prev) => ({ ...prev, [key]: false }))
  }

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.cardTitle} style={{ marginBottom: 20 }}>{title}</h3>
        {fields.map((f) => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              {f.label}
            </label>
            {f.type === 'textarea' ? (
              <textarea
                className={styles.textarea}
                style={{ minHeight: 80 }}
                value={data[f.key] || ''}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            ) : f.type === 'image' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, f.key)}
                  style={{ fontSize: 13 }}
                  disabled={uploadingState[f.key]}
                />
                <input
                  className={styles.input}
                  style={{ marginBottom: 0 }}
                  type="text"
                  placeholder="Or paste image URL here..."
                  value={data[f.key] || ''}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  disabled={uploadingState[f.key]}
                />
                {uploadingState[f.key] && (
                  <span style={{ fontSize: 12, color: 'var(--green-dark)' }}>Uploading...</span>
                )}
                {data[f.key] && !uploadingState[f.key] && (
                  <img
                    src={data[f.key]}
                    alt="Preview"
                    style={{ height: 60, objectFit: 'cover', borderRadius: 6, alignSelf: 'flex-start', marginTop: 6 }}
                  />
                )}
              </div>
            ) : (
              <input
                className={styles.input}
                type={f.type || 'text'}
                value={data[f.key] || ''}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, justifyContent: 'flex-end' }}>
          <button className={styles.btnSecondary} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   TAB: REVIEWS
   ══════════════════════════════════════════════ */
function ReviewsTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase.from('reviews').select('id, name, content, rating, approved, created_at').order('created_at', { ascending: false }).limit(50)
    if (err) setError(err.message)
    else setRows(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const toggle = async (id, current) => {
    const { error: err } = await supabase.from('reviews').update({ approved: !current }).eq('id', id)
    if (err) setError(err.message)
    else load()
  }

  const del = async (id) => {
    const { error: err } = await supabase.from('reviews').delete().eq('id', id)
    if (err) setError(err.message)
    setConfirmDelete(null)
    load()
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading reviews…</div>

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Manage Reviews</h3>
      </div>
      {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 16px', borderRadius: 8, marginBottom: 16 }}>{error}</div>}
      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>No reviews found.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.recentPostsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.name}</strong></td>
                  <td style={{ maxWidth: 300 }}>{r.content}</td>
                  <td>{r.rating ?? '—'}</td>
                  <td>
                    <span className={`${styles.badge} ${r.approved ? styles.badgePublished : styles.badgeDraft}`}>
                      {r.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.btnSecondary}
                      style={{ padding: '4px 10px', fontSize: 12, marginRight: 6 }}
                      onClick={() => toggle(r.id, r.approved)}
                    >
                      {r.approved ? 'Reject' : 'Approve'}
                    </button>
                    <button
                      className={styles.btnDanger}
                      onClick={() => setConfirmDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {confirmDelete && (
        <ConfirmDialog
          message="Delete this review permanently?"
          onConfirm={() => del(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   TAB: SETTINGS
   ══════════════════════════════════════════════ */
function SettingsTab() {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>General Settings</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
        Configure your Bangladesh Executive Chamber (BEC) platform preferences, site identity, and administration options.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 24 }}>
        <div style={{ padding: 20, background: '#faf8f5', borderRadius: 12, border: '1px solid var(--border)' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Site Branding</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: 13, color: 'var(--text-secondary)' }}>Organization: Bangladesh Executive Chamber (BEC)</p>
          <button className={styles.btnSecondary} style={{ fontSize: 13 }}>Edit Details</button>
        </div>
        <div style={{ padding: 20, background: '#faf8f5', borderRadius: 12, border: '1px solid var(--border)' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Security & Auth</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: 13, color: 'var(--text-secondary)' }}>Managed via Supabase Authentication & RLS Policies</p>
          <button className={styles.btnSecondary} style={{ fontSize: 13 }}>Manage Access</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT: AdminClient
   ══════════════════════════════════════════════ */
export default function AdminClient({ initialStats = {}, recentPosts = [] }) {
  const router = useRouter()
  const [session, setSession] = useState(undefined)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [topTab, setTopTab] = useState('posts') // 'posts' | 'media' | 'settings'

  const totalPosts = initialStats.totalPosts || 0
  const publishedPosts = initialStats.publishedPosts || 0
  const draftPosts = initialStats.draftPosts || 0
  const totalCategories = initialStats.totalCategories || 0
  const totalHashtags = initialStats.totalHashtags || 0

  const publishedPercentage = totalPosts > 0
    ? Math.round((publishedPosts / totalPosts) * 100)
    : 0

  // ── Session Check ──
  useEffect(() => {
    if (!supabase) {
      setSession(null)
      return
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription?.unsubscribe()
  }, [])

  // ── Supabase Configuration Guard ──
  if (!hasSupabaseConfig || !supabase) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 12 }}>
            Configuration Error
          </h1>
          <p style={{ color: '#b91c1c', fontSize: 14, textAlign: 'center' }}>
            Supabase environment variables are missing. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </p>
        </div>
      </div>
    )
  }

  // ── Login Handlers ──
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
    setLoginLoading(false)
  }

  // ── Loading state ──
  if (session === undefined) {
    return (
      <div className={styles.loginWrap}>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontWeight: 600 }}>
          Loading admin dashboard…
        </div>
      </div>
    )
  }

  // ── LOGIN SCREEN ──
  if (!session) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 48, height: 48, background: 'var(--green-dark)', color: '#fff', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>BEC Admin</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Sign in with your administrator credentials</p>
          </div>

          {loginError && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: 8, marginBottom: 18, fontSize: 13 }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@bec.com.bd"
            />
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <button
              type="submit"
              className={styles.btnPrimary}
              style={{ width: '100%', padding: '12px 0', marginTop: 4 }}
              disabled={loginLoading}
            >
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── QUICK ACCESS CARDS DATA ──
  const quickAccessItems = [
    {
      label: 'Create Post',
      href: '/admin/posts/create',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      )
    },
    {
      label: 'All Posts',
      href: '/admin/posts',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      )
    },
    {
      label: 'Categories',
      href: '/admin/categories',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      )
    },
    {
      label: 'Hashtags',
      href: '/admin/hashtags',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <line x1="10" y1="3" x2="8" y2="21" />
          <line x1="16" y1="3" x2="14" y2="21" />
        </svg>
      )
    },
    {
      label: 'Medium Posts',
      href: '/admin/medium',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      )
    },
  ]

  const userInitial = session?.user?.email ? session.user.email[0].toUpperCase() : 'A'

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className={styles.topBar}>
        {/* Pill Tabs: Posts | Media | Settings */}
        <div className={styles.pillTabs}>
          <button
            type="button"
            className={`${styles.pillTab} ${topTab === 'posts' ? styles.pillTabActive : ''}`}
            onClick={() => setTopTab('posts')}
          >
            Posts
          </button>
          <button
            type="button"
            className={`${styles.pillTab} ${topTab === 'media' ? styles.pillTabActive : ''}`}
            onClick={() => setTopTab('media')}
          >
            Media
          </button>
          <button
            type="button"
            className={`${styles.pillTab} ${topTab === 'settings' ? styles.pillTabActive : ''}`}
            onClick={() => setTopTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Right side: Bell icon + Avatar + Email */}
        <div className={styles.topRight}>
          <button type="button" className={styles.iconBtn} aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className={styles.notificationDot} />
          </button>

          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>{userInitial}</div>
            <span className={styles.userEmail}>{session?.user?.email || 'admin@bec.com.bd'}</span>
          </div>
        </div>
      </div>

      {/* ── PAGE TITLE ── */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage your BEC content</p>
      </div>

      {topTab === 'settings' ? (
        <SettingsTab />
      ) : topTab === 'media' ? (
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>Media Library</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Images uploaded across blog posts and banners are stored securely in Supabase Storage buckets.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <Link href="/admin/posts" className={styles.btnPrimary}>View Associated Posts</Link>
          </div>
        </div>
      ) : (
        <>
          {/* ── QUICK ACCESS CARDS ROW ── */}
          <div className={styles.quickAccessRow}>
            {quickAccessItems.map((item) => (
              <Link key={item.label} href={item.href} className={styles.quickAccessCard}>
                <span className={styles.activeDot} />
                <div className={styles.quickAccessIcon}>{item.icon}</div>
                <span className={styles.quickAccessLabel}>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* ── STATS SECTION (Three Columns) ── */}
          <div className={styles.statsSection}>
            {/* LEFT COLUMN: Recent Posts Table */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Recent Posts</h3>
                <Link href="/admin/posts" style={{ color: 'var(--green-dark)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  View All →
                </Link>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className={styles.recentPostsTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', padding: 24, color: 'var(--text-secondary)' }}>
                          No recent posts found.
                        </td>
                      </tr>
                    ) : (
                      recentPosts.map((post) => {
                        const statusClass = post.status === 'published'
                          ? styles.badgePublished
                          : post.status === 'archived'
                            ? styles.badgeArchived
                            : styles.badgeDraft

                        return (
                          <tr key={post.id}>
                            <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                              #{post.id.substring(0, 4)}
                            </td>
                            <td>
                              <Link href={`/admin/posts/${post.id}/edit`} className={styles.postTitleLink}>
                                {post.title}
                              </Link>
                            </td>
                            <td>
                              <span className={`${styles.badge} ${statusClass}`}>
                                {post.status || 'draft'}
                              </span>
                            </td>
                            <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                              {post.created_at ? new Date(post.created_at).toLocaleDateString() : '—'}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Add New Post button at bottom */}
              <Link href="/admin/posts/create" className={styles.btnAddPostOutlined}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Post
              </Link>
            </div>

            {/* MIDDLE COLUMN: Quick Stats Rows */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Quick Stats</h3>
              </div>

              <div className={styles.quickStatRows}>
                <div className={styles.quickStatRow}>
                  <span className={styles.quickStatLabel}>Total Posts</span>
                  <span className={styles.quickStatValue}>{totalPosts}</span>
                </div>
                <div className={styles.quickStatRow}>
                  <span className={styles.quickStatLabel}>Published</span>
                  <span className={styles.quickStatValue} style={{ color: 'var(--green-dark)' }}>{publishedPosts}</span>
                </div>
                <div className={styles.quickStatRow}>
                  <span className={styles.quickStatLabel}>Draft</span>
                  <span className={styles.quickStatValue} style={{ color: '#b45309' }}>{draftPosts}</span>
                </div>
                <div className={styles.quickStatRow}>
                  <span className={styles.quickStatLabel}>Categories</span>
                  <span className={styles.quickStatValue}>{totalCategories}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Audit / Overview Circular Progress */}
            <div className={`${styles.card} ${styles.auditCard}`}>
              <div className={styles.cardHeader} style={{ width: '100%' }}>
                <h3 className={styles.cardTitle}>Audit / Overview</h3>
              </div>

              <CircularProgress percentage={publishedPercentage} label="PUBLISHED" />

              <div className={styles.progressBarsWrap}>
                <div className={styles.progressBarItem}>
                  <div className={styles.progressBarHeader}>
                    <span>Categories</span>
                    <span>{totalCategories}</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${Math.min(totalCategories * 15, 100)}%` }}
                    />
                  </div>
                </div>

                <div className={styles.progressBarItem}>
                  <div className={styles.progressBarHeader}>
                    <span>Hashtags</span>
                    <span>{totalHashtags}</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={`${styles.progressBarFill} ${styles.progressBarFillGold}`}
                      style={{ width: `${Math.min(totalHashtags * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
