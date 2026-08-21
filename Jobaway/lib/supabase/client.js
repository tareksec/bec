import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export function createClientComponentClient() {
  if (!hasSupabaseConfig || typeof window === 'undefined') {
    return null
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export const supabase = hasSupabaseConfig && typeof window !== 'undefined'
  ? createClientComponentClient()
  : null

export { hasSupabaseConfig }
