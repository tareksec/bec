import { createSupabaseServerClient } from '@/lib/supabase/server'
import CategoriesClient from './CategoriesClient'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const supabaseAdmin = await createSupabaseServerClient()
  const { data: categories, error } = await supabaseAdmin
    .from('categories')
    .select(`
      id,
      name,
      slug,
      post_categories ( count )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
  }

  const formattedCategories = (categories || []).map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    postCount: cat.post_categories?.[0]?.count || 0,
  }))

  return <CategoriesClient categories={formattedCategories} />
}
