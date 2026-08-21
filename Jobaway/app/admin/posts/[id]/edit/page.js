import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }) {
  const resolvedParams = await params
  const postId = resolvedParams.id

  let post = null

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (error) {
      console.error('Edit post fetch error:', error)
    } else {
      post = data
    }
  } catch (error) {
    console.error('Edit post page error:', error)
  }

  if (!post) {
    return (
      <div style={{ padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' }}>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32 }}>
          <h1 style={{ marginTop: 0, color: '#fff' }}>Post not found</h1>
          <p style={{ color: '#cbd5e1' }}>The requested post could not be loaded. It may have been deleted or the data source is unavailable.</p>
          <Link href="/admin/posts" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Return to posts</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 32, color: '#e2e8f0', fontFamily: 'var(--arimo), var(--noto-bengali), sans-serif' }}>
      <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          <h1 style={{ margin: 0, color: '#fff' }}>Edit Post</h1>
          <Link href="/admin/posts" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Back to posts</Link>
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 24 }}>
          <p style={{ margin: '0 0 12px', color: '#94a3b8' }}>Post ID</p>
          <p style={{ margin: '0 0 20px', color: '#fff', fontWeight: 600 }}>{post.id}</p>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontWeight: 600 }}>Title</label>
          <input
            value={post.title || ''}
            readOnly
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', marginBottom: 20 }}
          />

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontWeight: 600 }}>Slug</label>
          <input
            value={post.slug || ''}
            readOnly
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', marginBottom: 20 }}
          />

          <p style={{ margin: '0', color: '#cbd5e1', lineHeight: 1.7 }}>
            This admin route is active, and the selected post data is loading correctly. The full editor can be connected to the existing post creation flow as needed.
          </p>
        </div>
      </div>
    </div>
  )
}
