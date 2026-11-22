import { SITE, SITE_URL } from '@/lib/site'
import { getAllArticles } from '@/lib/content'
import { xmlEscape, xmlResponse } from '@/lib/xml'

export const revalidate = 3600

export async function GET() {
  const articles = (await getAllArticles()).filter((a) => !a.noindex).slice(0, 50)
  const items = articles
    .map(
      (a) => `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${SITE_URL}${a.url}</link>
      <guid isPermaLink="true">${SITE_URL}${a.url}</guid>
      <description>${xmlEscape(a.description)}</description>
      <category>${xmlEscape(a.categoryName)}</category>
      <pubDate>${new Date(a.publishedAt + 'T08:00:00Z').toUTCString()}</pubDate>${
        a.hero ? `\n      <enclosure url="${xmlEscape(a.hero.src.startsWith('http') ? a.hero.src : SITE_URL + a.hero.src)}" type="image/jpeg" length="0" />` : ''
      }
    </item>`
    )
    .join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE.name)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`
  return xmlResponse(body, 'application/rss+xml')
}
