import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Fact-checking policy',
  description: 'How Sahara Guides verifies facts such as entry requirements, travel advisories, flights, train times and distances, and what our verification dates mean.',
  path: '/fact-checking-policy',
})

export default function FactCheckingPage() {
  return (
    <ProsePage eyebrow="Our standards" title="Fact-checking policy" intro="What we check, which sources we trust, and what the dates on our guides mean." path="/fact-checking-policy" updated="2026-11-22">
      <h2>What we check</h2>
      <p>Every factual claim in a guide is checked before publication. We give particular attention to information that changes or carries risk:</p>
      <ul>
        <li>Entry requirements, visas and passport validity</li>
        <li>Government travel advisories and safety information</li>
        <li>Flight routes and airports, train and bus services</li>
        <li>Distances, driving times and road conditions</li>
        <li>Opening arrangements for major sights, festival dates and religious holidays</li>
        <li>Health information</li>
      </ul>
      <h2>Sources we rely on</h2>
      <table>
        <thead><tr><th>Topic</th><th>Preferred sources</th></tr></thead>
        <tbody>
          <tr><td>Entry and safety</td><td>US Department of State, UK FCDO, Government of Canada, Australian Smartraveller, Moroccan consulates</td></tr>
          <tr><td>Rail</td><td>ONCF</td></tr>
          <tr><td>Buses</td><td>CTM, Supratours</td></tr>
          <tr><td>Flights</td><td>Airlines’ own schedules and airport operators; aggregators only as a cross-check</td></tr>
          <tr><td>Heritage</td><td>UNESCO World Heritage Centre and Intangible Cultural Heritage lists</td></tr>
          <tr><td>Climate</td><td>National meteorological services and long-term climate normals</td></tr>
        </tbody>
      </table>
      <p>When reliable sources disagree, we say so, give the more cautious figure, and tell readers how to confirm it. We never present unconfirmed information, such as a flight route seen only on an aggregator, as fact.</p>
      <h2>What our dates mean</h2>
      <ul>
        <li><strong>Updated</strong>: the date of the last substantive change to the guide.</li>
        <li><strong>Facts verified</strong>: the date on which the guide’s time-sensitive facts were last checked against the sources listed at the end of the guide.</li>
      </ul>
      <h2>Estimates</h2>
      <p>Driving times are typical times without stops, in good conditions, and are rounded. Temperatures are long-term averages. We label estimates as estimates.</p>
      <h2>Help us</h2>
      <p>If you find something out of date, please <Link href="/contact?topic=Correction">tell us</Link>. We check every report. See our <Link href="/corrections-policy">corrections policy</Link>.</p>
    </ProsePage>
  )
}
