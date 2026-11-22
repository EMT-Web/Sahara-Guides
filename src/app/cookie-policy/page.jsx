import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'
import CookieSettingsButton from '@/components/CookieSettingsButton'

export const metadata = buildMetadata({
  title: 'Cookie policy',
  description: 'Which cookies and similar technologies Sahara Guides uses, and how to change your choice.',
  path: '/cookie-policy',
})

export default function CookiePage() {
  return (
    <ProsePage eyebrow="Legal" title="Cookie policy" intro="We do not use advertising cookies. Analytics cookies are off unless you choose to accept them." path="/cookie-policy" updated="2026-11-22">
      <h2>What we use</h2>
      <table>
        <thead><tr><th>Name / provider</th><th>Purpose</th><th>Type</th></tr></thead>
        <tbody>
          <tr><td>sg-consent (local storage)</td><td>Remembers your cookie choice</td><td>Strictly necessary</td></tr>
          <tr><td>Vercel Web Analytics</td><td>Counts page views without cookies or cross-site tracking</td><td>Cookieless, aggregated</td></tr>
          <tr><td>Google Analytics 4 (_ga, _ga_*)</td><td>Understanding how visitors use the site</td><td>Analytics, only with consent</td></tr>
          <tr><td>Microsoft Clarity (_clck, _clsk and others)</td><td>Understanding page usability through aggregated heatmaps</td><td>Analytics, only with consent</td></tr>
        </tbody>
      </table>
      <p>Google Analytics and Microsoft Clarity load only if they are enabled on this site and you have accepted analytics cookies. If they are not enabled, no cookie banner is shown because no optional cookies are used.</p>
      <h2>Changing your choice</h2>
      <p>You can change your choice at any time. You can also clear cookies and site data in your browser settings.</p>
      <CookieSettingsButton />
    </ProsePage>
  )
}
