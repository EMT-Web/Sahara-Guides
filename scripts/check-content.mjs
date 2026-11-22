// Content QA: run `npm run check:content` before publishing.
// Checks frontmatter, lengths, duplicate titles/descriptions, image keys,
// heading structure and that every internal link points to a real page.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const dir = path.join(root, 'content/articles')
const imagesSrc = fs.readFileSync(path.join(root, 'src/data/images.js'), 'utf8')
const imageKeys = new Set([...imagesSrc.matchAll(/^\s+'([a-z0-9-]+)': img\(/gm)].map((m) => m[1]))
const taxonomy = fs.readFileSync(path.join(root, 'src/lib/taxonomy.js'), 'utf8')
const categories = new Set([...taxonomy.matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1]))
const routesSrc = fs.readFileSync(path.join(root, 'src/lib/routes.js'), 'utf8')
const staticPaths = new Set([...routesSrc.matchAll(/path: '([^']+)'/g)].map((m) => m[1]))
categories.forEach((c) => staticPaths.add(`/${c}`))
;['/search', '/itinerary-planner', '/plan-your-trip', '/rss.xml'].forEach((p) => staticPaths.add(p))

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
const docs = files.map((f) => {
  const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  return { file: f, data, content, url: `/${data.category}/${data.slug || f.replace(/\.md$/, '')}` }
})
const articleUrls = new Set(docs.map((d) => d.url))

let errors = 0
let warnings = 0
const err = (f, m) => (errors++, console.log(`✗ ${f}: ${m}`))
const warn = (f, m) => (warnings++, console.log(`! ${f}: ${m}`))
const seen = { title: new Map(), seoTitle: new Map(), description: new Map() }

for (const d of docs) {
  const { data, content, file } = d
  for (const k of ['title', 'category', 'description', 'standfirst', 'publishedAt']) if (!data[k]) err(file, `missing ${k}`)
  if (data.category && !categories.has(data.category)) err(file, `unknown category ${data.category}`)
  const seo = data.seoTitle || data.title || ''
  if (seo.length > 65) warn(file, `SEO title ${seo.length} chars (aim ≤ 60)`)
  const desc = data.description || ''
  if (desc.length < 110 || desc.length > 200) warn(file, `meta description ${desc.length} chars (aim 140–160)`)
  if (data.heroImage && !imageKeys.has(data.heroImage)) err(file, `unknown heroImage ${data.heroImage}`)
  if (!data.verifiedAt) warn(file, 'no verifiedAt date')
  if (!(data.sources || []).length) warn(file, 'no sources listed')
  for (const [k, map] of Object.entries(seen)) {
    const v = k === 'seoTitle' ? seo : data[k]
    if (!v) continue
    if (map.has(v)) err(file, `duplicate ${k} with ${map.get(v)}`)
    map.set(v, file)
  }
  if (/^# /m.test(content)) err(file, 'body contains an H1 (#); the title is the only H1')
  const words = content.split(/\s+/).length
  if (words < 1200) warn(file, `only ${words} words`)
  for (const m of content.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
    if (!m[1].startsWith('http') && !m[1].startsWith('/') && !imageKeys.has(m[1])) err(file, `unknown image key ${m[1]}`)
  }
  const links = [...content.matchAll(/\]\((\/[^)\s#]*)(#[^)\s]*)?[^)]*\)/g)].map((m) => m[1])
  for (const r of data.related || []) links.push(r)
  for (const l of links) {
    const clean = l.replace(/\/$/, '') || '/'
    if (!articleUrls.has(clean) && !staticPaths.has(clean) && !clean.startsWith('/images/')) err(file, `broken internal link ${l}`)
  }
}

console.log(`\n${docs.length} articles checked · ${errors} errors · ${warnings} warnings`)
process.exit(errors ? 1 : 0)
