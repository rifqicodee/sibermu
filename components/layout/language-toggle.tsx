'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import { locales, type Locale } from '@/lib/i18n/config'
import { localise, stripLocale } from '@/lib/i18n'

type LanguageToggleProps = {
  locale: Locale
  dict: Dictionary
  className?: string
}

const LABELS: Record<Locale, string> = { id: 'ID', en: 'EN' }

export function LanguageToggle({ locale, dict, className }: LanguageToggleProps) {
  const pathname = usePathname()
  const path = stripLocale(pathname)

  return (
    <div
      role="group"
      aria-label={dict.theme.lang}
      className={cn(
        'flex items-center rounded-full border border-white/15 bg-blue/6 p-0.5 dark:border-white/10',
        className,
      )}
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={localise(path, l)}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'rounded-full px-2 py-1 text-[0.68rem] font-semibold tracking-wide transition-colors',
            l === locale
              ? 'bg-blue text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {LABELS[l]}
        </Link>
      ))}
    </div>
  )
}
