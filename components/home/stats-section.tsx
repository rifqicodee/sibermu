import { AnimatedCounter } from '@/components/shared/animated-counter'
import { Container } from '@/components/shared/container'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { Homepage, SiteSettings } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'

type StatsSectionProps = {
  page: Homepage
  settings: SiteSettings
  locale: Locale
}

export function StatsSection({ page, settings, locale }: StatsSectionProps) {
  const dict = getDictionary(locale)
  const stats = [
    { value: settings.faculties ?? 6, suffix: '+', label: dict.stats.faculties },
    { value: settings.programs ?? 18, suffix: '+', label: dict.stats.programs },
    { value: settings.lecturers ?? 320, suffix: '+', label: dict.stats.lecturers },
    { value: settings.students ?? 4200, suffix: '+', label: dict.stats.students },
    { value: settings.employmentRate ?? 92, suffix: '%', label: dict.stats.employment },
  ]

  return (
    <Section id="statistik" spacing="lg">
      <Container>
        <SectionHeading
          eyebrow={dict.stats.eyebrow}
          title={locale === 'en' ? dict.stats.title : page.statsTitle ?? dict.stats.title}
          description={locale === 'en' ? dict.stats.description : page.statsSubtitle ?? dict.stats.description}
        />

        <Reveal stagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass flex flex-col items-center gap-1.5 rounded-card px-4 py-8 text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-[clamp(1.9rem,4vw,2.75rem)] leading-none text-gradient-blue"
              />
              <span className="text-xs tracking-wider text-muted-foreground uppercase">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
