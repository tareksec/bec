import { createSupabaseServerClient } from '@/lib/supabase/server'
import PostsClient from './PostsClient'

export const dynamic = 'force-dynamic'

export default async function PostsPage({ searchParams }) {
  const resolvedParams = await searchParams
  const supabaseAdmin = await createSupabaseServerClient()

  const page = Math.max(parseInt(resolvedParams?.page || '1', 10), 1)
  const limit = 20
  const offset = (page - 1) * limit

  const search = resolvedParams?.search || ''
  const status = resolvedParams?.status || ''
  const categoryId = resolvedParams?.category || ''

  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, name')
    .order('name')

  const categoryRelation = categoryId ? 'post_categories!inner' : 'post_categories'
  let query = supabaseAdmin
    .from('posts')
    .select(`
      id,
      title,
      slug,
      cover_image,
      status,
      created_at,
      ${categoryRelation} (
        categories (id, name)
      ),
      post_hashtags (
        hashtags (id, name)
      )
    `, { count: 'exact' })

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  if (status) {
    query = query.eq('status', status)
  }

  if (categoryId) {
    query = query.eq('post_categories.category_id', categoryId)
  }

  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data: posts, count, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
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
