'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { AnnouncementBar } from '@/components/layout/header/announcement-bar'
import { MainNav } from '@/components/layout/header/main-nav'
import { MegaContent } from '@/components/layout/header/mega-content'
import { MobileNav } from '@/components/layout/header/mobile-nav'
import { RunningText } from '@/components/layout/header/running-text'
import { SearchBar } from '@/components/layout/header/search-bar'
import { useHeaderScroll } from '@/components/layout/header/use-header-scroll'
import { useMegaState } from '@/components/layout/header/use-mega-state'
import type { HeaderContact, HeaderFaculty, HeaderStats } from '@/components/layout/header/types'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { NAV_ITEMS } from '@/lib/nav-menus'

export type SiteHeaderProps = {
  locale: Locale
  dict: Dictionary
  admissionOpen?: boolean
  admissionDeadline?: string | null
  faculties?: HeaderFaculty[]
  programsPerFaculty?: Record<string, number>
  contact?: HeaderContact
  stats?: HeaderStats
}

/**
 * Header 4 layer mengikuti struktur sibermu.ac.id:
 * top bar pengumuman → main nav (sticky) → running text → search bar.
 */
export function SiteHeader({
  locale,
  dict,
  admissionOpen = true,
  admissionDeadline = null,
  faculties = [],
  programsPerFaculty = {},
  contact = {},
  stats = {},
}: SiteHeaderProps) {
  const pathname = usePathname()
  const scrolled = useHeaderScroll(24)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const mega = useMegaState()

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setMobileOpen(false)
    mega.close()
  }

  const openItem = NAV_ITEMS.find((item) => item.id === mega.openId) ?? null

  return (
    <header className="relative z-40">
      <AnnouncementBar
        deadline={admissionDeadline}
        locale={locale}
        dict={dict}
      />

      <MainNav
        scrolled={scrolled}
        locale={locale}
        dict={dict}
        items={NAV_ITEMS}
        openId={mega.openId}
        onHoverItem={mega.scheduleOpen}
        onLeaveArea={mega.scheduleClose}
        onEnterArea={mega.cancelClose}
        onClose={mega.close}
        onOpenMobile={() => setMobileOpen(true)}
        admissionOpen={admissionOpen}
      >
        {openItem ? (
          <MegaContent
            item={openItem}
            locale={locale}
            dict={dict}
            faculties={faculties}
            programsPerFaculty={programsPerFaculty}
            stats={stats}
          />
        ) : null}
      </MainNav>

      <RunningText dict={dict} />
      <SearchBar dict={dict} />

      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        locale={locale}
        dict={dict}
        contact={contact}
        admissionOpen={admissionOpen}
      />
    </header>
  )
}
