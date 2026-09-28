import Link from 'next/link'
import { ArrowRight, Award, BookOpenCheck, GraduationCap, Sparkles, Wrench } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { GlassCard } from '@/components/shared/glass-card'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import type { Prodi } from '@/server/payload-types'
import type { Homepage } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'
import { localise } from '@/lib/i18n'

const degreeMeta: Record<string, { id: string; en: string; icon: typeof Sparkles }> = {
  D3: { id: 'Diploma Tiga', en: 'Associate Degree', icon: Wrench },
  S1: { id: 'Sarjana', en: "Bachelor's", icon: GraduationCap },
  S2: { id: 'Magister', en: "Master's", icon: BookOpenCheck },
  S3: { id: 'Doktor', en: 'Doctorate', icon: Award },
}

type FeaturedProgramsProps = {
  page: Homepage
  programs: Prodi[]
  locale: Locale
}

export function FeaturedPrograms({ page, programs, locale }: FeaturedProgramsProps) {
  const dict = getDictionary(locale)
  const items = programs.slice(0, 8)

  if (items.length === 0) return null

  return (
    <Section id="program" spacing="lg">
      <Container>
        <SectionHeading
          eyebrow={dict.search.group.prodi}
          title={locale === 'en' ? dict.prodi.title : page.programsTitle ?? dict.prodi.title}
          description={
            locale === 'en' ? dict.prodi.description : page.programsSubtitle ?? dict.prodi.description
          }
        />

        <Reveal className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {items.map((program) => {
              const meta = degreeMeta[program.degree ?? 'S1'] ?? { id: program.degree ?? '', en: program.degree ?? '', icon: Sparkles }
              const Icon = meta.icon
              const faculty =
                program.faculty && typeof program.faculty !== 'number' ? program.faculty : null

              return (
                <Link
                  key={program.slug ?? program.id}
                  href={localise('/program', locale)}
                  className="group block w-[290px] shrink-0 snap-start sm:w-[320px]"
                >
                  <GlassCard glow className="flex h-full flex-col p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue/30">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="label-caps rounded-full border border-white/10 px-3 py-1 text-[0.6rem] text-blue">
                        {locale === 'en' ? meta.en : meta.id}
                      </span>
                    </div>

                    {faculty ? (
                      <p className="mt-4 text-xs text-muted-foreground">{faculty.name}</p>
                    ) : null}
                    <h3 className="mt-1 font-display text-xl leading-snug transition-colors group-hover:text-blue-hover">
                      {program.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {program.excerpt}
                    </p>

                    {program.highlights?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {program.highlights.slice(0, 2).map((h) => (
                          <span
                            key={h.id ?? h.label}
                            className="rounded-full bg-blue/8 px-2.5 py-1 text-[0.65rem] text-blue"
                          >
                            {h.label}: {h.value}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-blue">
                      {dict.common.pelajari}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </GlassCard>
                </Link>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="glass" size="xl">
            <Link href={localise('/program', locale)}>{dict.common.lihatSemua}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
