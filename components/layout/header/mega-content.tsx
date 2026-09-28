import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CalendarDays, School } from 'lucide-react'

import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'
import type { MegaColumn, NavLink, NavItem } from '@/lib/nav-menus'
import type { HeaderFaculty, HeaderStats } from '@/components/layout/header/types'

export type MegaContentProps = {
  item: NavItem
  locale: Locale
  dict: Dictionary
  faculties: HeaderFaculty[]
  programsPerFaculty: Record<string, number>
  stats: HeaderStats
}

function pickFor(locale: Locale) {
  return (label: string, labelEn?: string) => (locale === 'en' && labelEn ? labelEn : label)
}

function LinkList({ column, locale }: { column: MegaColumn; locale: Locale }) {
  const pick = pickFor(locale)
  return (
    <div className="min-w-0">
      {column.title ? <p className="label-caps mb-3">{pick(column.title, column.titleEn)}</p> : null}
      <ul className="space-y-0.5">
        {column.links.map((link) => (
          <MegaLink key={`${link.href}-${link.label}`} link={link} locale={locale} />
        ))}
      </ul>
    </div>
  )
}

function MegaLink({ link, locale }: { link: NavLink; locale: Locale }) {
  const pick = pickFor(locale)
  const desc = locale === 'en' ? link.descriptionEn : link.description
  return (
    <li>
      <Link
        href={localise(link.href, locale)}
        className="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-blue/8 focus-visible:bg-blue/8"
      >
        <span
          aria-hidden="true"
          className="mt-2 size-1.5 shrink-0 rounded-full bg-blue/30 transition-colors group-hover:bg-blue-bright"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-blue">
            {pick(link.label, link.labelEn)}
          </span>
          {desc ? (
            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{desc}</span>
          ) : null}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 size-3.5 shrink-0 -translate-x-1 text-blue opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Link>
    </li>
  )
}

function FeatureCard({ item, locale, dict }: { item: NavItem; locale: Locale; dict: Dictionary }) {
  if (item.mega.layout !== 'profile') return null
  const feature = item.mega.feature
  const pick = pickFor(locale)
  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-card border border-[var(--header-border)] bg-linear-to-br from-[#005bac] via-[#0a4f97] to-[#062f5f] p-6 text-white lg:w-[300px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 mix-blend-soft-light"
        style={{ backgroundImage: 'url(/textures/pattern-2.svg)', backgroundSize: 'cover' }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-12 size-44 rounded-full bg-white/12 blur-2xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold tracking-[0.18em] uppercase">
          {dict.brand.short}
        </span>
        <h3 className="mt-4 font-display text-2xl leading-snug">{pick(feature.title, feature.titleEn)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          {pick(feature.description, feature.descriptionEn)}
        </p>
      </div>
      <Link
        href={localise(feature.href, locale)}
        className="group relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#005bac] transition-transform hover:-translate-y-0.5"
      >
        {pick(feature.cta, feature.ctaEn)}
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

function QuickAccess({ item, locale }: { item: NavItem; locale: Locale }) {
  if (item.mega.layout !== 'academics') return null
  const { quick } = item.mega
  const pick = pickFor(locale)
  return (
    <div className="min-w-0 rounded-card border border-[var(--header-border)] bg-blue/6 p-4">
      <p className="label-caps mb-3">{pick(quick.title, quick.titleEn)}</p>
      <div className="grid grid-cols-2 gap-2">
        {quick.items.map((entry) => {
          const Icon = entry.icon
          return (
            <Link
              key={`${entry.href}-${entry.label}`}
              href={localise(entry.href, locale)}
              className="group flex flex-col gap-2 rounded-2xl bg-white/70 p-3 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,91,172,0.12)] dark:bg-white/6"
            >
              <span className="grid size-8 place-items-center rounded-xl bg-blue text-white transition-transform group-hover:scale-110">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-xs leading-tight font-semibold">{pick(entry.label, entry.labelEn)}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function FacultyChips({
  locale,
  dict,
  faculties,
  programsPerFaculty,
}: {
  locale: Locale
  dict: Dictionary
  faculties: HeaderFaculty[]
  programsPerFaculty: Record<string, number>
}) {
  if (!faculties.length) return null
  return (
    <div className="col-span-full border-t border-[var(--header-border)] pt-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="label-caps">{dict.search.group.fakultas}</p>
        <Link
          href={localise('/fakultas', locale)}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue transition-colors hover:text-blue-bright"
        >
          {dict.common.lihatSemua}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="flex flex-wrap gap-2">
        {faculties.map((faculty) => {
          const count = programsPerFaculty[faculty.id] ?? 0
          return (
            <li key={faculty.id}>
              <Link
                href={faculty.href}
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-[var(--header-border)] bg-white/70 px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-blue/25 hover:shadow-[0_10px_30px_rgba(0,91,172,0.12)] dark:bg-white/6"
              >
                <span className="grid size-8 place-items-center rounded-xl bg-blue/10 font-display text-xs font-bold text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                  {faculty.code ?? ''}
                </span>
                <span className="text-xs leading-tight font-semibold">
                  {faculty.name}
                  {count ? (
                    <span className="mt-0.5 block text-[0.65rem] font-medium text-muted-foreground">
                      {count} {dict.stats.programs}
                    </span>
                  ) : null}
                </span>
                {faculty.accreditation ? (
                  <span className="rounded-full bg-blue-tint px-2 py-0.5 text-[0.6rem] font-bold text-blue">
                    {faculty.accreditation}
                  </span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function AdmissionsTimeline({ item, locale, dict }: { item: NavItem; locale: Locale; dict: Dictionary }) {
  if (item.mega.layout !== 'admissions') return null
  const { steps, cta } = item.mega
  const pick = pickFor(locale)

  return (
    <>
      <ol className="relative min-w-0 space-y-1 before:absolute before:top-4 before:bottom-4 before:left-[15px] before:w-px before:bg-[var(--header-border)]">
        {steps.map((step, index) => {
          const label = pick(step.label, step.labelEn)
          const desc = locale === 'en' ? step.descriptionEn : step.description
          return (
            <li key={`${step.href}-${step.label}`} className="relative">
              <Link
                href={localise(step.href, locale)}
                className="group flex items-start gap-4 rounded-2xl px-2 py-2.5 transition-colors hover:bg-blue/8"
              >
                <span className="relative z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-[var(--header-border)] bg-background text-[0.7rem] font-bold text-blue transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold transition-colors group-hover:text-blue">
                    {label}
                  </span>
                  {desc ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">{desc}</span>
                  ) : null}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-2 size-3.5 shrink-0 text-blue opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            </li>
          )
        })}
      </ol>

      <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-card border border-[var(--header-border)] bg-linear-to-br from-[#005bac] to-[#062f5f] p-6 text-white lg:w-[300px]">
        <div
          aria-hidden="true"
          className="absolute -top-14 -right-10 size-40 rounded-full bg-white/12 blur-2xl"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold tracking-[0.18em] uppercase">
            {dict.cta.eyebrow}
          </span>
          <h3 className="mt-4 font-display text-2xl leading-snug">{dict.cta.infoPmb}</h3>
          <p className="mt-2 text-sm text-white/75">{dict.cta.checklist[0]}</p>
        </div>
        <Link
          href={localise(cta.href, locale)}
          className="group relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#005bac] transition-transform hover:-translate-y-0.5"
        >
          {pick(cta.label, cta.labelEn)}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  )
}

function CareerStats({ stats }: { stats: HeaderStats }) {
  const entries = [
    { value: stats.employmentRate, suffix: '%', label: 'Lulusan Bekerja' },
    { value: stats.partners, suffix: '+', label: 'Mitra Industri' },
    { value: stats.students, suffix: '+', label: 'Mahasiswa' },
  ].filter((entry) => typeof entry.value === 'number')

  if (!entries.length) return null

  return (
    <div className="min-w-0 rounded-card border border-[var(--header-border)] bg-blue/6 p-5 lg:w-[260px]">
      <div className="grid gap-4">
        {entries.map((entry) => (
          <div key={entry.label}>
            <p className="font-display text-3xl text-blue">
              {entry.value?.toLocaleString('id-ID')}
              {entry.suffix}
            </p>
            <p className="text-xs font-medium text-muted-foreground">{entry.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CampusPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="relative hidden min-w-0 overflow-hidden rounded-card border border-[var(--header-border)] bg-linear-to-br from-blue-tint to-white p-5 lg:block lg:w-[260px] dark:from-[rgba(0,91,172,0.2)] dark:to-[rgba(255,255,255,0.03)]">
      <span className="grid size-11 place-items-center rounded-2xl bg-blue text-white">
        <School className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-xl">{dict.campus.title}</p>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{dict.campus.description}</p>
      <Link
        href={localise('/#kampus', locale)}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue transition-colors hover:text-blue-bright"
      >
        {dict.campus.tour}
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}

/** Konten mega menu sesuai `layout` di `lib/nav-menus.ts`. */
export function MegaContent({ item, locale, dict, faculties, programsPerFaculty, stats }: MegaContentProps) {
  const mega = item.mega

  if (mega.layout === 'none') return null

  if (mega.layout === 'profile') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_auto]">
        {mega.columns.map((column, index) => (
          <LinkList key={index} column={column} locale={locale} />
        ))}
        <FeatureCard item={item} locale={locale} dict={dict} />
      </div>
    )
  }

  if (mega.layout === 'academics') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_300px]">
        {mega.columns.map((column, index) => (
          <LinkList key={index} column={column} locale={locale} />
        ))}
        <QuickAccess item={item} locale={locale} />
        <FacultyChips
          locale={locale}
          dict={dict}
          faculties={faculties}
          programsPerFaculty={programsPerFaculty}
        />
      </div>
    )
  }

  if (mega.layout === 'admissions') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        <AdmissionsTimeline item={item} locale={locale} dict={dict} />
      </div>
    )
  }

  if (mega.layout === 'campus') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_auto]">
        {mega.columns.map((column, index) => (
          <LinkList key={index} column={column} locale={locale} />
        ))}
        <CampusPreview locale={locale} dict={dict} />
      </div>
    )
  }

  if (mega.layout === 'career') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_auto]">
        {mega.columns.map((column, index) => (
          <LinkList key={index} column={column} locale={locale} />
        ))}
        <CareerStats stats={stats} />
      </div>
    )
  }

  // repository — panel sempit satu kolom
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
      {mega.columns.map((column, index) => (
        <LinkList key={index} column={column} locale={locale} />
      ))}
      <div className="hidden rounded-card border border-[var(--header-border)] bg-blue/6 p-4 lg:block">
        <span className="grid size-9 place-items-center rounded-xl bg-blue text-white">
          <CalendarDays className="size-4" aria-hidden="true" />
        </span>
        <p className="mt-3 text-sm font-semibold">{dict.quickAccess.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{dict.quickAccess.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            { label: dict.quickAccess.items.lms, href: '/akademik' },
            { label: dict.quickAccess.items.repository, href: '/repository' },
            { label: dict.quickAccess.items.perpustakaan, href: '/akademik#perpustakaan' },
          ].map((entry) => (
            <Link
              key={entry.href + entry.label}
              href={localise(entry.href, locale)}
              className="rounded-full border border-[var(--header-border)] bg-white/70 px-2.5 py-1 text-[0.7rem] font-semibold transition-colors hover:border-blue/30 hover:text-blue dark:bg-white/6"
            >
              {entry.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
