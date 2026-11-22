import Image from 'next/image'
import Link from 'next/link'
import { getAllArticles, getRecentlyUpdated } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { images } from '@/data/images'
import { DESTINATIONS } from '@/data/destinations'
import { ROUTES } from '@/data/routes'
import ArticleCard, { ArticleListItem, CardImage } from '@/components/ArticleCard'
import SectionHeading from '@/components/SectionHeading'
import MoroccoMap from '@/components/MoroccoMap'
import NewsletterForm from '@/components/NewsletterForm'
import Icon from '@/components/Icons'

export const revalidate = 3600

export const metadata = buildMetadata({
  title: `${SITE.name}: Independent Morocco Travel Guides`,
  absoluteTitle: true,
  description: SITE.description,
  path: '/',
})

const QUICK_TOPICS = [
  { label: 'Best time to visit', href: '/travel-tips/best-time-to-visit-morocco' },
  { label: 'Is Morocco safe?', href: '/travel-tips/is-morocco-safe' },
  { label: '7-day itinerary', href: '/morocco-itineraries/7-days-in-morocco' },
  { label: 'Getting to the Sahara', href: '/sahara-desert/how-to-get-to-the-sahara-desert' },
  { label: 'Trains & buses', href: '/transportation/getting-around-morocco' },
]

export default async function HomePage() {
  const all = await getAllArticles()
  const byUrl = Object.fromEntries(all.map((a) => [a.url, a]))
  const pick = (urls) => urls.map((u) => byUrl[u]).filter(Boolean)

  const lead = byUrl['/sahara-desert/how-to-get-to-the-sahara-desert'] || all[0]
  const popular = pick([
    '/travel-tips/best-time-to-visit-morocco',
    '/morocco-itineraries/7-days-in-morocco',
    '/travel-tips/is-morocco-safe',
  ])
  const destinationGuides = pick(['/destinations/marrakech', '/destinations/fes'])
  const sahara = all.filter((a) => a.category === 'sahara-desert')
  const practical = all.filter((a) => a.category === 'travel-tips' || a.category === 'transportation')
  const culture = all.filter((a) => a.category === 'culture-food')
  const editorsPicks = all.filter((a) => a.editorsPick).slice(0, 4)
  const recent = await getRecentlyUpdated(5)
  const questions = all
    .flatMap((a) => (a.faqs || []).slice(0, 1).map((f) => ({ ...f, url: a.url, title: a.title })))
    .slice(0, 6)
  const featuredRoutes = ['mkch-fes-7', 'mkch-coast-mountains-5', 'tangier-loop-10', 'erh-merzouga-3']
    .map((id) => ROUTES.find((r) => r.id === id))
    .filter(Boolean)
  const destCards = DESTINATIONS.filter((d) => ['chefchaouen', 'essaouira', 'ait-ben-haddou', 'imlil', 'rabat', 'dades-valley'].includes(d.slug))

  const hero = images['camel-caravan-erg-chebbi']

  return (
    <>
      {/* 1–3. Cinematic hero with headline and search */}
      <section className="relative isolate -mt-px overflow-hidden bg-night-900">
        <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="-z-10 object-cover object-[50%_60%]" />
        <div className="scrim-hero absolute inset-0 -z-10" />
        <div className="container-site flex min-h-[86vh] flex-col justify-end pb-14 pt-32 sm:min-h-[44rem] sm:pb-20">
          <p className="eyebrow-light">Independent · Researched · Updated</p>
          <h1 className="display mt-4 max-w-4xl text-paper">
            Your independent guide to discovering <em className="font-normal">Morocco</em>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-100 sm:text-xl">
            Honest, detailed guides to Morocco’s cities, mountains, coast and Sahara, with realistic travel times and facts checked against official sources.
          </p>
          <form action="/search" method="get" role="search" className="mt-8 flex max-w-2xl items-center gap-2 rounded-full bg-paper p-1.5 shadow-2xl">
            <label htmlFor="hero-search" className="sr-only">Search Morocco travel guides</label>
            <Icon name="search" className="ml-4 h-5 w-5 shrink-0 text-ink-500" />
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Search destinations, questions and guides"
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-ink-900 placeholder:text-ink-500 focus:outline-none"
            />
            <button type="submit" className="btn-primary !py-3">Search</button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_TOPICS.map((t) => (
              <Link key={t.href} href={t.href} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm text-paper backdrop-blur transition-colors hover:bg-white/20">
                {t.label}
              </Link>
            ))}
          </div>
          <p className="mt-10 text-xs text-sand-300">{hero.caption}</p>
        </div>
      </section>

      {/* 4–5. Lead story + popular guides */}
      <section className="container-site mt-20" aria-labelledby="start-here">
        <SectionHeading id="start-here" eyebrow="Start here" title="The guides readers use most" intro="Where to begin if you are planning your first trip to Morocco." />
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          {lead ? <ArticleCard article={lead} size="lg" priority /> : null}
          <div className="space-y-8 lg:border-l lg:border-sand-200 lg:pl-12">
            {popular.map((a) => (
              <ArticleListItem key={a.url} article={a} />
            ))}
            <Link href="/plan-your-trip" className="link-arrow">
              All trip-planning guides <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured destination guides */}
      <section className="container-site mt-28" aria-labelledby="dest-guides">
        <SectionHeading id="dest-guides" eyebrow="Destination guides" title="Morocco’s great cities, in depth" href="/destinations" linkLabel="All destinations" />
        <div className="grid gap-10 md:grid-cols-2">
          {destinationGuides.map((a) => (
            <ArticleCard key={a.url} article={a} size="lg" />
          ))}
        </div>
      </section>

      {/* 6. Explore by destination: map + cards */}
      <section className="mt-28 bg-sand-100 py-20" aria-labelledby="explore">
        <div className="container-site">
          <SectionHeading id="explore" eyebrow="Explore Morocco" title="Where do you want to go?" intro="Select a place on the map, or browse a few of the destinations travellers ask us about most." href="/destinations" linkLabel="Destinations hub" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div className="card p-3 sm:p-5" data-reveal>
              <MoroccoMap />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {destCards.map((d) => (
                <li key={d.slug} className="card group relative p-5 transition-shadow hover:shadow-lg" data-reveal>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{d.type}</p>
                  <h3 className="mt-1 font-serif text-xl text-ink-900">
                    <Link href={d.guide || `/destinations#${d.slug}`} className="after:absolute after:inset-0 group-hover:text-clay-700">
                      {d.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-600">{d.summary}</p>
                  <p className="mt-3 text-xs text-ink-500">Allow: {d.days}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Sahara section */}
      <section className="relative isolate mt-0 overflow-hidden bg-night-900 py-24 text-paper" aria-labelledby="sahara">
        <Image src={images['dunes-red-sky'].src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-900 via-night-900/80 to-night-900/20" />
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow-light">The Sahara Desert</p>
            <h2 id="sahara" className="mt-3 font-serif text-4xl leading-tight text-paper sm:text-5xl">A night in the dunes, planned properly</h2>
            <p className="mt-5 max-w-lg text-lg text-sand-200">
              Which dunes, how to get there, how long it really takes and what a desert camp is like. Our Sahara guides answer the questions that decide whether the trip is magical or exhausting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sahara-desert" className="btn-light">Sahara guides</Link>
              <Link href="/itinerary-planner" className="btn border border-white/30 text-paper hover:bg-white/10">Plan a desert route</Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {sahara.map((a) => (
              <article key={a.url} className="group relative overflow-hidden rounded-2xl bg-night-800" data-reveal>
                <div className="relative aspect-[4/5]">
                  <CardImage hero={a.hero} sizes="(min-width: 1024px) 25vw, 50vw" />
                  <div className="scrim-b absolute inset-0" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-xl leading-snug text-paper">
                    <Link href={a.url} className="after:absolute after:inset-0">{a.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-sand-300">{a.readingTime} min read</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Itinerary recommendations */}
      <section className="container-site mt-28" aria-labelledby="itineraries">
        <SectionHeading id="itineraries" eyebrow="Itineraries" title="Routes that actually work" intro="Every route shows real distances and driving times, so you can see the trade-offs before you book." href="/itinerary-planner" linkLabel="Open the planner" />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredRoutes.map((r) => (
            <li key={r.id} className="card flex flex-col p-6" data-reveal>
              <p className="font-serif text-5xl leading-none text-clay-600">{r.days}<span className="ml-1 text-base text-ink-500">days</span></p>
              <h3 className="mt-4 font-serif text-xl leading-snug text-ink-900">{r.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{r.summary}</p>
              <p className="mt-4 text-xs text-ink-500">
                {r.stops.map((s) => s.place).join(' → ')}
              </p>
              <Link href={r.guide || '/itinerary-planner'} className="link-arrow mt-auto pt-5">
                See the route <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. Practical advice */}
      <section className="container-site mt-28" aria-labelledby="practical">
        <SectionHeading id="practical" eyebrow="Practical advice" title="Know before you go" intro="Time-sensitive facts carry a verification date and a link to the official source." href="/travel-tips" linkLabel="All travel tips" />
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {practical.slice(0, 3).map((a) => (
            <ArticleCard key={a.url} article={a} />
          ))}
        </div>
      </section>

      {/* 10. Culture */}
      {culture.length ? (
        <section className="container-site mt-28" aria-labelledby="culture">
          <div className="grid gap-10 overflow-hidden rounded-3xl bg-sand-100 lg:grid-cols-2">
            <div className="relative min-h-[18rem]">
              <CardImage hero={culture[0].hero} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="p-8 sm:p-12" data-reveal>
              <p className="eyebrow">Culture & food</p>
              <h2 id="culture" className="h-section mt-2">{culture[0].title}</h2>
              <p className="mt-4 text-ink-600 sm:text-lg">{culture[0].description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={culture[0].url} className="btn-dark">Read the guide</Link>
                <Link href="/things-to-do" className="btn-outline">Things to do in Morocco</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 11–12. Recently updated + editors' picks */}
      <section className="container-site mt-28 grid gap-16 lg:grid-cols-[1fr_1.4fr]" aria-label="Recently updated and editors’ picks">
        <div>
          <h2 className="h-section">Recently updated</h2>
          <p className="mt-2 text-ink-600">Guides we have reviewed and re-verified most recently.</p>
          <div className="mt-8 space-y-7">
            {recent.map((a) => (
              <ArticleListItem key={a.url} article={a} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="h-section">Editors’ picks</h2>
          <p className="mt-2 text-ink-600">The guides we would send a friend before their first trip.</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {editorsPicks.map((a) => (
              <ArticleCard key={a.url} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* 13. Popular questions */}
      <section className="container-site mt-28" aria-labelledby="questions">
        <SectionHeading id="questions" eyebrow="Popular questions" title="Quick answers to common Morocco questions" />
        <div className="grid gap-x-12 md:grid-cols-2">
          {questions.map((q) => (
            <details key={q.question} className="group border-b border-sand-200 py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-xl text-ink-900 [&::-webkit-details-marker]:hidden">
                {q.question}
                <Icon name="chevron" className="mt-1.5 h-5 w-5 shrink-0 text-clay-600 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-ink-700">{q.answer}</p>
              <Link href={q.url} className="link-arrow mt-3">Read: {q.title}</Link>
            </details>
          ))}
        </div>
      </section>

      {/* 14. Newsletter (the footer carries the full-width version; this is a softer inline one) */}
      <section className="container-site mt-28" aria-labelledby="trust">
        <div className="grid gap-10 rounded-3xl border border-sand-200 p-8 sm:p-12 lg:grid-cols-3">
          {[
            { icon: 'shield', title: 'Checked against official sources', text: 'Entry rules, advisories and transport facts link to their source and show the date we last verified them.' },
            { icon: 'route', title: 'Realistic, not wishful', text: 'Distances and driving times are honest. If a day is long, we say so and suggest how to break it up.' },
            { icon: 'book', title: 'Independent', text: 'No paid placements in our guides. Any commercial relationship is labelled clearly.' },
          ].map((p) => (
            <div key={p.title}>
              <Icon name={p.icon} className="h-7 w-7 text-clay-600" />
              <h2 id={p.icon === 'shield' ? 'trust' : undefined} className="mt-4 font-serif text-xl">{p.title}</h2>
              <p className="mt-2 text-ink-600">{p.text}</p>
            </div>
          ))}
          <p className="text-sm text-ink-500 lg:col-span-3">
            Read our <Link href="/editorial-policy" className="underline underline-offset-2">editorial policy</Link> and{' '}
            <Link href="/fact-checking-policy" className="underline underline-offset-2">fact-checking policy</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
