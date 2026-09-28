import Link from 'next/link'
import { ArrowUpRight, Users } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { GlassCard } from '@/components/shared/glass-card'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { getDictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'
import type { Homepage } from '@/server/globals-types'
import type { Faculty } from '@/server/payload-types'

type FacultiesSectionProps = {
  page: Homepage
  faculties: Faculty[]
  locale: Locale
}

export function FacultiesSection({ page, faculties, locale }: FacultiesSectionProps) {
  const dict = getDictionary(locale)

  if (faculties.length === 0) return null

  return (
    <Section id="fakultas" spacing="lg">
      <Container>
        <SectionHeading
          eyebrow={dict.search.group.fakultas}
          title={locale === 'en' ? dict.faculties.title : page.facultiesTitle ?? dict.faculties.title}
          description={
            locale === 'en' ? dict.faculties.description : page.facultiesSubtitle ?? dict.faculties.description
          }
        />

        <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {faculties.map((faculty) => (
            <Link key={faculty.slug ?? faculty.id} href={localise('/fakultas', locale)} className="group block h-full">
              <GlassCard glow className="relative flex h-full flex-col overflow-hidden p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-blue/8 blur-2xl transition-colors duration-500 group-hover:bg-blue/16"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue font-display text-lg text-white">
                      {faculty.code ?? ''}
                    </span>
                    <span className="label-caps rounded-full border border-white/10 px-3 py-1 text-[0.6rem] text-blue">
                      {faculty.accreditation ?? '-'}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl transition-colors group-hover:text-blue-hover">
                    {faculty.name}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {faculty.excerpt}
                  </p>

                  {faculty.dean ? (
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="size-3.5 text-blue" aria-hidden="true" />
                      {faculty.dean}
                    </p>
                  ) : null}

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-blue">
                    {dict.faculties.detail}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
