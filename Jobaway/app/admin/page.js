import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

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
