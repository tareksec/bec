import { supabaseAdmin } from '@/lib/supabase/server'
import HashtagsClient from './HashtagsClient'

export const dynamic = 'force-dynamic'

export default async function HashtagsPage() {
  // Fetch hashtags with the count of related post_hashtags records
  const { data: hashtags, error } = await supabaseAdmin
    .from('hashtags')
    .select(`
      id, 
      name, 
      post_hashtags ( count )
    `)
    .order('name')

  if (error) {
    console.error("Error fetching hashtags:", error)
  }

  // Format data to flatten the postCount
  const formattedHashtags = (hashtags || []).map(tag => ({
    id: tag.id,
    name: tag.name,
    postCount: tag.post_hashtags?.[0]?.count || 0
  }))

  return <HashtagsClient hashtags={formattedHashtags} />
}
