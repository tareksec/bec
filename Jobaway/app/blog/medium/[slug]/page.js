import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { getMediumPost } from '@/lib/medium'
import styles from './page.module.scss'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const post = await getMediumPost(resolvedParams?.slug)

  const description = post?.description?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Bangladesh Executive Chamber (BEC) publication.'

  return {
    title: post ? `${post.title} — BEC` : 'Article — BEC',
    description,
    openGraph: {
      title: post ? `${post.title} — BEC` : 'Article — BEC',
      description,
      images: [
        {
          url: post?.thumbnail || '/assets/images/og-default.jpg',
          width: 1200,
          height: 630,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post ? `${post.title} — BEC` : 'Article — BEC',
      description,
      images: [post?.thumbnail || '/assets/images/og-default.jpg'],
    },
  }
}

export default async function MediumPostPage({ params }) {
  const post = await getMediumPost((await params).slug)

  if (!post) {
    return (
      <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Blog Post">
        <main className={styles.mediumPost}>
          <h1>Post not found</h1>
          <Link href="/blog">Back to blog</Link>
        </main>
      </Layout>
    )
  }

  return (
    <Layout headerStyle={3} footerStyle={2} breadcrumbTitle={post.title}>
      <main className={styles.mediumPost}>
        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className={styles.coverImage} />}
        <header className={styles.postHeader}>
          <h1>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.pubDate ? new Date(post.pubDate).toLocaleDateString() : '—'}</span>
            <span className={styles.badge}>Medium</span>
          </div>
          {post.categories?.map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
        </header>
        <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content || post.description || '' }} />
      </main>
    </Layout>
  )
}