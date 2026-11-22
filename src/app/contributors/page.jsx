import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'
import { EDITORIAL_TEAM } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Contributors',
  description: 'Who researches, writes, fact-checks and updates the guides on Sahara Guides.',
  path: '/contributors',
})

export default function ContributorsPage() {
  return (
    <ProsePage
      eyebrow="Who writes our guides"
      title="Contributors"
      intro="Every guide on Sahara Guides is researched, written and fact-checked before it is published, and reviewed regularly afterwards."
      path="/contributors"
      updated="2026-11-22"
    >
      <h2 id="editorial-team">{EDITORIAL_TEAM.name}</h2>
      <p>{EDITORIAL_TEAM.bio}</p>
      <p>The team is responsible for:</p>
      <ul>
        <li><strong>Research</strong>: planning each guide around the questions travellers actually ask, and gathering facts from official and primary sources.</li>
        <li><strong>Writing and editing</strong>: turning that research into clear, practical guides.</li>
        <li><strong>Fact-checking</strong>: verifying time-sensitive facts against official sources before publication, and recording the verification date on the guide.</li>
        <li><strong>Updates</strong>: reviewing guides on a regular schedule and when official advice changes.</li>
      </ul>
      <h2>Local knowledge</h2>
      <p>
        Our practical advice, such as realistic driving times, what desert camps are like and how routes work in different seasons, draws on the experience of Moroccan guides, drivers and camp hosts we work with. We do not present their experience as our own personal stories, and we do not publish invented first-hand accounts.
      </p>
      <h2>Individual author profiles</h2>
      <p>
        As individual writers and reviewers contribute guides, they will be credited by name on each article and introduced on this page, with an accurate description of their background and experience. We do not publish pen names or invented credentials.
      </p>
      <p>
        Interested in contributing? <Link href="/contact?topic=Contributing">Get in touch</Link>.
      </p>
    </ProsePage>
  )
}
