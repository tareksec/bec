import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const QUEUE_DIR = path.join(ROOT_DIR, 'articles', 'queue')
const PUBLISHED_DIR = path.join(ROOT_DIR, 'articles', 'published')
const HISTORY_FILE = path.join(ROOT_DIR, 'articles', 'publish-history.json')

// Ensure published directory exists
if (!fs.existsSync(PUBLISHED_DIR)) {
  fs.mkdirSync(PUBLISHED_DIR, { recursive: true })
}

// 1. Get list of queued articles
if (!fs.existsSync(QUEUE_DIR)) {
  console.log('No queue directory found.')
  process.exit(0)
}

const queueFiles = fs.readdirSync(QUEUE_DIR).filter(f => f.endsWith('.md'))

if (queueFiles.length === 0) {
  console.log('Queue is empty. No articles to publish today.')
  process.exit(0)
}

// 2. Select exactly 1 article (the first in the queue)
const targetFile = queueFiles[0]
const sourcePath = path.join(QUEUE_DIR, targetFile)
const destPath = path.join(PUBLISHED_DIR, targetFile)

const fileContent = fs.readFileSync(sourcePath, 'utf8')
const slug = targetFile.replace(/\.md$/, '')

// Extract title if present
const titleMatch = fileContent.match(/^#\s+(.+)$/m)
const title = titleMatch ? titleMatch[1].trim() : slug

console.log(`Publishing 1 post: ${title} (${slug})`)

// 3. Move file from queue to published
fs.renameSync(sourcePath, destPath)

// 4. Update publish history
let history = []
if (fs.existsSync(HISTORY_FILE)) {
  try {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'))
  } catch {
    history = []
  }
}

const record = {
  slug,
  title,
  publishedAt: new Date().toISOString(),
  remainingInQueue: queueFiles.length - 1
}

history.push(record)
fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8')

// 5. Optional Supabase activation if credentials provided
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftnsmipoxbvjoyvdanpf.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (supabaseKey) {
  try {
    console.log(`Syncing publication status to Supabase for slug: ${slug}...`)
    const res = await fetch(`${supabaseUrl}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        status: 'published',
        updated_at: new Date().toISOString()
      })
    })

    if (res.ok) {
      console.log(`Successfully verified live status on Supabase for: ${slug}`)
    } else {
      console.warn(`Supabase status update response: ${res.statusText}`)
    }
  } catch (err) {
    console.warn(`Supabase sync skipped or errored: ${err.message}`)
  }
}

console.log(`\n[SUCCESS] Published: ${title}`)
console.log(`Remaining in queue: ${queueFiles.length - 1}`)
