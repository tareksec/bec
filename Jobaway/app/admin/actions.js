'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// ──────────────────────────────────────────────
// CATEGORY ACTIONS
// ──────────────────────────────────────────────

export async function createCategory(formData) {
  const supabaseAdmin = await createSupabaseServerClient()
  const name = formData.get('name')?.toString().trim()
  const slug = formData.get('slug')?.toString().trim()

  if (!name || !slug) return { error: 'Name and slug are required' }

  const { error } = await supabaseAdmin
    .from('categories')
    .insert([{ name, slug }])
    .select('id')

  if (error) {
    if (error.code === '23505') return { error: 'A category with this name or slug already exists.' }
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

export async function updateCategory(formData) {
  const supabaseAdmin = await createSupabaseServerClient()
  const id = formData.get('id')?.toString().trim()
  const name = formData.get('name')?.toString().trim()
  const slug = formData.get('slug')?.toString().trim()

  if (!id || !name || !slug) return { error: 'ID, name, and slug are required' }

  const { error } = await supabaseAdmin
    .from('categories')
    .update({ name, slug })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') return { error: 'A category with this name or slug already exists.' }
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

export async function deleteCategory(id) {
  const supabaseAdmin = await createSupabaseServerClient()
  if (!id) return { error: 'ID is required' }

  const { data: usages, error: checkError } = await supabaseAdmin
    .from('post_categories')
    .select('post_id', { count: 'exact' })
    .eq('category_id', id)

  if (checkError) return { error: checkError.message }

  if (usages && usages.length > 0) {
    return { error: `Cannot delete: Category is currently used by ${usages.length} post(s). Please remove it from those posts first.` }
  }

  const { error } = await supabaseAdmin
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/categories')
  return { success: true }
}

// ──────────────────────────────────────────────
// HASHTAG ACTIONS
// ──────────────────────────────────────────────

export async function createHashtag(formData) {
  const supabaseAdmin = await createSupabaseServerClient()
  const name = formData.get('name')?.toString().trim()

  if (!name) return { error: 'Hashtag name is required' }
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  if (!cleanName) return { error: 'Invalid hashtag name' }

  const { error } = await supabaseAdmin
    .from('hashtags')
    .insert([{ name: cleanName }])
    .select('id')

  if (error) {
    if (error.code === '23505') return { error: 'Hashtag already exists' }
    return { error: error.message }
  }

  revalidatePath('/admin/hashtags')
  return { success: true }
}

export async function deleteHashtag(id) {
  const supabaseAdmin = await createSupabaseServerClient()
  if (!id) return { error: 'ID is required' }

  // Clean up any relational links in post_hashtags first to prevent foreign key errors
  await supabaseAdmin
    .from('post_hashtags')
    .delete()
    .eq('hashtag_id', id)

  const { error } = await supabaseAdmin
    .from('hashtags')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/hashtags')
  return { success: true }
}
