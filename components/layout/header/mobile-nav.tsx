'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, MessageCircle, Phone, Search, X } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { LanguageToggle } from '@/components/layout/language-toggle'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LogoMark } from '@/components/shared/logo'
import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'
import { NAV_ITEMS, mobileChildren } from '@/lib/nav-menus'
import type { HeaderContact } from '@/components/layout/header/types'

type MobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: Locale
  dict: Dictionary
  contact: HeaderContact
  admissionOpen: boolean
}

const openSearch = () => window.dispatchEvent(new CustomEvent('sibermu:search:open'))

/** Full-screen mobile navigation — bukan hamburger sheet biasa. */
export function MobileNav({
  open,
  onOpenChange,
  locale,
  dict,
  contact,
  admissionOpen,
}: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (id: string) => setExpanded((value) => (value === id ? null : id))

  const waHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`
    : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="fixed inset-0 top-0 left-0 z-[60] h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-background/95 p-0 ring-0 backdrop-blur-xl data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{dict.mobile.menuTitle}</DialogTitle>

        <div className="flex h-full flex-col">
          {/* Header overlay */}
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--header-border)] px-5 py-4">
            <Link href={localise('/', locale)} onClick={() => onOpenChange(false)}>
              <LogoMark withWordmark />
            </Link>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={dict.nav.closeMenu}
              className="grid size-11 place-items-center rounded-full border border-[var(--header-border)] text-foreground transition-colors hover:bg-blue/8"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Konten */}
          <nav aria-label={dict.nav.menu} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const children = mobileChildren(item)
                const isExpanded = expanded === item.id
                const label = locale === 'en' && item.labelEn ? item.labelEn : item.label
                const Icon = item.icon

                return (
                  <li key={item.id} className="border-b border-[var(--header-border)] pb-1">
                    {children.length ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          aria-expanded={isExpanded}
                          className="flex min-h-14 w-full items-center gap-3 rounded-2xl px-3 text-left font-nav text-base font-bold tracking-[0.04em] uppercase transition-colors hover:bg-blue/6"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="flex-1">{label}</span>
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              'size-4 text-muted-foreground transition-transform duration-300',
                              isExpanded && 'rotate-180 text-blue',
                            )}
                          />
                        </button>
                        {isExpanded ? (
                          <div className="menu-in space-y-0.5 pb-3 pl-3">
                            <Link
                              href={localise(item.href, locale)}
                              onClick={() => onOpenChange(false)}
                              className="mb-1 flex min-h-11 items-center justify-between rounded-xl bg-blue px-3 text-sm font-bold text-white"
                            >
                              {locale === 'en' ? 'Overview' : `Buka ${label}`}
                              <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                            {children.map((child) => (
                              <Link
                                key={`${child.href}-${child.label}`}
                                href={localise(child.href, locale)}
                                onClick={() => onOpenChange(false)}
                                className="flex min-h-11 items-center rounded-xl px-3 text-sm text-muted-foreground transition-colors hover:bg-blue/8 hover:text-blue"
                              >
                                {locale === 'en' && child.labelEn ? child.labelEn : child.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={localise(item.href, locale)}
                        onClick={() => onOpenChange(false)}
                        className="flex min-h-14 items-center gap-3 rounded-2xl px-3 font-nav text-base font-bold tracking-[0.04em] uppercase transition-colors hover:bg-blue/6"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        {label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Aksi */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  openSearch()
                }}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[var(--header-border)] px-4 text-sm font-semibold"
              >
                <Search className="size-4" aria-hidden="true" />
                {dict.search.title}
              </button>
              <LanguageToggle locale={locale} dict={dict} />
              <ThemeToggle dict={dict} />
            </div>
          </nav>

          {/* CTA bawah sticky */}
          <div className="shrink-0 border-t border-[var(--header-border)] bg-background/90 px-4 py-3 backdrop-blur">
            <div className="flex items-stretch gap-2">
              {admissionOpen ? (
                <Link
                  href={localise('/pmb', locale)}
                  onClick={() => onOpenChange(false)}
                  className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-linear-to-br from-[#005bac] to-[#2f80ed] px-4 text-sm font-bold text-white uppercase shadow-[0_10px_24px_rgba(0,91,172,0.25)]"
                >
                  {dict.nav.applyNow}
                </Link>
              ) : null}
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone}`}
                  aria-label={dict.mobile.call}
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-[var(--header-border)] text-blue transition-colors hover:bg-blue/8"
                >
                  <Phone className="size-5" aria-hidden="true" />
                </a>
              ) : null}
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={dict.mobile.whatsapp}
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
