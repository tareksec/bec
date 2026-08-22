import { Suspense } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import BlogDetailsClient from '@/app/blog-details/BlogDetailsClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).trim() : null

  if (!slug) {
    return {
      title: 'Article — BEC',
    }
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { data: post } = await supabase
      .from('posts')
      .select('title, excerpt, cover_image, slug, created_at')
      .eq('slug', slug)
      .maybeSingle()

    if (!post) {
      return {
        title: 'Article — BEC',
      }
    }

    const postTitle = post.title || 'Article'
    const postDesc = post.excerpt || post.title || 'Bangladesh Executive Chamber Article'
    const postCover = post.cover_image || '/assets/images/og-default.jpg'
    const postUrl = `https://www.thebec.site/blog/${encodeURIComponent(post.slug || '')}`

    return {
      title: `${postTitle} — BEC`,
      description: postDesc,
      openGraph: {
        title: postTitle,
        description: postDesc,
        url: postUrl,
        siteName: 'Bangladesh Executive Chamber',
        images: [
          {
            url: postCover,
            width: 1200,
            height: 630,
            alt: postTitle,
          },
        ],
        type: 'article',
        publishedTime: post.created_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: postTitle,
        description: postDesc,
        images: [postCover],
      },
    }
  } catch {
    return {
      title: 'Article — BEC',
    }
  }
}

export default async function DynamicBlogPage({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).trim() : ''

  return (
    <div className="boxed_wrapper">
      <Suspense fallback={<div style={{ padding: '80px 20px', textAlign: 'center' }}>Loading BEC Article...</div>}>
        <BlogDetailsClient initialSlug={slug} />
      </Suspense>
    </div>
  )
}
