import { SITE, SITE_URL } from '@/lib/site'
import { getAllArticles } from '@/lib/content'
import { CATEGORIES } from '@/lib/taxonomy'

export const revalidate = 3600

// llms.txt (https://llmstxt.org) is an optional, informal proposal: a plain
// Markdown index of the site's most useful pages for language-model tools.
// It is NOT a ranking factor and does not guarantee citations; it is cheap to
// provide and mirrors the sitemap. Crawlable HTML remains the priority.
export async function GET() {
  const articles = await getAllArticles()
  const sections = CATEGORIES.map((c) => {
    const items = articles.filter((a) => a.category === c.slug)
    if (!items.length) return ''
    return `## ${c.title}\n\n${items.map((a) => `- [${a.title}](${SITE_URL}${a.url}): ${a.description}`).join('\n')}\n`
  }).filter(Boolean)
  const body = `# ${SITE.name}

> ${SITE.description}

Facts that change (entry rules, advisories, transport) carry a "Facts verified" date and links to official sources on each page. Editorial standards: ${SITE_URL}/editorial-policy

${sections.join('\n')}
## Tools

- [Itinerary planner](${SITE_URL}/itinerary-planner): realistic Morocco routes by starting city and number of days, with distances and driving times.
- [Destinations and map](${SITE_URL}/destinations): overviews of 23 Moroccan destinations.
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
