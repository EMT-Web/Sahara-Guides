import { SITE, SITE_URL, EDITORIAL_TEAM } from '@/lib/site'
import { DEFAULT_OG_IMAGE } from '@/data/images'

export const absoluteUrl = (p = '/') => (p.startsWith('http') ? p : `${SITE_URL}${p === '/' ? '' : p}`)

/**
 * Build Next.js metadata for a page. Every indexable page should call this so
 * titles, descriptions, canonicals and social tags stay consistent.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
}) {
  const img = image || DEFAULT_OG_IMAGE
  const imgUrl = absoluteUrl(img.src)
  const url = absoluteUrl(path)
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      types: { 'application/rss+xml': `${SITE_URL}/rss.xml` },
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      locale: 'en_GB',
      title,
      description,
      images: [{ url: imgUrl, width: img.width, height: img.height, alt: img.alt }],
      ...(type === 'article' ? { publishedTime, modifiedTime, authors: [absoluteUrl(EDITORIAL_TEAM.url)] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [imgUrl] },
  }
}

// ---------- JSON-LD ----------

export function organizationSchema() {
  const sameAs = Object.values(SITE.social).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/sahara-guides-logo.png`, width: 900, height: 810 },
    description: SITE.description,
    email: SITE.email,
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.tagline,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  }
}

export function articleSchema(a) {
  const author =
    a.author?.slug && a.author.slug !== EDITORIAL_TEAM.slug
      ? { '@type': 'Person', name: a.author.name, url: absoluteUrl(`/contributors#${a.author.slug}`) }
      : { '@type': 'Organization', name: EDITORIAL_TEAM.name, url: absoluteUrl(EDITORIAL_TEAM.url) }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(a.url)}#article`,
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absoluteUrl(a.url),
    url: absoluteUrl(a.url),
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    inLanguage: 'en',
    wordCount: a.wordCount,
    articleSection: a.categoryName,
    keywords: a.tags?.join(', ') || undefined,
    author,
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(a.hero
      ? {
          image: {
            '@type': 'ImageObject',
            url: absoluteUrl(a.hero.src),
            width: a.hero.width,
            height: a.hero.height,
            caption: a.hero.caption || a.hero.alt,
          },
        }
      : {}),
    ...(a.sources?.length ? { citation: a.sources.filter((s) => s.url).map((s) => s.url) } : {}),
  }
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function collectionSchema({ name, description, path, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(it.url), name: it.title })),
    },
  }
}
