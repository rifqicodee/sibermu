import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isLocale } from '@/lib/i18n/config'

const COOKIE = 'NEXT_LOCALE'
const MAX_AGE = 60 * 60 * 24 * 365

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get(COOKIE)?.value
  if (cookie && isLocale(cookie)) return cookie

  const header = request.headers.get('accept-language')
  if (header) {
    const preferred = header
      .split(',')
      .map((part) => part.trim().split(';')[0]?.slice(0, 2).toLowerCase())
      .find((lang) => lang && isLocale(lang))
    if (preferred) return preferred
  }
  return defaultLocale
}

/**
 * Tanpa prefix locale → redirect ke /{locale}{path}.
 * Root / → locale dari cookie / Accept-Language.
 * Path yang sudah ber-prefix diteruskan (cookie diset agar preferensi awet).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]

  if (first && isLocale(first)) {
    const response = NextResponse.next()
    if (request.cookies.get(COOKIE)?.value !== first) {
      response.cookies.set(COOKIE, first, { maxAge: MAX_AGE, path: '/' })
    }
    return response
  }

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set(COOKIE, locale, { maxAge: MAX_AGE, path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
