import { Suspense } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import SearchClient from '@/components/SearchClient'
import { buildMetadata } from '@/lib/seo'
import { CATEGORIES } from '@/lib/taxonomy'

// Search result pages should not be indexed; the hub stays crawlable via links.
export const metadata = buildMetadata({
  title: 'Search Morocco travel guides',
  description: 'Search every Sahara Guides article, destination and travel question.',
  path: '/search',
  noindex: true,
})

export default function SearchPage() {
  return (
    <>
      <PageHeader eyebrow="Search" title="Search the guides" intro="Destinations, questions, practical topics: search every guide, its sections and its FAQs." compact>
        <div className="mt-8 max-w-3xl">
          <Suspense fallback={null}>
            <SearchClient />
          </Suspense>
        </div>
      </PageHeader>
      <section className="container-site mt-14" aria-labelledby="browse">
        <h2 id="browse" className="font-serif text-2xl">Or browse by section</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="chip !px-4 !py-2 !text-sm hover:border-ink-700">{c.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
