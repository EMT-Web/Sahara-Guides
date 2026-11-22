'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Reveals [data-reveal] elements as they scroll into view. The hidden state
// only applies when <html> has the `js` class (set inline in the layout), so
// without JavaScript everything is simply visible.
export default function Reveal() {
  const pathname = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
