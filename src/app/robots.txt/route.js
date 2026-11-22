import { headers } from 'next/headers'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

// Only the real domain may be crawled. Vercel preview and *.vercel.app
// addresses (and any other host) get "Disallow: /" so they never compete with
// saharaguides.com in search results.
export function GET() {
  const host = (headers().get('host') || '').toLowerCase()
  const canonicalHost = new URL(SITE_URL).host
  const allowed = host === canonicalHost || host === `www.${canonicalHost}`
  const body = allowed
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /search?\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=3600' } })
}
