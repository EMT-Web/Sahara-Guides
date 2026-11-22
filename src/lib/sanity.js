import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-10-01'

// Returns null when Sanity is not configured, so the site still builds and
// serves the guides stored in /content.
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null

export function sanityImageUrl(source, width = 1600) {
  if (!builder || !source) return ''
  return builder.image(source).width(width).auto('format').fit('max').url()
}

// Articles are excluded until their publish date: this is how scheduling works.
export const ARTICLES_QUERY = `*[_type == "article" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt <= now()]{
  "slug": slug.current,
  title, seoTitle, description, standfirst, category, tags, featured, editorsPick, noindex,
  publishedAt, updatedAt, verifiedAt,
  "author": author->{name, "slug": slug.current, role, bio},
  heroImage{asset->{_id, url, metadata{dimensions}}, alt, caption, credit},
  keyTakeaways, quickFacts[]{label, value}, faqs[]{question, answer},
  sources[]{title, publisher, url, accessed},
  "related": related[]->slug.current,
  body
}`
