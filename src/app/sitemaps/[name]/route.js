import { SITE_URL } from '@/lib/site'
import { getAllArticles } from '@/lib/content'
import { STATIC_PAGES, SITE_LAST_MODIFIED } from '@/lib/routes'
import { xmlEscape, xmlResponse } from '@/lib/xml'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return [{ name: 'pages.xml' }, { name: 'articles.xml' }]
}

const abs = (src) => (src?.startsWith('http') ? src : `${SITE_URL}${src}`)

export async function GET(_req, { params }) {
  if (params.name === 'pages.xml') {
    const urls = STATIC_PAGES.map(
      (p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '' : p.path}</loc><lastmod>${SITE_LAST_MODIFIED}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority.toFixed(1)}</priority></url>`
    )
    return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`)
  }

  const articles = (await getAllArticles()).filter((a) => !a.noindex)
  const urls = articles.map((a) => {
    const img = a.hero
      ? `\n    <image:image><image:loc>${xmlEscape(abs(a.hero.src))}</image:loc></image:image>`
      : ''
    return `  <url><loc>${SITE_URL}${a.url}</loc><lastmod>${a.updatedAt}</lastmod>${img}\n  </url>`
  })
  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`)
}
