import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import ItineraryPlanner from '@/components/ItineraryPlanner'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import { ROUTES } from '@/data/routes'

export const metadata = buildMetadata({
  title: 'Morocco itinerary planner',
  description: 'Find a realistic Morocco route for your starting city and number of days, with distances, driving times and overnight stops for every leg.',
  path: '/itinerary-planner',
})

export default function PlannerPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Itinerary planner', href: '/itinerary-planner' }]
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader eyebrow="Tool" title="Morocco itinerary planner" intro="Pick a starting city and the days you have. We suggest routes from our library with honest distances and driving times." crumbs={crumbs} compact />
      <div className="container-site mt-12">
        <ItineraryPlanner />
      </div>
      {/* Crawlable list of every route for readers without JavaScript and for search engines */}
      <section className="container-site mt-24" aria-labelledby="all-routes">
        <h2 id="all-routes" className="h-section">All routes in the planner</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {ROUTES.map((r) => (
            <li key={r.id} className="border-b border-sand-200 pb-5">
              <h3 className="font-serif text-xl">{r.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{r.days} days · {r.start} to {r.end} · {r.stops.map((s) => s.place).join(' → ')}</p>
              <p className="mt-2 text-[0.95rem] text-ink-700">{r.summary}</p>
              {r.guide ? <Link href={r.guide} className="link-arrow mt-2">Related guide</Link> : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
