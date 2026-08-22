import { createSupabaseServerClient } from '@/lib/supabase/server'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()

  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: totalCategories },
    { count: totalHashtags },
    { data: recentPosts }
  ] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('categories').select('id', { count: 'exact', head: true }),
    supabase.from('hashtags').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id, title, status, created_at, slug').order('created_at', { ascending: false }).limit(6)
  ])

  const stats = {
    totalPosts: totalPosts || 0,
    publishedPosts: publishedPosts || 0,
    draftPosts: draftPosts || 0,
    totalCategories: totalCategories || 0,
    totalHashtags: totalHashtags || 0,
  }

  return <AdminClient initialStats={stats} recentPosts={recentPosts || []} />
}
