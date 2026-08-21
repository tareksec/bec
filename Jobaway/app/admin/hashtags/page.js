import { createSupabaseServerClient } from '@/lib/supabase/server'
import HashtagsClient from './HashtagsClient'

export const dynamic = 'force-dynamic'

export default async function HashtagsPage() {
  const supabaseAdmin = await createSupabaseServerClient()
  const { data: hashtags, error } = await supabaseAdmin
    .from('hashtags')
    .select(`
      id,
      name,
      post_hashtags ( count )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching hashtags:', error)
  }

  const formattedHashtags = (hashtags || []).map(tag => ({
    id: tag.id,
    name: tag.name,
    postCount: tag.post_hashtags?.[0]?.count || 0
  }))

  return <HashtagsClient hashtags={formattedHashtags} />
}
