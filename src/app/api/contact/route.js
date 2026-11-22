import { NextResponse } from 'next/server'

// Contact form: corrections, tips and general messages to the editors.
// Sends with Resend. Needs RESEND_API_KEY; CONTACT_TO_EMAIL sets the inbox and
// CONTACT_FROM_EMAIL the verified sender (e.g. "Sahara Guides <web@saharaguides.com>").
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export async function POST(req) {
  let b
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (b.company) return NextResponse.json({ ok: true })
  const name = String(b.name || '').trim().slice(0, 120)
  const email = String(b.email || '').trim().slice(0, 254)
  const topic = String(b.topic || 'General').slice(0, 60)
  const message = String(b.message || '').trim().slice(0, 5000)
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please add your name, a valid email and a message.' }, { status: 400 })
  }
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Sahara Guides <onboarding@resend.dev>'
  if (!key || !to) {
    return NextResponse.json({ error: 'The contact form is not available yet. Please email us directly.' }, { status: 503 })
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Sahara Guides] ${topic}: ${name}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p>Topic: ${esc(topic)}</p><p>Page: ${esc(b.page || '')}</p><hr/><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  })
  if (!res.ok) return NextResponse.json({ error: 'Sending failed. Please email us directly.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
