import { getAllArticles } from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'
import { DESTINATIONS } from '@/data/destinations'
import { STATIC_PAGES } from '@/lib/routes'

export const revalidate = 3600

const plain = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export async function GET() {
  const articles = await getAllArticles()
  const docs = [
    ...articles.map((a) => {
      const { html, headings } = renderMarkdown(a.body)
      return {
        type: 'Guide',
        category: a.categoryName,
        url: a.url,
        title: a.title,
        description: a.description,
        keywords: a.tags,
        headings: [...headings.map((h) => h.text), ...a.faqs.map((f) => f.question)],
        excerpt: plain(html).slice(0, 12000),
      }
    }),
    ...DESTINATIONS.map((d) => ({
      type: 'Destination',
      category: d.type,
      url: d.guide && d.guide.startsWith('/destinations/') ? d.guide : `/destinations#${d.slug}`,
      title: d.name,
      description: d.summary,
      keywords: [d.region, d.airport],
      headings: [],
      excerpt: d.summary,
    })),
    ...STATIC_PAGES.filter((p) => p.path !== '/').map((p) => ({
      type: 'Page',
      url: p.path,
      title: p.title,
      description: p.description || '',
      keywords: [],
      headings: [],
      excerpt: p.description || '',
    })),
  ]
  return Response.json(docs, { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600' } })
}
