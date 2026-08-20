import { supabaseAdmin } from '@/lib/supabase/server'
import CategoriesClient from './CategoriesClient'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const { data: categories, error } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error("Error fetching categories:", error)
  }

  return <CategoriesClient categories={categories || []} />
}
