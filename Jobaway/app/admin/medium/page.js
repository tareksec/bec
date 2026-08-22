import { getMediumPosts } from '@/lib/medium'
import MediumClient from './MediumClient'

export const dynamic = 'force-dynamic'

export default async function MediumAdminPage() {
  const posts = await getMediumPosts()

  return <MediumClient initialPosts={posts || []} />
}
