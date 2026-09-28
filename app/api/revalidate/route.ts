import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { CONTENT_TAG } from '@/server/constants'

/**
 * Bust cache konten setelah seed / perubahan di luar admin UI.
 * Di production wajib ?secret= sesuai REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = process.env.REVALIDATE_SECRET
  const token = searchParams.get('secret')

  if (process.env.NODE_ENV === 'production' && (!secret || token !== secret)) {
    return NextResponse.json({ revalidated: false, message: 'Invalid token' }, { status: 401 })
  }

  revalidateTag(CONTENT_TAG, 'max')
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}
