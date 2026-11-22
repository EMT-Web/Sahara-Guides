import Link from 'next/link'
import { LogoMark } from '@/components/Logo'
import Icon from '@/components/Icons'
import { formatDate } from '@/components/ArticleCard'

export function TableOfContents({ headings }) {
  const h2s = headings.filter((h) => h.depth === 2)
  if (h2s.length < 3) return null
  const list = (
    <ol className="space-y-2.5 text-[0.92rem]">
      {h2s.map((h, i) => (
        <li key={h.id} className="flex gap-3">
          <span className="w-5 shrink-0 font-serif text-clay-600 tabular-nums">{i + 1}</span>
          <a href={`#${h.id}`} className="text-ink-700 hover:text-clay-700">
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  )
  return (
    <>
      <details className="card mb-10 p-5 lg:hidden">
        <summary className="cursor-pointer list-none font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between">
            In this guide <Icon name="chevron" className="h-4 w-4" />
          </span>
        </summary>
        <nav aria-label="Table of contents" className="mt-4">{list}</nav>
      </details>
      <nav aria-label="Table of contents" className="sticky top-28 hidden lg:block">
        <p className="eyebrow mb-4">In this guide</p>
        {list}
      </nav>
    </>
  )
}

export function KeyTakeaways({ items, title = 'The short answer' }) {
  if (!items?.length) return null
  return (
    <section aria-labelledby="key-takeaways" className="mb-10 rounded-2xl bg-sand-100 p-6 sm:p-8">
      <h2 id="key-takeaways" className="font-serif text-2xl text-ink-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-[1.05rem] leading-relaxed text-ink-700">
            <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-oasis-600" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function QuickFacts({ facts, title = 'At a glance' }) {
  if (!facts?.length) return null
  return (
    <section aria-labelledby="quick-facts" className="mb-10 overflow-hidden rounded-2xl ring-1 ring-sand-200">
      <h2 id="quick-facts" className="bg-ink-900 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-sand-200">
        {title}
      </h2>
      <dl className="grid bg-white sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="border-b border-sand-200 px-6 py-4 sm:odd:border-r">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">{f.label}</dt>
            <dd className="mt-1 text-ink-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function FAQ({ faqs, title = 'Frequently asked questions' }) {
  if (!faqs?.length) return null
  return (
    <section aria-labelledby="faq" className="mt-16">
      <h2 id="faq" className="h-section">{title}</h2>
      <div className="mt-6 divide-y divide-sand-200 border-y border-sand-200">
        {faqs.map((f, i) => (
          <details key={i} className="group py-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-xl text-ink-900 [&::-webkit-details-marker]:hidden">
              <h3 className="font-serif text-xl font-normal">{f.question}</h3>
              <Icon name="chevron" className="mt-1.5 h-5 w-5 shrink-0 text-clay-600 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-700">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Sources({ sources, verifiedAt }) {
  if (!sources?.length) return null
  return (
    <section aria-labelledby="sources" className="mt-16 rounded-2xl bg-sand-50 p-6 ring-1 ring-sand-200 sm:p-8">
      <h2 id="sources" className="font-serif text-2xl">Sources and further reading</h2>
      <p className="mt-2 text-sm text-ink-600">
        Facts that change, such as entry rules, advisories and timetables, were checked against these sources
        {verifiedAt ? ` on ${formatDate(verifiedAt, { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}. Always confirm with the
        official source before you travel.
      </p>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-ink-700 marker:text-ink-400">
        {sources.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener" className="font-medium text-clay-700 underline-offset-2 hover:underline">
                {s.title}
              </a>
            ) : (
              <span className="font-medium">{s.title}</span>
            )}
            {s.publisher ? <span className="text-ink-500"> ({s.publisher})</span> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

export function AuthorBox({ author }) {
  return (
    <section aria-label="About the author" className="mt-16 flex gap-5 border-t border-sand-200 pt-8">
      <LogoMark className="h-16 w-auto shrink-0" />
      <div>
        <p className="eyebrow">Written and fact-checked by</p>
        <p className="mt-1 font-serif text-xl text-ink-900">
          <Link href={author.url || '/contributors'} className="hover:text-clay-700">
            {author.name}
          </Link>
        </p>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink-600">{author.bio}</p>
        <p className="mt-3 text-sm">
          <Link href="/editorial-policy" className="link-arrow">How we research and update our guides</Link>
        </p>
      </div>
    </section>
  )
}

export function ArticleMeta({ article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
      <span>
        By{' '}
        <Link href={article.author.url || '/contributors'} className="font-medium text-ink-900 hover:text-clay-700">
          {article.author.name}
        </Link>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Icon name="calendar" className="h-4 w-4" />
        Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, { day: 'numeric', month: 'long', year: 'numeric' })}</time>
      </span>
      {article.verifiedAt ? (
        <span className="inline-flex items-center gap-1.5 text-oasis-700">
          <Icon name="shield" className="h-4 w-4" />
          Facts verified {formatDate(article.verifiedAt, { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      ) : null}
      <span className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="h-4 w-4" /> {article.readingTime} min read
      </span>
    </div>
  )
}
