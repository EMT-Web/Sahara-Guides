'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'

// Consent-gated analytics.
// - Vercel Web Analytics (cookieless) runs for everyone; see layout.jsx.
// - Google Analytics 4 (NEXT_PUBLIC_GA_ID) and Microsoft Clarity
//   (NEXT_PUBLIC_CLARITY_ID) set cookies, so they load only after the visitor
//   accepts. If neither ID is set, no banner is shown at all.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID
const KEY = 'sg-consent'

export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

function readConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export default function Analytics() {
  const [consent, setConsent] = useState('unknown')

  useEffect(() => {
    setConsent(readConsent() || 'ask')
    const reopen = () => setConsent('ask')
    window.addEventListener('sg-open-consent', reopen)
    return () => window.removeEventListener('sg-open-consent', reopen)
  }, [])

  if (!GA_ID && !CLARITY_ID) return null

  const save = (v) => {
    try {
      localStorage.setItem(KEY, v)
    } catch {}
    setConsent(v)
  }

  return (
    <>
      {consent === 'granted' && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {consent === 'granted' && CLARITY_ID ? (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      ) : null}
      {consent === 'ask' ? (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 z-50 max-w-sm rounded-2xl bg-white p-5 text-sm shadow-[0_20px_50px_-15px_rgba(28,25,21,0.4)] ring-1 ring-sand-200 sm:right-auto"
        >
          <p className="text-ink-700">
            We would like to use analytics cookies to understand which guides are useful. They are off unless you accept.{' '}
            <Link href="/cookie-policy" className="font-medium text-clay-700 underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => save('granted')} className="btn-dark !px-4 !py-2">
              Accept
            </button>
            <button type="button" onClick={() => save('denied')} className="btn-outline !px-4 !py-2">
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
