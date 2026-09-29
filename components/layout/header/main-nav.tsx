'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu } from 'lucide-react'

import { MegaMenuPanel } from '@/components/layout/header/mega-menu'
import { LogoMark } from '@/components/shared/logo'
import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise, stripLocale } from '@/lib/i18n'
import type { NavItem } from '@/lib/nav-menus'

type MainNavProps = {
  scrolled: boolean
  locale: Locale
  dict: Dictionary
  items: NavItem[]
  openId: string | null
  onHoverItem: (id: string) => void
  onLeaveArea: () => void
  onEnterArea: () => void
  onClose: () => void
  onOpenMobile: () => void
  admissionOpen: boolean
  children: React.ReactNode
}

/** Layer 2 — main navigation: logo | nav Quicksand uppercase | CTA. Sticky, shrink saat scroll. */
export function MainNav({
  scrolled,
  locale,
  dict,
  items,
  openId,
  onHoverItem,
  onLeaveArea,
  onEnterArea,
  onClose,
  onOpenMobile,
  admissionOpen,
  children,
}: MainNavProps) {
  const pathname = usePathname()
  const current = stripLocale(pathname)
  const isActive = (href: string) => {
    // Link anchor (mis. /#kampus) tidak pernah ditandai aktif — path-nya selalu "/".
    if (href.includes('#')) return false
    return (
      current === href || (href !== '/' && current.startsWith(`${href}/`))
    )
  }

  const openItem = items.find((item) => item.id === openId) ?? null

  return (
    <div
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-[400ms] ease-out',
        scrolled
          ? 'header-glass border-transparent'
          : 'border-transparent bg-transparent',
      )}
    >
      <div
        className="section relative flex items-center justify-between gap-6 transition-all duration-[400ms] ease-out"
        style={{ height: scrolled ? 72 : 88 }}
      >
        {/* Logo */}
        <Link
          href={localise('/', locale)}
          className="group flex shrink-0 items-center transition-transform duration-[400ms] ease-out"
          style={{ transform: scrolled ? 'scale(0.88)' : 'scale(1)', transformOrigin: 'left center' }}
        >
          <span className="transition-[filter] duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,91,172,0.4)]">
            <LogoMark withWordmark />
          </span>
        </Link>

        {/* Nav + mega menu */}
        <div
          className="hidden min-w-0 lg:block"
          onMouseEnter={onEnterArea}
          onMouseLeave={onLeaveArea}
        >
          <nav
            aria-label={dict.nav.menu}
            className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-2 xl:gap-3.5"
          >
            {items.map((item) => {
              const hasMega = item.mega.layout !== 'none'
              const open = openId === item.id
              const active = isActive(item.href)
              return (
                <Link
                  key={item.id}
                  href={localise(item.href, locale)}
                  data-active={active}
                  data-open={open}
                  aria-current={active ? 'page' : undefined}
                  aria-haspopup={hasMega ? 'menu' : undefined}
                  aria-expanded={hasMega ? open : undefined}
                  onMouseEnter={() => onHoverItem(item.id)}
                  onFocus={() => onHoverItem(item.id)}
                  onClick={onClose}
                  className="nav-pill shrink-0 rounded-full px-3.5 py-2.5 font-nav text-[0.75rem] font-bold tracking-[0.05em] whitespace-nowrap uppercase transition-colors xl:px-4 xl:text-[0.82rem]"
                >
                  <span className="relative flex items-center gap-1.5">
                    {locale === 'en' && item.labelEn ? item.labelEn : item.label}
                    {hasMega ? (
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'size-3 transition-transform duration-300 xl:size-3.5',
                          open && 'rotate-180',
                        )}
                      />
                    ) : null}
                  </span>
                </Link>
              )
            })}
          </nav>

          {openItem ? (
            <MegaMenuPanel
              item={openItem}
              locale={locale}
              dict={dict}
              onMouseEnter={onEnterArea}
            >
              {children}
            </MegaMenuPanel>
          ) : null}
        </div>

        {/* Aksi */}
        <div className="flex shrink-0 items-center gap-1.5 xl:gap-2">
          <button
            type="button"
            onClick={onOpenMobile}
            aria-label={dict.nav.bukaMenu}
            className="grid size-11 place-items-center rounded-full border border-[var(--header-border)] bg-white/70 text-blue transition-colors hover:bg-white lg:hidden dark:bg-white/8"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
