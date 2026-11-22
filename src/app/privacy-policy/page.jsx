import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Privacy policy',
  description: 'What personal data Sahara Guides collects, why, how long we keep it and your rights.',
  path: '/privacy-policy',
})

export default function PrivacyPage() {
  return (
    <ProsePage eyebrow="Legal" title="Privacy policy" intro="We collect as little personal data as possible, and we never sell it." path="/privacy-policy" updated="2026-11-22">
      <h2>Who we are</h2>
      <p>This website, {SITE.name} (saharaguides.com), is responsible for the personal data described here. Contact us about privacy at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      <h2>What we collect and why</h2>
      <table>
        <thead><tr><th>Data</th><th>Why</th><th>Legal basis</th><th>Kept for</th></tr></thead>
        <tbody>
          <tr><td>Email address (newsletter)</td><td>To send the newsletter you asked for</td><td>Consent</td><td>Until you unsubscribe</td></tr>
          <tr><td>Name, email and message (contact form)</td><td>To reply to you</td><td>Legitimate interest</td><td>Up to 24 months</td></tr>
          <tr><td>Anonymous, aggregated visit statistics (Vercel Web Analytics)</td><td>To understand which pages are useful</td><td>Legitimate interest</td><td>As set by the provider</td></tr>
          <tr><td>Analytics cookies (Google Analytics 4, Microsoft Clarity), if enabled</td><td>To understand how visitors use the site</td><td>Consent (only after you accept)</td><td>As set by the provider; see our <Link href="/cookie-policy">cookie policy</Link></td></tr>
        </tbody>
      </table>
      <h2>Who processes data for us</h2>
      <ul>
        <li><strong>Vercel</strong> hosts the website and provides cookieless analytics.</li>
        <li><strong>Resend</strong> delivers contact-form messages and stores newsletter subscriptions.</li>
        <li><strong>Sanity</strong> hosts our content management system (it holds editorial content, not reader data).</li>
        <li><strong>Google</strong> and <strong>Microsoft</strong>, only if you accept analytics cookies.</li>
      </ul>
      <p>Some of these providers are based outside Morocco and the European Economic Area. They process data under their own data protection terms and recognised transfer safeguards.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your personal data, object to its use or withdraw consent at any time. Every newsletter includes an unsubscribe link. To exercise any right, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You may also complain to your data protection authority; in Morocco this is the CNDP.</p>
      <h2>Children</h2>
      <p>This site is not aimed at children under 16 and we do not knowingly collect their data.</p>
      <h2>Changes</h2>
      <p>We will update this page if our practices change, and change the date below.</p>
    </ProsePage>
  )
}
