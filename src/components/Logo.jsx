import Image from 'next/image'

// Brand assets live in public/brand/ (generated from the master logo):
//  emblem.png          – kasbah-in-arch emblem (408×548)
//  wordmark.png        – "SAHARA GUIDES" on transparent, for light backgrounds (784×64)
//  wordmark-light.png  – the same in light colours, for dark backgrounds
//  sahara-guides-logo.png – full lockup (social, schema)

export function LogoMark({ className = 'h-12 w-auto' }) {
  return <Image src="/brand/emblem.png" alt="" width={408} height={548} className={className} aria-hidden="true" />
}

export default function Logo({ light = false, priority = false }) {
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <Image
        src="/brand/emblem.png"
        alt=""
        width={408}
        height={548}
        priority={priority}
        className="h-10 w-auto sm:h-12"
        aria-hidden="true"
      />
      <Image
        src={light ? '/brand/wordmark-light.png' : '/brand/wordmark.png'}
        alt="Sahara Guides"
        width={784}
        height={64}
        priority={priority}
        className="h-[15px] w-auto sm:h-[19px]"
      />
    </span>
  )
}
