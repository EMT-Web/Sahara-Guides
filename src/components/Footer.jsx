import Link from 'next/link'
import { FOOTER_GROUPS, SITE } from '@/lib/site'
import Logo from '@/components/Logo'
import NewsletterForm from '@/components/NewsletterForm'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 bg-night-900 text-sand-200">
      <div className="pattern-zellige">
        <div className="container-site grid gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow-light">The Sahara Guides letter</p>
            <h2 className="mt-3 font-serif text-3xl text-paper sm:text-4xl">New guides and seasonal Morocco advice, once a month.</h2>
            <p className="mt-3 max-w-lg text-sand-300">No spam and no sharing of your address. Unsubscribe with one click.</p>
          </div>
          <NewsletterForm dark source="footer" />
        </div>
      </div>

      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand-300">
            {SITE.tagline}. Independent, researched guides to Morocco’s cities, mountains, coast and desert.
          </p>
        </div>
        {FOOTER_GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-sand-400">{g.title}</p>
            <ul className="space-y-2.5 text-sm">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sand-200 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-sand-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. Text and photographs may not be reproduced without permission.</p>
          <p>
            Travel information changes. Always check official sources before you travel. See our{' '}
            <Link href="/fact-checking-policy" className="underline underline-offset-2 hover:text-white">
              fact-checking policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
