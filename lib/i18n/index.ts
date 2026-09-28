import type { Locale } from './config'
import { isLocale } from './config'

/** Prefix path dengan locale: localise('/tentang','en') → '/en/tentang' */
export function localise(path: string, locale: Locale): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }
  const prefixed = path.startsWith('/') ? path : `/${path}`
  // Selalu ber-prefix locale agar tidak ada request yang kena redirect 307.
  const seg = prefixed.split('/')[1]
  if (isLocale(seg)) return prefixed
  return `/${locale}${prefixed === '/' ? '' : prefixed}`
}

/** Ambil locale dari pathname ('/en/x' → 'en', '/id' → 'id', '/x' → null). */
export function localeFromPathname(pathname: string): Locale | null {
  const seg = pathname.split('/')[1]
  return seg && isLocale(seg) ? seg : null
}

/** Hapus prefix locale dari pathname ('/en/tentang' → '/tentang'). */
export function stripLocale(pathname: string): string {
  const locale = localeFromPathname(pathname)
  if (!locale) return pathname
  const rest = pathname.slice(`/${locale}`.length)
  return rest === '' ? '/' : rest
}
