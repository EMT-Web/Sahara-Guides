import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/Icons'

export function formatDate(iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!iso) return ''
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' })
}

export function CardImage({ hero, sizes, priority = false, className = '' }) {
  if (hero?.src) {
    return (
      <Image
        src={hero.src}
        alt={hero.alt || ''}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${className}`}
      />
    )
  }
  return <div className="pattern-zellige absolute inset-0" aria-hidden="true" />
}

export default function ArticleCard({ article, size = 'md', priority = false }) {
  const big = size === 'lg'
  return (
    <article className="group relative flex flex-col" data-reveal>
      <div className={`relative overflow-hidden rounded-2xl bg-sand-200 ${big ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <CardImage hero={article.hero} sizes={big ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'} priority={priority} />
      </div>
      <div className="pt-4">
        <p className="eyebrow">{article.categoryName}</p>
        <h3 className={`mt-2 font-serif leading-snug text-ink-900 ${big ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          <Link href={article.url} className="after:absolute after:inset-0 group-hover:text-clay-700">
            {article.title}
          </Link>
        </h3>
        {article.description ? (
          <p className={`mt-2 text-ink-600 ${big ? 'text-base sm:text-lg' : 'line-clamp-3 text-[0.95rem]'}`}>{article.description}</p>
        ) : null}
        <p className="mt-3 flex items-center gap-3 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" className="h-3.5 w-3.5" /> {article.readingTime} min read
          </span>
          {article.updatedAt ? <span>Updated {formatDate(article.updatedAt)}</span> : null}
        </p>
      </div>
    </article>
  )
}

export function ArticleListItem({ article }) {
  return (
    <article className="group relative flex gap-4">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-sand-200 sm:h-24 sm:w-32">
        <CardImage hero={article.hero} sizes="128px" />
      </div>
      <div>
        <p className="eyebrow !text-[0.65rem]">{article.categoryName}</p>
        <h3 className="mt-1 font-serif text-lg leading-snug text-ink-900">
          <Link href={article.url} className="after:absolute after:inset-0 group-hover:text-clay-700">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-ink-500">{article.readingTime} min read</p>
      </div>
    </article>
  )
}
