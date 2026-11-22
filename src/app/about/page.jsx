import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'
import { images } from '@/data/images'

export const metadata = buildMetadata({
  title: 'About Sahara Guides',
  description: 'Sahara Guides is an independent Morocco travel resource. Who we are, what we publish, how we research and how we keep our guides accurate.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <ProsePage
      eyebrow="About us"
      title="About Sahara Guides"
      intro="An independent guide to discovering Morocco, written for travellers who want accurate, practical and honest information."
      path="/about"
      updated="2026-11-22"
      image={images['kasbah-palm-grove']}
    >
      <h2>Why we started Sahara Guides</h2>
      <p>
        Planning a trip to Morocco should be exciting. Too often it is confusing: itineraries that squeeze a ten-hour drive into an afternoon, “desert day trips” that never reach the Sahara, and advice that has not been checked in years. Sahara Guides exists to fix that, with detailed guides that tell you what a place is really like, how long things really take and what you need to know before you go.
      </p>
      <h2>What we publish</h2>
      <ul>
        <li><strong>Destination guides</strong> to Morocco’s cities, mountains, coast and desert.</li>
        <li><strong>Sahara Desert guides</strong> covering the dune seas, camps, routes and seasons.</li>
        <li><strong>Realistic itineraries</strong> built around honest distances and driving times, and an <Link href="/itinerary-planner">itinerary planner</Link> that never suggests an impossible route.</li>
        <li><strong>Practical advice</strong> on safety, money, transport, culture and etiquette, with sources and verification dates.</li>
      </ul>
      <h2>Who we are</h2>
      <p>
        Sahara Guides is researched and written by a small editorial team based in Morocco, working with local guides, drivers and camp hosts, particularly in the south of the country. You can read more about how we work on our <Link href="/contributors">contributors page</Link>.
      </p>
      <h2>How we keep guides accurate</h2>
      <p>
        Facts that change, such as entry requirements, travel advisories, flight routes and train times, are checked against official sources before publication and whenever we review a guide. Each guide shows the date it was last updated and, where relevant, the date its practical facts were last verified. Read our <Link href="/editorial-policy">editorial policy</Link>, <Link href="/fact-checking-policy">fact-checking policy</Link> and <Link href="/corrections-policy">corrections policy</Link>.
      </p>
      <h2>Independence</h2>
      <p>
        Our guides are editorially independent. Businesses cannot pay to be included or to influence what we write. If we ever publish commercial content or links, they are labelled clearly; see our <Link href="/affiliate-disclosure">affiliate and commercial disclosure</Link>.
      </p>
      <h2>Get in touch</h2>
      <p>
        Questions, corrections and suggestions for new guides are always welcome. <Link href="/contact">Contact the editors</Link>.
      </p>
    </ProsePage>
  )
}
