// Import the Markdown guides in content/articles into Sanity, so they can be
// edited in the Studio. Safe to re-run: documents use stable IDs and are
// replaced. Requires in .env.local:
//   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (optional)
//   SANITY_API_TOKEN  (Editor token from sanity.io/manage)
// Usage: npm run import:sanity [-- --dry-run]
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
const dry = process.argv.includes('--dry-run')
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN
if (!dry && (!projectId || !token)) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local')
  process.exit(1)
}
const client = dry ? null : createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2024-10-01', token, useCdn: false })

const imagesSrc = fs.readFileSync('src/data/images.js', 'utf8')
const imageMeta = Object.fromEntries(
  [...imagesSrc.matchAll(/'([a-z0-9-]+)': img\('([^']+)', \d+, \d+, '((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'\)/g)].map((m) => [m[1], { file: m[2], alt: m[3], caption: m[4] }])
)
const key = () => Math.random().toString(36).slice(2, 10)
const dir = 'content/articles'
const uploaded = {}

async function uploadHero(k) {
  const meta = imageMeta[k]
  if (!meta) return undefined
  if (!uploaded[k]) {
    const asset = dry ? { _id: `image-${k}` } : await client.assets.upload('image', fs.createReadStream(path.join('public/images', `${meta.file}.jpg`)), { filename: `${meta.file}.jpg` })
    uploaded[k] = asset._id
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: uploaded[k] }, alt: meta.alt, caption: meta.caption }
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
for (const f of files) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  const slug = data.slug || f.replace(/\.md$/, '')
  const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : undefined)
  const doc = {
    _id: `article-${data.category}-${slug}`,
    _type: 'article',
    title: data.title,
    seoTitle: data.seoTitle,
    slug: { _type: 'slug', current: slug },
    category: data.category,
    description: data.description,
    standfirst: data.standfirst,
    tags: data.tags || [],
    featured: !!data.featured,
    editorsPick: !!data.editorsPick,
    publishedAt: iso(data.publishedAt),
    updatedAt: iso(data.updatedAt),
    verifiedAt: iso(data.verifiedAt),
    keyTakeaways: data.keyTakeaways || [],
    quickFacts: (data.quickFacts || []).map((q) => ({ _key: key(), ...q })),
    faqs: (data.faqs || []).map((q) => ({ _key: key(), ...q })),
    sources: (data.sources || []).map((s) => ({ _key: key(), ...s })),
    heroImage: data.heroImage ? await uploadHero(data.heroImage) : undefined,
    body: content.trim(),
  }
  if (dry) console.log('would import', doc._id, `(${doc.body.split(/\s+/).length} words)`)
  else {
    await client.createOrReplace(doc)
    console.log('imported', doc._id)
  }
}
// Second pass: related references (needs every article to exist first).
for (const f of files) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  const slug = data.slug || f.replace(/\.md$/, '')
  const refs = (data.related || []).map((u) => {
    const [, cat, s] = u.split('/')
    return { _key: key(), _type: 'reference', _ref: `article-${cat}-${s}` }
  })
  if (!dry && refs.length) await client.patch(`article-${data.category}-${slug}`).set({ related: refs }).commit()
}
console.log('Done.')
