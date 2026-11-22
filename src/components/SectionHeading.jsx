import Link from 'next/link'
import Icon from '@/components/Icons'

export default function SectionHeading({ eyebrow, title, intro, href, linkLabel = 'See all', id }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id} className="h-section mt-2">{title}</h2>
        {intro ? <p className="mt-3 text-ink-600 sm:text-lg">{intro}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="link-arrow shrink-0">
          {linkLabel} <Icon name="arrow" className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  )
}
