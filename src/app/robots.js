import { SITE_URL } from '@/lib/site'

// Allow all crawlers, including AI search crawlers, to read public pages.
// Block only technical endpoints and internal search result pages.
export default function robots() {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true
  if (!isProd) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/search?'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
