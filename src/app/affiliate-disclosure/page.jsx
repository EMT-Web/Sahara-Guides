import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Affiliate and commercial disclosure',
  description: 'How Sahara Guides is funded and how commercial links, partnerships and sponsored content are labelled.',
  path: '/affiliate-disclosure',
})

export default function DisclosurePage() {
  return (
    <ProsePage eyebrow="Transparency" title="Affiliate and commercial disclosure" intro="How we keep editorial content separate from anything commercial." path="/affiliate-disclosure" updated="2026-11-22">
      <h2>Current position</h2>
      <p>As of the date below, Sahara Guides does not use affiliate links, and no business has paid to appear in our guides.</p>
      <h2>If that changes</h2>
      <p>We may in future earn money through affiliate links (for example to booking sites), advertising, or recommendations of tour operators and other travel businesses. If we do:</p>
      <ul>
        <li>Pages that contain affiliate links will carry a clear notice near the top.</li>
        <li>Sponsored content will be labelled “Sponsored” and kept separate from editorial guides.</li>
        <li>Any recommendation of a business connected to people involved in Sahara Guides will say so on the page.</li>
        <li>Commercial relationships will never decide what we write in editorial guides, how we rank options, or what we leave out.</li>
      </ul>
      <p>Questions? <Link href="/contact">Contact us</Link>.</p>
    </ProsePage>
  )
}
