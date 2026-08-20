import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Guard: during build, env vars may be empty. The client is created
// but will fail at runtime if the vars are truly missing — which is
// the correct behaviour (shows an error in the UI instead of crashing
// the build).
export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
