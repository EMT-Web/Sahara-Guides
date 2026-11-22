'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV } from '@/lib/site'
import Logo from '@/components/Logo'
import Icon from '@/components/Icons'

// All navigation links are rendered in the server HTML (crawlable). Menus open
// on hover/focus with CSS; this component only closes them after a click and
// manages the mobile drawer.
export default function Header() {
  const pathname = usePathname()
  const [suppressed, setSuppressed] = useState(null)
  const mobileRef = useRef(null)

  useEffect(() => {
    if (mobileRef.current) mobileRef.current.open = false
    document.body.style.overflow = ''
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [pathname])

  const isActive = (href) => href !== '/' && (pathname === href || pathname.startsWith(href + '/'))

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="Sahara Guides home" className="shrink-0">
          <Logo priority />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li
                key={item.href}
                className={`nav-item relative ${suppressed === item.href ? '[&>.mega]:!invisible [&>.mega]:!opacity-0' : ''}`}
                onMouseLeave={() => suppressed === item.href && setSuppressed(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9rem] font-medium 2xl:px-3 transition-colors hover:text-clay-700 ${
                    isActive(item.href) ? 'text-clay-700' : 'text-ink-800'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                  {item.columns ? <Icon name="chevron" className="h-3.5 w-3.5 opacity-60" /> : null}
                </Link>
                {item.columns ? (
                  <div className="mega absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <div
                      className="flex gap-8 rounded-2xl bg-white p-6 shadow-[0_24px_60px_-20px_rgba(28,25,21,0.35)] ring-1 ring-sand-200"
                      onClick={() => setSuppressed(item.href)}
                    >
                      {item.columns.map((col) => (
                        <div key={col.title} className="w-48">
                          <p className="eyebrow mb-3">{col.title}</p>
                          <ul className="space-y-2">
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="text-[0.95rem] text-ink-800 hover:text-clay-700">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex h-10 items-center gap-2 rounded-full border border-sand-300 bg-white px-3.5 text-sm text-ink-600 transition-colors hover:border-ink-700 hover:text-ink-900"
            aria-label="Search the guides"
          >
            <Icon name="search" className="h-4 w-4" />
            <span className="hidden sm:inline xl:hidden 2xl:inline">Search</span>
          </Link>

          <details ref={mobileRef} className="group xl:hidden" onToggle={(e) => (document.body.style.overflow = e.currentTarget.open ? 'hidden' : '')}>
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full bg-ink-900 text-paper [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Icon name="menu" className="h-5 w-5 group-open:hidden" />
              <Icon name="close" className="hidden h-5 w-5 group-open:block" />
            </summary>
            <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper px-5 pb-16 pt-4 sm:px-8">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-sand-200">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      {item.columns ? (
                        <details className="group/sub">
                          <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-2xl text-ink-900 [&::-webkit-details-marker]:hidden">
                            {item.label}
                            <Icon name="chevron" className="h-5 w-5 transition-transform group-open/sub:rotate-180" />
                          </summary>
                          <ul className="space-y-3 pb-5 pl-1">
                            <li>
                              <Link href={item.href} className="font-semibold text-clay-700">
                                {item.label} overview
                              </Link>
                            </li>
                            {item.columns.flatMap((c) => c.links).map((l) => (
                              <li key={l.href + l.label}>
                                <Link href={l.href} className="text-ink-700">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link href={item.href} className="block py-4 font-serif text-2xl text-ink-900">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <Link href="/itinerary-planner" className="btn-primary mt-8 w-full">
                <Icon name="route" className="h-4 w-4" /> Plan a route
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
