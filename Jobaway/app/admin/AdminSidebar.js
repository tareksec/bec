'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const S = {
  sidebar: {
    width: 260,
    background: '#0f172a',
    borderRight: '1px solid #1e293b',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    fontFamily: 'var(--arimo), sans-serif'
  },
  logo: {
    padding: '24px',
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    borderBottom: '1px solid #1e293b',
    marginBottom: 16
  },
  section: {
    padding: '0 16px',
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 12,
    paddingLeft: 8
  },
  link: (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    borderRadius: 8,
    color: isActive ? '#fff' : '#94a3b8',
    background: isActive ? '#1e293b' : 'transparent',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
    transition: 'all 0.2s'
  }),
  icon: {
    fontSize: 18
  }
}

export default function AdminSidebar() {
  const pathname = usePathname()

  const navGroups = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'Tasks', href: '/admin/tasks', icon: '✅' },
        { label: 'Calendar', href: '/admin/calendar', icon: '📅' },
        { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
        { label: 'Team', href: '/admin/team', icon: '👥' },
      ]
    },
    {
      title: 'Content',
      items: [
        { label: 'All Posts', href: '/admin/posts', icon: '📝' },
        { label: 'Create Post', href: '/admin/posts/create', icon: '✍️' },
        { label: 'Categories', href: '/admin/categories', icon: '📁' },
        { label: 'Hashtags', href: '/admin/hashtags', icon: '#️⃣' },
      ]
    }
  ]

  return (
    <aside style={S.sidebar}>
      <div style={S.logo}>BEC Admin</div>
      
      {navGroups.map((group, i) => (
        <div key={i} style={S.section}>
          <div style={S.sectionTitle}>{group.title}</div>
          {group.items.map(item => {
            // Exact match for Dashboard (/admin), prefix match for others
            const isActive = item.href === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(item.href)

            return (
              <Link key={item.href} href={item.href} style={S.link(isActive)}>
                <span style={S.icon}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
