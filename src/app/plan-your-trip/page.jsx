import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import ArticleCard from '@/components/ArticleCard'
import JsonLd from '@/components/JsonLd'
import Icon from '@/components/Icons'
import { getAllArticles } from '@/lib/content'
import { buildMetadata, breadcrumbSchema, collectionSchema } from '@/lib/seo'
import { images } from '@/data/images'

export const revalidate = 3600

export const metadata = buildMetadata({
  title: 'Plan your trip to Morocco',
  description: 'Everything you need to plan a trip to Morocco: when to go, safety, getting around, itineraries, the Sahara and a route planner, in one place.',
  path: '/plan-your-trip',
  image: images['valley-town-mountains'],
})

const STEPS = [
  { n: 1, title: 'Choose when to go', text: 'Season decides the route: desert in the cool months, coast and mountains in summer.', href: '/travel-tips/best-time-to-visit-morocco' },
  { n: 2, title: 'Check the essentials', text: 'Current advisories, entry rules and the everyday risks worth knowing about.', href: '/travel-tips/is-morocco-safe' },
  { n: 3, title: 'Pick a route', text: 'Match a realistic itinerary to your starting city and the days you have.', href: '/itinerary-planner' },
  { n: 4, title: 'Decide how to travel', text: 'Train in the north-west, road for the south, or a private driver for the desert.', href: '/transportation/getting-around-morocco' },
  { n: 5, title: 'Plan the Sahara properly', text: 'Which dunes, how to get there and how many days it really needs.', href: '/sahara-desert/how-to-get-to-the-sahara-desert' },
]

const CHECKLIST = [
  'Passport valid for your whole stay (check your government’s rule: 3 or 6 months)',
  'Return or onward ticket',
  'Travel insurance including medical evacuation',
  'First night booked, with an airport transfer to your riad',
  'Some euros, dollars or pounds to exchange; a card for ATMs',
  'Offline maps downloaded; your riad’s location saved',
  'Conservative clothing; warm layers from November to March',
  'Ramadan and public holiday dates checked for your travel month',
  'Desert camp named and confirmed, if visiting the Sahara',
]

export default async function PlanPage() {
  const all = await getAllArticles()
  const planning = all.filter((a) => ['travel-tips', 'transportation', 'morocco-itineraries'].includes(a.category))
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Plan your trip', href: '/plan-your-trip' }]
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), collectionSchema({ name: 'Plan your trip to Morocco', description: metadata.description, path: '/plan-your-trip', items: planning })]} />
      <PageHeader eyebrow="Plan your trip" title="Plan your trip to Morocco" intro="Five steps, in the order that saves the most time and money, with the guide for each." image={images['valley-town-mountains']} crumbs={crumbs} />

      <section className="container-site mt-16" aria-labelledby="steps">
        <h2 id="steps" className="h-section">Five steps to a well-planned trip</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <li key={s.n} className="card group relative flex flex-col p-6" data-reveal>
              <span className="font-serif text-4xl text-clay-600">{s.n}</span>
              <h3 className="mt-3 font-serif text-xl">
                <Link href={s.href} className="after:absolute after:inset-0 group-hover:text-clay-700">{s.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-ink-600">{s.text}</p>
              <Icon name="arrow" className="mt-auto h-4 w-4 pt-4 text-clay-700" />
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]" aria-labelledby="checklist">
        <div>
          <h2 id="checklist" className="h-section">Pre-departure checklist</h2>
          <p className="mt-3 text-ink-600">Print it or save it. Use your browser’s print option to save as a PDF.</p>
          <ul className="mt-6 space-y-3">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex gap-3 text-ink-800">
                <span className="mt-1 h-5 w-5 shrink-0 rounded border-2 border-clay-600" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="pattern-zellige rounded-3xl p-8 text-paper sm:p-10">
          <p className="eyebrow-light">Tool</p>
          <h2 className="mt-2 font-serif text-3xl text-paper">Itinerary planner</h2>
          <p className="mt-3 text-sand-200">Choose your starting city, the number of days and your travel style. The planner suggests routes with real distances and driving times, and never one that needs more days than you have.</p>
          <Link href="/itinerary-planner" className="btn-light mt-6">Open the planner</Link>
        </div>
      </section>

      <section className="container-site mt-20" aria-labelledby="planning-guides">
        <h2 id="planning-guides" className="h-section">Planning guides</h2>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {planning.map((a) => <ArticleCard key={a.url} article={a} />)}
        </div>
      </section>
    </>
  )
}
