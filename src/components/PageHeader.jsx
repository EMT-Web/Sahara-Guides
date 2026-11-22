import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'

// Hero for hubs and static pages. With an image it is a full-bleed photo; without
// one it uses the zellige pattern so pages never wait on missing photography.
export default function PageHeader({ eyebrow, title, intro, image, crumbs, children, compact = false }) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden bg-night-900">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="scrim-hero absolute inset-0 -z-10" />
        <div className={`container-site flex flex-col justify-end ${compact ? 'min-h-[22rem] py-12' : 'min-h-[30rem] py-14 sm:min-h-[34rem]'}`}>
          {crumbs ? <Breadcrumbs items={crumbs} light /> : null}
          {eyebrow ? <p className="eyebrow-light mt-6">{eyebrow}</p> : null}
          <h1 className="display mt-3 max-w-4xl text-paper">{title}</h1>
          {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-100 sm:text-xl">{intro}</p> : null}
          {children}
        </div>
      </section>
    )
  }
  return (
    <section className="border-b border-sand-200 bg-sand-50">
      <div className={`container-site ${compact ? 'py-12' : 'py-16 sm:py-20'}`}>
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        {eyebrow ? <p className="eyebrow mt-6">{eyebrow}</p> : null}
        <h1 className="display mt-3 max-w-4xl">{title}</h1>
        {intro ? <p className="lede mt-5 max-w-2xl">{intro}</p> : null}
        {children}
      </div>
    </section>
  )
}
