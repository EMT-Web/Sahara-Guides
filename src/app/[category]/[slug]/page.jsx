import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticle, getRelated } from '@/lib/content'
import { getCategory } from '@/lib/taxonomy'
import { renderMarkdown } from '@/lib/markdown'
import { buildMetadata, articleSchema, breadcrumbSchema, faqSchema, absoluteUrl } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import ShareButtons from '@/components/ShareButtons'
import ArticleCard from '@/components/ArticleCard'
import NewsletterForm from '@/components/NewsletterForm'
import { TableOfContents, KeyTakeaways, QuickFacts, FAQ, Sources, AuthorBox, ArticleMeta } from '@/components/ArticleParts'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const all = await getAllArticles()
  return all.map((a) => ({ category: a.category, slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.category, params.slug)
  if (!article) return {}
  return buildMetadata({
    title: article.seoTitle,
    description: article.description,
    path: article.url,
    image: article.hero,
    type: 'article',
    noindex: article.noindex,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  })
}

export default async function ArticlePage({ params }) {
  const category = getCategory(params.category)
  if (!category) notFound()
  const article = await getArticle(params.category, params.slug)
  if (!article) notFound()

  const { html, headings } = renderMarkdown(article.body)
  const related = await getRelated(article, 3)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category.name, href: `/${category.slug}` },
    { name: article.title, href: article.url },
  ]

  return (
    <article>
      <JsonLd data={[articleSchema(article), breadcrumbSchema(crumbs), faqSchema(article.faqs)]} />

      <header className="container-site pt-8 sm:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-5xl">
          <Link href={`/${category.slug}`} className="eyebrow hover:underline">
            {category.name}
          </Link>
          <h1 className="display mt-3">{article.title}</h1>
          {article.standfirst ? <p className="lede mt-6 max-w-3xl">{article.standfirst}</p> : null}
          <div className="mt-8 flex flex-col gap-5 border-t border-sand-200 pt-5 lg:flex-row lg:items-center lg:justify-between">
            <ArticleMeta article={article} />
            <ShareButtons url={absoluteUrl(article.url)} title={article.title} />
          </div>
        </div>
      </header>

      {article.hero ? (
        <figure className="container-site mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-sand-200" style={{ aspectRatio: article.hero.width > article.hero.height ? '16 / 8' : '16 / 9' }}>
            <Image src={article.hero.src} alt={article.hero.alt} fill priority sizes="(min-width: 1312px) 1248px, 100vw" className="object-cover" />
          </div>
          {article.hero.caption ? <figcaption className="mt-3 text-sm text-ink-500">{article.hero.caption}{article.hero.credit ? ` Photo: ${article.hero.credit}` : ''}</figcaption> : null}
        </figure>
      ) : (
        <div className="container-site mt-10">
          <div className="pattern-zellige h-40 rounded-3xl sm:h-56" aria-hidden="true" />
        </div>
      )}

      <div className="container-site mt-12 grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_14rem]">
        <aside className="lg:order-none">
          <TableOfContents headings={headings} />
        </aside>

        <div className="min-w-0 max-w-prose">
          <KeyTakeaways items={article.keyTakeaways} />
          <QuickFacts facts={article.quickFacts} />
          <div className="article-body prose prose-lg" dangerouslySetInnerHTML={{ __html: html }} />
          <FAQ faqs={article.faqs} />
          <Sources sources={article.sources} verifiedAt={article.verifiedAt} />
          <AuthorBox author={article.author} />
          <p className="mt-8 text-sm text-ink-500">
            Spotted something out of date? <Link href={`/contact?topic=Correction&page=${encodeURIComponent(article.url)}`} className="font-medium text-clay-700 underline underline-offset-2">Tell us</Link> and we will check it. See our{' '}
            <Link href="/corrections-policy" className="underline underline-offset-2">corrections policy</Link>.
          </p>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-28 rounded-2xl bg-sand-100 p-5">
            <p className="font-serif text-lg leading-snug text-ink-900">Get new Morocco guides by email</p>
            <p className="mt-2 text-sm text-ink-600">One useful email a month.</p>
            <div className="mt-4 [&_form>div]:flex-col">
              <NewsletterForm source="article-sidebar" />
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="related" className="container-site mt-24">
          <h2 id="related" className="h-section">Related reading</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.url} article={r} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
