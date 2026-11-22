import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Corrections policy',
  description: 'How to report an error on Sahara Guides and how we correct and record mistakes.',
  path: '/corrections-policy',
})

export default function CorrectionsPage() {
  return (
    <ProsePage eyebrow="Our standards" title="Corrections policy" intro="We aim to be accurate, and when we are not, we fix it quickly and openly." path="/corrections-policy" updated="2026-11-22">
      <h2>How to report an error</h2>
      <p>Use our <Link href="/contact?topic=Correction">contact form</Link> and choose “Correction”, or use the “Tell us” link at the end of any guide, which tells us which page you were reading. Please include what is wrong and, if you can, a source.</p>
      <h2>What happens next</h2>
      <ol>
        <li>We acknowledge reports and aim to review them within a few working days.</li>
        <li>We check the claim against primary or official sources.</li>
        <li>If the guide is wrong or out of date, we correct it and update the “Updated” or “Facts verified” date.</li>
      </ol>
      <h2>How corrections are shown</h2>
      <ul>
        <li><strong>Minor errors</strong> (typos, small wording changes) are fixed without a note.</li>
        <li><strong>Significant errors</strong> that could affect a reader’s plans or safety are corrected with a short note at the end of the guide explaining what changed and when.</li>
        <li><strong>Routine updates</strong>, for example a new timetable, are reflected in the verification date.</li>
      </ul>
    </ProsePage>
  )
}
