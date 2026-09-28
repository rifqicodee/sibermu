'use client'

import { useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, CornerDownLeft } from 'lucide-react'

import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/messages'
import type { NavItem } from '@/lib/nav-menus'
import { localise } from '@/lib/i18n'
import { cn } from 'cn'

const WIDTH: Record<string, string> = {
  profile: '1040px',
  academics: '1040px',
  admissions: '1040px',
  campus: '880px',
  career: '880px',
  repository: '640px',
}

type MegaMenuPanelProps = {
  item: NavItem
  locale: Locale
  dict: Dictionary
  onMouseEnter: () => void
  children: React.ReactNode
}

/** Panel mega menu — glass, radius 24, animasi 300ms + spotlight kursor. */
export function MegaMenuPanel({ item, locale, dict, onMouseEnter, children }: MegaMenuPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const maxWidth = WIDTH[item.mega.layout] ?? '1040px'

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    ref.current.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      className="absolute top-full left-1/2 z-40 w-[min(94vw,var(--mega-w))] -translate-x-1/2 pt-3"
      style={{ '--mega-w': maxWidth } as CSSProperties}
      onMouseEnter={onMouseEnter}
      role="region"
      aria-label={dict.nav.megaLabel.replace('{item}', item.label)}
    >
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        className={cn(
          'mega-enter mega-spotlight relative overflow-hidden rounded-card border border-[var(--header-border)] p-6 sm:p-7',
          'bg-[var(--header-glass)] shadow-[var(--header-shadow)] backdrop-blur-xl',
        )}
      >
        <div className="mega-blur relative">{children}</div>

        <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-[var(--header-border)] pt-4">
          <Link
            href={localise(item.href, locale)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue transition-colors hover:text-blue-bright"
          >
            {locale === 'en' ? 'View all' : 'Lihat semua'} {item.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <span className="hidden items-center gap-1.5 text-[0.7rem] text-muted-foreground sm:inline-flex">
            <kbd className="rounded-md border border-[var(--header-border)] px-1.5 py-0.5 font-mono">
              Esc
            </kbd>
            <CornerDownLeft className="size-3" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  )
}
