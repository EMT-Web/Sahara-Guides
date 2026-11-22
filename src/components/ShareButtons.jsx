'use client'

import { useState } from 'react'
import Icon from '@/components/Icons'
import { trackEvent } from '@/components/Analytics'

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: 'Pinterest', href: `https://www.pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(title)}` },
  ]

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        trackEvent('share', { method: 'native', item_id: url })
      } catch {}
      return
    }
    copy()
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackEvent('share', { method: 'copy', item_id: url })
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="flex flex-wrap items-center gap-2 no-print">
      <button type="button" onClick={nativeShare} className="chip gap-1.5 !py-1.5 hover:border-ink-700">
        <Icon name="share" className="h-3.5 w-3.5" /> Share
      </button>
      <button type="button" onClick={copy} className="chip gap-1.5 !py-1.5 hover:border-ink-700" aria-live="polite">
        <Icon name="link" className="h-3.5 w-3.5" /> {copied ? 'Link copied' : 'Copy link'}
      </button>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener" className="chip !py-1.5 hover:border-ink-700" onClick={() => trackEvent('share', { method: l.label, item_id: url })}>
          {l.label}
        </a>
      ))}
    </div>
  )
}
