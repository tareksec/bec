import { supabaseAdmin } from '@/lib/supabase/server'
import PostsClient from './PostsClient'

export const dynamic = 'force-dynamic'

export default async function PostsPage({ searchParams }) {
  const resolvedParams = await searchParams
  
  const page = parseInt(resolvedParams.page || '1', 10)
  const limit = 10
  const offset = (page - 1) * limit
  
  const search = resolvedParams.search || ''
  const status = resolvedParams.status || ''
  const categoryId = resolvedParams.category || ''

  // 1. Fetch categories for the dropdown filter
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, name')
    .order('name')

  // 2. Build the posts query
  // We use the service role client (supabaseAdmin) here since this is an admin page
  // and we want to bypass RLS to see all drafts/archived posts easily without complex auth passing.
  
  // The base select query pulling all relations
  let query = supabaseAdmin
    .from('posts')
    .select(`
      *,
      post_categories!inner (
        categories (id, name)
      ),
      post_hashtags (
        hashtags (id, name)
      )
    `, { count: 'exact' })

  // Apply filters
  if (search) {
    query = query.ilike('title', `%${search}%`)
  }
  
  if (status) {
    query = query.eq('status', status)
  }

  if (categoryId) {
    query = query.eq('post_categories.category_id', categoryId)
  }

  // Apply pagination and ordering
  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data: posts, count, error } = await query

  if (error) {
    console.error("Error fetching posts:", error)
  }

  return (
    <PostsClient 
      posts={posts || []} 
      totalCount={count || 0}
      categories={categories || []}
      page={page}
      limit={limit}
    />
  )
}
