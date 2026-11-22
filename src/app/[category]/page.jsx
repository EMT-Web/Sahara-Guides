import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATEGORIES, getCategory } from '@/lib/taxonomy'
import { getArticlesByCategory } from '@/lib/content'
import { buildMetadata, breadcrumbSchema, collectionSchema } from '@/lib/seo'
import { images } from '@/data/images'
import { destinationsByRegion } from '@/data/destinations'
import { EXPERIENCES } from '@/data/experiences'
import PageHeader from '@/components/PageHeader'
import ArticleCard from '@/components/ArticleCard'
import MoroccoMap from '@/components/MoroccoMap'
import JsonLd from '@/components/JsonLd'
import Icon from '@/components/Icons'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export function generateMetadata({ params }) {
  const c = getCategory(params.category)
  if (!c) return {}
  return buildMetadata({ title: c.title, description: c.description, path: `/${c.slug}`, image: images[c.image] })
}

function DestinationDirectory() {
  return (
    <section className="container-site mt-20" aria-labelledby="all-destinations">
      <h2 id="all-destinations" className="h-section">All destinations by region</h2>
      <p className="mt-3 max-w-2xl text-ink-600">
        Short overviews of every place we cover. Places marked “Full guide” have an in-depth article; the others are being researched and written, and the overview gives you the essentials in the meantime.
      </p>
      <div className="mt-10 space-y-16">
        {destinationsByRegion().map((r) => (
          <div key={r.id} id={r.id} className="scroll-mt-28">
            <div className="flex items-baseline justify-between gap-4 border-b border-sand-300 pb-3">
              <h3 className="font-serif text-2xl">{r.name}</h3>
              <p className="hidden text-sm text-ink-500 sm:block">{r.blurb}</p>
            </div>
            <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {r.items.map((d) => (
                <div key={d.slug} id={d.slug} className="scroll-mt-28" data-reveal>
                  <div className="flex items-center gap-3">
                    <h4 className="font-serif text-xl text-ink-900">{d.name}</h4>
                    <span className="chip">{d.type}</span>
                    {d.guide ? <span className="chip !border-clay-600 !text-clay-700">Full guide</span> : null}
                  </div>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-700">{d.summary}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-ink-500">Time to allow</dt>
                      <dd className="text-ink-800">{d.days}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">Nearest airport</dt>
                      <dd className="text-ink-800">{d.airport}</dd>
                    </div>
                  </dl>
                  {d.guide ? (
                    <Link href={d.guide} className="link-arrow mt-3">
                      Read the full guide <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ExperienceList() {
  return (
    <section className="container-site mt-16" aria-labelledby="experiences">
      <h2 id="experiences" className="h-section">Experiences worth planning a trip around</h2>
      <ol className="mt-10 grid gap-6 md:grid-cols-2">
        {EXPERIENCES.map((e, i) => (
          <li key={e.title} className="card flex gap-5 p-6" data-reveal>
            <span className="font-serif text-4xl leading-none text-clay-600 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="font-serif text-xl text-ink-900">{e.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{e.where}</p>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-700">{e.text}</p>
              <Link href={e.href} className="link-arrow mt-3">
                {e.linkLabel} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default async function CategoryPage({ params }) {
  const c = getCategory(params.category)
  if (!c) notFound()
  const articles = await getArticlesByCategory(c.slug)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: c.name, href: `/${c.slug}` },
  ]

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), collectionSchema({ name: c.title, description: c.description, path: `/${c.slug}`, items: articles })]} />
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} image={images[c.image]} crumbs={crumbs} />

      {c.slug === 'destinations' ? (
        <section id="map" className="container-site mt-16 scroll-mt-24" aria-labelledby="map-heading">
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
            <div className="card p-3 sm:p-5">
              <MoroccoMap />
            </div>
            <div>
              <p className="eyebrow">Interactive map</p>
              <h2 id="map-heading" className="h-section mt-2">Where everything is</h2>
              <p className="mt-4 text-ink-600">
                Select a place to open its guide or overview. The distances are the thing to notice: Erg Chebbi is roughly eight hours by road from Fes, and around nine to ten from Marrakech.
              </p>
              <Link href="/itinerary-planner" className="btn-primary mt-6">
                <Icon name="route" className="h-4 w-4" /> Plan a realistic route
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {c.slug === 'things-to-do' ? <ExperienceList /> : null}

      {articles.length ? (
        <section className="container-site mt-20" aria-labelledby="guides">
          <h2 id="guides" className="h-section">{c.slug === 'things-to-do' ? 'Guides that explain how' : `${c.name} guides`}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <ArticleCard key={a.url} article={a} priority={i < 3} />
            ))}
          </div>
        </section>
      ) : null}

      {c.slug === 'destinations' ? <DestinationDirectory /> : null}

      {c.slug === 'morocco-itineraries' ? (
        <section className="container-site mt-20">
          <div className="pattern-zellige grid gap-6 rounded-3xl p-8 text-paper sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow-light">Itinerary planner</p>
              <h2 className="mt-2 font-serif text-3xl text-paper sm:text-4xl">Tell us where you start and how many days you have</h2>
              <p className="mt-3 max-w-xl text-sand-200">The planner suggests routes from our route library with honest distances and driving times, and never one that needs more days than you have.</p>
            </div>
            <Link href="/itinerary-planner" className="btn-light">Open the planner</Link>
          </div>
        </section>
      ) : null}
    </>
  )
}
