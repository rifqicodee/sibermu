'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, Search } from 'lucide-react'

import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { LanguageToggle } from '@/components/layout/language-toggle'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LogoMark } from '@/components/shared/logo'
import { Magnetic } from '@/components/shared/magnetic'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise, stripLocale } from '@/lib/i18n'

export type MenuItem = {
  label: string
  labelEn?: string | null
  href: string
  children?: { label: string; labelEn?: string | null; href: string; description?: string | null; descriptionEn?: string | null }[] | null
}

type NavbarProps = {
  menu: MenuItem[]
  admissionOpen?: boolean
  admissionDeadline?: string | null
  locale: Locale
  dict: Dictionary
}

export function Navbar({ menu, admissionOpen = true, admissionDeadline, locale, dict }: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setMobileOpen(false)
    setOpenMenu(null)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current = stripLocale(pathname)
  const isActive = (href: string) => (href === '/' ? current === '/' : current === href || current.startsWith(`${href}/`))
  const pick = (label: string, labelEn?: string | null) => (locale === 'en' && labelEn ? labelEn : label)
  const childDesc = (description?: string | null, descriptionEn?: string | null) =>
    locale === 'en' && descriptionEn ? descriptionEn : description
  const openSearch = () => window.dispatchEvent(new CustomEvent('sibermu:search:open'))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-strong border-b border-white/6 shadow-lg shadow-black/10'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <AnnouncementBar deadline={admissionDeadline} locale={locale} dict={dict} />

      <div className="section flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6">
        <Link href={localise('/', locale)} className="shrink-0">
          <LogoMark withWordmark />
        </Link>

        <nav aria-label={dict.nav.menu} className="hidden items-center gap-0.5 xl:flex">
          {menu
            .filter((item) => item.href !== '/')
            .map((item, i) => {
              const hasChildren = Boolean(item.children?.length)
              return (
                <div
                  key={`${item.label}-${i}`}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenMenu(i)}
                  onMouseLeave={() => hasChildren && setOpenMenu(null)}
                >
                  <Link
                    href={localise(item.href, locale)}
                    aria-expanded={hasChildren ? openMenu === i : undefined}
                    aria-haspopup={hasChildren ? 'true' : undefined}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-blue-hover'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {pick(item.label, item.labelEn)}
                    {hasChildren ? (
                      <ChevronDown
                        className={cn(
                          'size-3.5 transition-transform duration-200',
                          openMenu === i && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>

                  {hasChildren && openMenu === i ? (
                      <div className="menu-in absolute top-full left-1/2 w-[min(88vw,760px)] -translate-x-1/2 pt-3">
                        <div className="glass-strong rounded-card p-3 shadow-blue-sm">
                          <div className="grid grid-cols-2 gap-1">
                            {item.children?.map((child) => (
                              <Link
                                key={child.href + child.label}
                                href={localise(child.href, locale)}
                                className="group rounded-2xl p-4 transition-colors hover:bg-blue/6"
                              >
                                <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-blue-hover">
                                  {pick(child.label, child.labelEn)}
                                </span>
                                {childDesc(child.description, child.descriptionEn) ? (
                                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                    {childDesc(child.description, child.descriptionEn)}
                                  </span>
                                ) : null}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                </div>
              )
            })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={openSearch}
            aria-label={dict.search.openLabel}
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-blue/8 hover:text-blue-hover"
          >
            <Search className="size-4" aria-hidden="true" />
          </button>
          <ThemeToggle dict={dict} />
          <LanguageToggle locale={locale} dict={dict} className="hidden sm:flex" />

          <Link
            href={localise('/akademik', locale)}
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:block"
          >
            {dict.common.portal}
          </Link>
          <Link
            href={localise('/pmb', locale)}
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block xl:hidden"
          >
            {dict.nav.pmb}
          </Link>
          {admissionOpen ? (
            <Magnetic className="hidden sm:inline-flex">
              <Button asChild variant="blue" size="default" className="rounded-full px-5">
                <Link href={localise('/pmb', locale)}>{dict.common.daftarSekarang}</Link>
              </Button>
            </Magnetic>
          ) : null}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="glass"
                size="icon"
                className="rounded-full xl:hidden"
                aria-label={dict.nav.bukaMenu}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] border-white/10 bg-background p-0">
              <SheetHeader className="border-b border-white/8 p-5">
                <SheetTitle asChild>
                  <Link
                    href={localise('/', locale)}
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogoMark withWordmark />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label={dict.nav.menu} className="flex flex-col gap-1 overflow-y-auto p-5">
                {menu.map((item, i) => (
                  <div key={`m-${item.label}-${i}`} className="border-b border-white/6 pb-2">
                    <Link
                      href={localise(item.href, locale)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium',
                        isActive(item.href) ? 'text-blue-hover' : 'text-foreground',
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {pick(item.label, item.labelEn)}
                      {item.children?.length ? <ChevronDown className="size-4 text-muted-foreground" /> : null}
                    </Link>
                    {item.children?.length ? (
                      <div className="flex flex-col gap-0.5 pb-2 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={`m-${child.href}-${child.label}`}
                            href={localise(child.href, locale)}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-blue-hover"
                            onClick={() => setMobileOpen(false)}
                          >
                            {pick(child.label, child.labelEn)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between">
                  <LanguageToggle locale={locale} dict={dict} />
                  <Button asChild variant="blue" size="default" className="rounded-full px-5">
                    <Link href={localise('/pmb', locale)} onClick={() => setMobileOpen(false)}>
                      {dict.common.daftarSekarang}
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
