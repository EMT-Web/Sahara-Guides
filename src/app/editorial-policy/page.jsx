import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Editorial policy',
  description: 'How Sahara Guides researches, writes, reviews and updates its Morocco travel guides, and how we keep editorial content independent.',
  path: '/editorial-policy',
})

export default function EditorialPolicyPage() {
  return (
    <ProsePage eyebrow="Our standards" title="Editorial policy" intro="How we decide what to publish, how we research it and how we keep it independent and up to date." path="/editorial-policy" updated="2026-11-22">
      <h2>Our purpose</h2>
      <p>Sahara Guides publishes guides that help people plan better trips to Morocco. We write for travellers first. Every guide should answer real questions accurately and completely, and tell readers what they need to know, including when the honest answer is “it depends” or “don’t do that”.</p>
      <h2>How a guide is made</h2>
      <ol>
        <li><strong>Planning.</strong> We identify the questions travellers ask about a topic and check what existing information gets wrong or leaves out.</li>
        <li><strong>Research.</strong> We gather facts from primary and official sources (government advisories, airports, airlines, ONCF, UNESCO and official tourism bodies) and from people who work on the ground in Morocco.</li>
        <li><strong>Writing.</strong> We write clearly and specifically, use tables where they help comparison, and avoid exaggeration. Practical facts such as distances and times are stated as approximate where they vary.</li>
        <li><strong>Fact-checking.</strong> Before publication, time-sensitive facts are checked against sources, which are listed at the end of the guide. See our <Link href="/fact-checking-policy">fact-checking policy</Link>.</li>
        <li><strong>Review.</strong> Guides are reviewed regularly and whenever relevant official advice changes. The “Updated” date shows the last substantive change; “Facts verified” shows when time-sensitive facts were last checked.</li>
      </ol>
      <h2>What we will not do</h2>
      <ul>
        <li>Invent first-hand experiences, testimonials, reviews, statistics or author credentials.</li>
        <li>Present uncertain information, such as unconfirmed flight routes, as fact.</li>
        <li>Accept payment to include, rank or praise a business in an editorial guide.</li>
        <li>Publish thin pages written only to target a search term.</li>
      </ul>
      <h2>Use of AI tools</h2>
      <p>We may use software tools, including AI writing and research assistants, to help organise research, draft text or check consistency. Every guide is reviewed and edited by the editorial team, and every factual claim is checked against sources before publication. Tools never replace verification.</p>
      <h2>Independence and commercial content</h2>
      <p>Editorial decisions are made by the editorial team alone. If we publish sponsored content, affiliate links or recommendations of businesses we have a commercial relationship with, they will be labelled clearly on the page. See our <Link href="/affiliate-disclosure">affiliate and commercial disclosure</Link>.</p>
      <h2>Photography</h2>
      <p>Photographs on Sahara Guides come from our own photo library unless credited otherwise. Captions describe what is shown without overstating it, and we do not use images of one place to represent another.</p>
      <h2>Cultural respect</h2>
      <p>We write about Moroccan culture, religion and people with respect and accuracy, avoid stereotypes, and use local names and spellings where they help readers. Moroccan identity is Arab, Amazigh, African, Andalusian and Mediterranean, and we try to reflect that.</p>
      <h2>Corrections</h2>
      <p>When we get something wrong we fix it promptly and, for significant errors, say so. See our <Link href="/corrections-policy">corrections policy</Link>.</p>
    </ProsePage>
  )
}
