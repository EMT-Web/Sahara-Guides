import Link from 'next/link'

export default function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? 'text-sand-200' : 'text-ink-500'}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="opacity-50">/</span> : null}
            {i === items.length - 1 ? (
              <span aria-current="page" className={light ? 'text-paper' : 'text-ink-800'}>
                {it.name}
              </span>
            ) : (
              <Link href={it.href} className="underline-offset-4 hover:underline">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
