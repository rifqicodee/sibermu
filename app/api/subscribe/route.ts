import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown }
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'subscribers', data: { email, source: 'footer' } })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('subscribe error:', error)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
