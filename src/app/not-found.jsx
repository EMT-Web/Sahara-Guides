import Link from 'next/link'

export const metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <section className="container-site py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-3">This path leads into the dunes</h1>
      <p className="lede mx-auto mt-5 max-w-xl">The page you were looking for does not exist or has moved. Try searching, or start from one of these.</p>
      <form action="/search" method="get" role="search" className="mx-auto mt-8 flex max-w-md gap-2">
        <label htmlFor="nf-q" className="sr-only">Search</label>
        <input id="nf-q" name="q" type="search" placeholder="Search the guides" className="field !rounded-full" />
        <button className="btn-primary" type="submit">Search</button>
      </form>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/destinations" className="btn-outline">Destinations</Link>
        <Link href="/sahara-desert" className="btn-outline">Sahara Desert</Link>
        <Link href="/plan-your-trip" className="btn-outline">Plan your trip</Link>
      </div>
    </section>
  )
}
