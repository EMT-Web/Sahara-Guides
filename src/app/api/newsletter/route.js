import { NextResponse } from 'next/server'

// Newsletter sign-up.
// Provider: Resend Contacts (audiences). Set RESEND_API_KEY and
// RESEND_AUDIENCE_ID in Vercel. Without them the endpoint reports that sign-up
// is unavailable instead of silently dropping addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (body.company) return NextResponse.json({ message: 'Thank you, you are subscribed.' }) // honeypot
  const email = String(body.email || '').trim().toLowerCase()
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  const audience = process.env.RESEND_AUDIENCE_ID
  if (!key || !audience) {
    return NextResponse.json(
      { error: 'Newsletter sign-up opens soon. Please try again in a few days.' },
      { status: 503 }
    )
  }

  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false }),
  })
  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ error: 'We could not subscribe you right now. Please try again later.' }, { status: 502 })
  }
  return NextResponse.json({ message: 'Thank you, you are subscribed.' })
}
