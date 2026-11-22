'use client'

import { useState } from 'react'
import { trackEvent } from '@/components/Analytics'

export default function NewsletterForm({ dark = false, source = 'page' }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
      setStatus('done')
      setMessage(json.message || 'Thank you, you are subscribed.')
      trackEvent('newsletter_signup', { source })
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate={false}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`nl-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-email-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className={`field flex-1 ${dark ? 'border-white/15 bg-white/10 text-paper placeholder:text-sand-400' : ''}`}
        />
        {/* Honeypot: real people never see or fill this field */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" className={dark ? 'btn-light' : 'btn-primary'} disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 min-h-[1.25rem] text-sm ${status === 'error' ? 'text-clay-400' : dark ? 'text-sand-300' : 'text-ink-600'}`}>
        {message}
      </p>
    </form>
  )
}
