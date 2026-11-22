import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { cache } from 'react'
import { client, ARTICLES_QUERY, sanityImageUrl } from '@/lib/sanity'
import { getCategory } from '@/lib/taxonomy'
import { EDITORIAL_TEAM } from '@/lib/site'
import { images } from '@/data/images'
import { readingTime, countWords } from '@/lib/markdown'

// Articles come from two sources:
//  1. Markdown files in /content/articles (the launch library, versioned in git)
//  2. Sanity `article` documents (everyday publishing through the Studio)
// A Sanity document with the same category + slug replaces the file version,
// so a guide can be "moved" into the CMS just by importing it.

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles')

const toISO = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null)

function resolveImage(hero) {
  if (!hero) return null
  if (typeof hero === 'string') return images[hero] ? { ...images[hero], key: hero } : null
  if (hero.key && images[hero.key]) return { ...images[hero.key], ...hero }
  return hero
}

function normalize(a, source) {
  const category = getCategory(a.category)
  return {
    source,
    slug: a.slug,
    category: a.category,
    categoryName: category?.name || a.category,
    url: `/${a.category}/${a.slug}`,
    title: a.title,
    seoTitle: a.seoTitle || a.title,
    description: a.description || '',
    standfirst: a.standfirst || a.description || '',
    tags: a.tags || [],
    featured: Boolean(a.featured),
    editorsPick: Boolean(a.editorsPick),
    noindex: Boolean(a.noindex),
    publishedAt: toISO(a.publishedAt),
    updatedAt: toISO(a.updatedAt || a.publishedAt),
    verifiedAt: toISO(a.verifiedAt),
    author: a.author?.name ? a.author : EDITORIAL_TEAM,
    hero: resolveImage(a.heroImage),
    keyTakeaways: a.keyTakeaways || [],
    quickFacts: a.quickFacts || [],
    faqs: (a.faqs || []).map((f) => ({ question: f.question || f.q, answer: f.answer || f.a })),
    sources: a.sources || [],
    related: a.related || [],
    body: a.body || '',
    readingTime: readingTime(a.body),
    wordCount: countWords(a.body),
  }
}

function loadLocal() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
      const { data, content } = matter(raw)
      return normalize({ ...data, slug: data.slug || file.replace(/\.md$/, ''), body: content }, 'file')
    })
    .filter((a) => a.publishedAt && a.publishedAt <= new Date().toISOString().slice(0, 10) && !a.draft)
}

async function loadSanity() {
  if (!client) return []
  try {
    const docs = await client.fetch(ARTICLES_QUERY, {}, { next: { revalidate: 3600 } })
    return (docs || []).map((d) => {
      const dims = d.heroImage?.asset?.metadata?.dimensions
      const heroImage = d.heroImage?.asset
        ? {
            src: sanityImageUrl(d.heroImage, 2000),
            width: dims?.width || 2000,
            height: dims?.height || 1333,
            alt: d.heroImage.alt || '',
            caption: d.heroImage.caption,
            credit: d.heroImage.credit,
          }
        : null
      return normalize({ ...d, heroImage }, 'sanity')
    })
  } catch (err) {
    console.warn('[content] Sanity fetch failed, using local content only:', err.message)
    return []
  }
}

export const getAllArticles = cache(async () => {
  const [local, remote] = await Promise.all([Promise.resolve(loadLocal()), loadSanity()])
  const byKey = new Map()
  for (const a of [...local, ...remote]) byKey.set(`${a.category}/${a.slug}`, a)
  return [...byKey.values()].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
})

export async function getArticle(category, slug) {
  const all = await getAllArticles()
  return all.find((a) => a.category === category && a.slug === slug) || null
}

export async function getArticlesByCategory(category) {
  const all = await getAllArticles()
  return all.filter((a) => a.category === category)
}

export async function getRecentlyUpdated(limit = 6) {
  const all = await getAllArticles()
  return [...all].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '')).slice(0, limit)
}

export async function getRelated(article, limit = 3) {
  const all = await getAllArticles()
  const picked = []
  for (const ref of article.related) {
    const hit = all.find((a) => a.url === ref || a.slug === ref || `/${ref}` === a.url)
    if (hit && hit.url !== article.url && !picked.includes(hit)) picked.push(hit)
  }
  for (const a of all) {
    if (picked.length >= limit) break
    if (a.url !== article.url && !picked.includes(a) && a.category === article.category) picked.push(a)
  }
  for (const a of all) {
    if (picked.length >= limit) break
    if (a.url !== article.url && !picked.includes(a)) picked.push(a)
  }
  return picked.slice(0, limit)
}

export function toCard(a) {
  return {
    url: a.url,
    title: a.title,
    description: a.description,
    categoryName: a.categoryName,
    category: a.category,
    hero: a.hero,
    readingTime: a.readingTime,
    updatedAt: a.updatedAt,
  }
}
