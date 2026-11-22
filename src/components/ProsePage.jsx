import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'
import { formatDate } from '@/components/ArticleCard'

// Layout for editorial and legal pages.
export default function ProsePage({ eyebrow, title, intro, path, updated, children, image }) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: title, href: path },
  ]
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} crumbs={crumbs} image={image} compact />
      <div className="container-site mt-14">
        <div className="article-body prose prose-lg max-w-prose">
          {children}
          {updated ? <p className="text-sm text-ink-500">Last updated: {formatDate(updated, { day: 'numeric', month: 'long', year: 'numeric' })}</p> : null}
        </div>
      </div>
    </>
  )
}
