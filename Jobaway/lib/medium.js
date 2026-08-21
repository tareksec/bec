const MEDIUM_USERNAME = 'mdtareksec'
const RSS2JSON_URL = 'https://api.rss2json.com/v1/api.json'

export const getMediumSlug = (title = '') => title
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '')

export async function getMediumPosts() {
  const params = new URLSearchParams({
    rss_url: `https://medium.com/feed/@${MEDIUM_USERNAME}`,
    count: '50',
  })

  if (process.env.MEDIUM_RSS_API_KEY) {
    params.set('api_key', process.env.MEDIUM_RSS_API_KEY)
  }

  try {
    const response = await fetch(`${RSS2JSON_URL}?${params.toString()}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`RSS request failed with status ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data.items) ? data.items : []
  } catch (error) {
    console.error('Medium fetch error:', error)
    return []
  }
}

export async function getMediumPost(slug) {
  const posts = await getMediumPosts()
  return posts.find(post => getMediumSlug(post.title) === slug) || null
}