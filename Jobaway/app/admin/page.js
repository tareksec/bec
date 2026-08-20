import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Fetch counts in parallel
  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: totalCategories },
    { count: totalHashtags }
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('hashtags').select('*', { count: 'exact', head: true })
  ])

  const stats = {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalHashtags,
  }

  return <AdminClient initialStats={stats} />
}
