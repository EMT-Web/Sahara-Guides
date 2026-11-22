'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Icon from '@/components/Icons'
import { trackEvent } from '@/components/Analytics'

// Client-side search over /search-index.json (generated at build time from
// every guide, its headings and FAQs, the destination index and key pages).
const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')

function score(doc, terms) {
  let total = 0
  for (const t of terms) {
    let s = 0
    if (doc._title.includes(t)) s += 12
    if (doc._keywords.includes(t)) s += 6
    if (doc._headings.includes(t)) s += 4
    if (doc._description.includes(t)) s += 3
    if (doc._body.includes(t)) s += 1
    if (!s) return 0 // every term must match somewhere
    total += s
  }
  return total + (doc.type === 'Guide' ? 2 : 0)
}

function snippet(doc, terms) {
  const text = doc.excerpt || ''
  const lower = norm(text)
  const i = terms.map((t) => lower.indexOf(t)).filter((n) => n >= 0).sort((a, b) => a - b)[0]
  if (i === undefined || i < 120) return text.slice(0, 220) + (text.length > 220 ? '…' : '')
  return '…' + text.slice(i - 60, i + 160) + '…'
}

export default function SearchClient() {
  const params = useSearchParams()
  const router = useRouter()
  const initial = params.get('q') || ''
  const [q, setQ] = useState(initial)
  const [index, setIndex] = useState(null)
  const [error, setError] = useState(false)
  const inputRef = useRef(null)
  const lastTracked = useRef('')

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((docs) =>
        setIndex(
          docs.map((d) => ({
            ...d,
            _title: norm(d.title),
            _description: norm(d.description),
            _headings: norm((d.headings || []).join(' ')),
            _keywords: norm((d.keywords || []).join(' ')),
            _body: norm(d.excerpt),
          }))
        )
      )
      .catch(() => setError(true))
    inputRef.current?.focus()
  }, [])

  const terms = useMemo(() => norm(q).split(/\s+/).filter((t) => t.length > 1), [q])
  const results = useMemo(() => {
    if (!index || !terms.length) return []
    return index
      .map((d) => ({ d, s: score(d, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
  }, [index, terms])

  // Keep the URL shareable and record the search (consented GA4 only).
  useEffect(() => {
    const t = setTimeout(() => {
      const url = q ? `/search?q=${encodeURIComponent(q)}` : '/search'
      router.replace(url, { scroll: false })
      if (q && q !== lastTracked.current && q.length > 2) {
        lastTracked.current = q
        trackEvent('search', { search_term: q, results: results.length })
      }
    }, 500)
    return () => clearTimeout(t)
  }, [q, router, results.length])

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="site-search" className="sr-only">Search Sahara Guides</label>
        <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “Merzouga”, “train”, “Ramadan” or “safe”"
          className="field !rounded-full !py-4 !pl-14 text-lg"
          autoComplete="off"
        />
      </form>

      <div className="mt-8" aria-live="polite">
        {error ? <p className="text-clay-700">Search could not load. Please refresh the page.</p> : null}
        {!index && !error ? <p className="text-ink-500">Loading the search index…</p> : null}
        {index && terms.length > 0 ? (
          <p className="mb-6 text-sm text-ink-500">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{q}”
          </p>
        ) : null}
        {index && terms.length > 0 && results.length === 0 ? (
          <div className="card p-6">
            <p className="font-serif text-xl">Nothing matched “{q}”.</p>
            <p className="mt-2 text-ink-600">
              Try a shorter or different word, browse the <Link href="/destinations" className="text-clay-700 underline">destinations</Link>, or{' '}
              <Link href="/contact" className="text-clay-700 underline">ask us</Link>; questions we cannot answer become future guides.
            </p>
          </div>
        ) : null}
        <ul className="divide-y divide-sand-200">
          {results.map(({ d }) => (
            <li key={d.url} className="py-5">
              <p className="eyebrow !text-[0.65rem]">{d.type}{d.category ? ` · ${d.category}` : ''}</p>
              <h2 className="mt-1 font-serif text-xl">
                <Link href={d.url} className="text-ink-900 hover:text-clay-700">{d.title}</Link>
              </h2>
              <p className="mt-1.5 text-[0.95rem] text-ink-600">{snippet(d, terms)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
