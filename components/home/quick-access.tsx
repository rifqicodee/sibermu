import Link from 'next/link'
import {
  ArrowUpRight,
  Award,
  Banknote,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  IdCard,
  LibraryBig,
  MapPinned,
  MonitorPlay,
  Newspaper,
  type LucideIcon,
} from 'lucide-react'

import { Container } from '@/components/shared/container'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { GlassCard } from '@/components/shared/glass-card'
import { getDictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'
import type { Homepage } from '@/server/globals-types'

const ICONS: Record<string, LucideIcon> = {
  MonitorPlay,
  LibraryBig,
  CalendarDays,
  BookOpenText,
  GraduationCap: Award,
  IdCard,
  MapPinned,
  BriefcaseBusiness,
  Banknote,
  Newspaper,
}

type QuickAccessProps = {
  page: Homepage
  locale: Locale
}

export function QuickAccess({ page, locale }: QuickAccessProps) {
  const dict = getDictionary(locale)
  const items = page.quickAccess ?? []

  if (items.length === 0) return null

  return (
    <Section id="akses-cepat" spacing="md" className="pt-0">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="label-caps">{dict.nav.quickAccess}</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">
              {locale === 'en' ? dict.quickAccess.title : page.quickAccessTitle ?? dict.quickAccess.title}
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground sm:block">
            {dict.quickAccess.description}
          </p>
        </div>

        <Reveal stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {items.map((item) => {
            const Icon = (item.icon && ICONS[item.icon]) || ArrowUpRight
            return (
              <Link key={item.href + item.label} href={localise(item.href, locale)} className="group">
                <GlassCard className="flex h-full flex-col items-center gap-3 px-3 py-5 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue/30">
                  <span className="grid size-10 place-items-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-tight font-semibold">{item.label}</span>
                </GlassCard>
              </Link>
            )
          })}
        </Reveal>
      </Container>
    </Section>
  )
}
