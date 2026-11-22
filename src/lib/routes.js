// Static (non-article) pages, used by sitemaps, the search index and IndexNow.
import { CATEGORIES } from '@/lib/taxonomy'

export const STATIC_PAGES = [
  { path: '/', title: 'Sahara Guides home', priority: 1.0, changefreq: 'daily' },
  { path: '/plan-your-trip', title: 'Plan your trip to Morocco', priority: 0.9, changefreq: 'weekly' },
  { path: '/itinerary-planner', title: 'Morocco itinerary planner', priority: 0.8, changefreq: 'monthly' },
  ...CATEGORIES.map((c) => ({ path: `/${c.slug}`, title: c.title, priority: 0.8, changefreq: 'weekly', description: c.description })),
  { path: '/about', title: 'About Sahara Guides', priority: 0.5, changefreq: 'monthly' },
  { path: '/contributors', title: 'Contributors', priority: 0.4, changefreq: 'monthly' },
  { path: '/editorial-policy', title: 'Editorial policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/fact-checking-policy', title: 'Fact-checking policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/corrections-policy', title: 'Corrections policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/contact', title: 'Contact the editors', priority: 0.4, changefreq: 'yearly' },
  { path: '/privacy-policy', title: 'Privacy policy', priority: 0.2, changefreq: 'yearly' },
  { path: '/cookie-policy', title: 'Cookie policy', priority: 0.2, changefreq: 'yearly' },
  { path: '/affiliate-disclosure', title: 'Affiliate and commercial disclosure', priority: 0.2, changefreq: 'yearly' },
]

export const SITE_LAST_MODIFIED = '2026-11-22'
