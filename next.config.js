/** @type {import('next').NextConfig} */

// Redirects come from two places:
// 1. `src/data/redirects.json` — permanent redirects kept in the repo.
// 2. Sanity `redirect` documents — editors add them in the Studio. They are
//    read once at build time, so publish a redirect and then redeploy.
const staticRedirects = require('./src/data/redirects.json')

async function sanityRedirects() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return []
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const query = encodeURIComponent(
    '*[_type == "redirect" && !(_id in path("drafts.**"))]{source, destination, permanent}'
  )
  try {
    const res = await fetch(
      `https://${projectId}.apicdn.sanity.io/v2024-10-01/data/query/${dataset}?query=${query}`
    )
    if (!res.ok) return []
    const { result } = await res.json()
    return (result || [])
      .filter((r) => r.source && r.destination && r.source.startsWith('/'))
      .map((r) => ({ source: r.source, destination: r.destination, permanent: r.permanent !== false }))
  } catch {
    return []
  }
}

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 2000],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [...staticRedirects, ...(await sanityRedirects())]
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}
