import { SITE_URL } from '@/lib/site'
import { getAllArticles } from '@/lib/content'
import { SITE_LAST_MODIFIED } from '@/lib/routes'
import { xmlResponse } from '@/lib/xml'

export const revalidate = 3600

// Sitemap index pointing at one sitemap per content type.
export async function GET() {
  const articles = await getAllArticles()
  const latest = articles.reduce((m, a) => (a.updatedAt > m ? a.updatedAt : m), SITE_LAST_MODIFIED)
  const maps = [
    { loc: `${SITE_URL}/sitemaps/pages.xml`, lastmod: SITE_LAST_MODIFIED },
    { loc: `${SITE_URL}/sitemaps/articles.xml`, lastmod: latest },
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${maps.map((m) => `  <sitemap><loc>${m.loc}</loc><lastmod>${m.lastmod}</lastmod></sitemap>`).join('\n')}
</sitemapindex>`
  return xmlResponse(body)
}
