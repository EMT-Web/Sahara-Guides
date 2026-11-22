'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const TOPICS = ['General question', 'Correction', 'Suggest a guide', 'Contributing', 'Partnership or press']

export default function ContactForm() {
  const params = useSearchParams()
  const initialTopic = TOPICS.find((t) => t.toLowerCase().startsWith((params.get('topic') || '').toLowerCase())) || TOPICS[0]
  const page = params.get('page') || ''
  const [status, setStatus] = useState('idle')
  const [msg, setMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Sending failed.')
      setStatus('done')
      setMsg('Thank you. Your message has been sent and we will reply as soon as we can.')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMsg(err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">Name</label>
          <input id="c-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="c-email" className="field-label">Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="c-topic" className="field-label">Topic</label>
        <select id="c-topic" name="topic" defaultValue={initialTopic} className="field">
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      {page ? (
        <div>
          <label htmlFor="c-page" className="field-label">Page</label>
          <input id="c-page" name="page" defaultValue={page} readOnly className="field bg-sand-50" />
        </div>
      ) : null}
      <div>
        <label htmlFor="c-message" className="field-label">Message</label>
        <textarea id="c-message" name="message" rows={6} required minLength={10} className="field" />
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" className="btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
      <p role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-clay-700' : 'text-oasis-700'}`}>{msg}</p>
    </form>
  )
}
