import { Suspense } from 'react'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Contact the editors',
  description: 'Contact Sahara Guides with corrections, questions about Morocco travel, guide suggestions or partnership enquiries.',
  path: '/contact',
})

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader eyebrow="Contact" title="Contact the editors" intro="Corrections, questions and ideas for new guides all help make Sahara Guides better." crumbs={crumbs} compact />
      <div className="container-site mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
        <aside className="space-y-6 text-ink-700">
          <div className="card p-6">
            <h2 className="font-serif text-xl">Email</h2>
            <p className="mt-2"><a href={`mailto:${SITE.email}`} className="font-medium text-clay-700 underline underline-offset-2">{SITE.email}</a></p>
          </div>
          <div className="card p-6">
            <h2 className="font-serif text-xl">Please note</h2>
            <p className="mt-2 text-[0.95rem]">Sahara Guides is an editorial website, not a travel agency. We cannot make bookings, but we read every message and use readers’ questions to plan new guides.</p>
          </div>
        </aside>
      </div>
    </>
  )
}
