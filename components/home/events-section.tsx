import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { GlassCard } from '@/components/shared/glass-card'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from 'cn'
import { getDictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'
import type { Homepage } from '@/server/globals-types'
import type { Event } from '@/server/payload-types'

const CATEGORY_LABEL: Record<string, { id: string; en: string }> = {
  akademik: { id: 'Akademik', en: 'Academic' },
  kemahasiswaan: { id: 'Kemahasiswaan', en: 'Student Affairs' },
  webinar: { id: 'Webinar', en: 'Webinar' },
  pmb: { id: 'PMB', en: 'Admissions' },
  penelitian: { id: 'Penelitian', en: 'Research' },
  alumni: { id: 'Alumni', en: 'Alumni' },
}

type EventsSectionProps = {
  page: Homepage
  events: Event[]
  locale: Locale
}

export function EventsSection({ page, events, locale }: EventsSectionProps) {
  const dict = getDictionary(locale)
  const localeCode = locale === 'en' ? 'en-GB' : 'id-ID'

  if (events.length === 0) return null

  return (
    <Section id="agenda" spacing="lg">
      <Container>
        <SectionHeading
          eyebrow={dict.events.upcoming}
          title={locale === 'en' ? dict.events.title : page.eventsTitle ?? dict.events.title}
          description={dict.events.description}
        />

        <Reveal stagger className="grid gap-4 md:grid-cols-2">
          {events.map((event) => {
            const startsAt = event.startsAt ? new Date(event.startsAt) : null
            const href = event.registrationUrl?.startsWith('/')
              ? localise(event.registrationUrl, locale)
              : event.registrationUrl || null
            const category = CATEGORY_LABEL[event.category ?? 'akademik']

            const card = (
              <GlassCard className="flex h-full items-start gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30">
                <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue text-white">
                  <span className="font-display text-xl leading-none">
                    {startsAt ? startsAt.getDate() : '–'}
                  </span>
                  <span className="mt-1 text-[0.6rem] tracking-widest uppercase">
                    {startsAt ? startsAt.toLocaleDateString(localeCode, { month: 'short' }) : ''}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="label-caps rounded-full bg-blue/10 px-2.5 py-0.5 text-[0.6rem] text-blue">
                      {locale === 'en' ? category?.en : category?.id}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg leading-snug">{event.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{event.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-blue" aria-hidden="true" />
                      {startsAt
                        ? startsAt.toLocaleDateString(localeCode, {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : ''}
                    </span>
                    {event.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-blue" aria-hidden="true" />
                        {event.location}
                      </span>
                    ) : null}
                  </div>
                </div>
              </GlassCard>
            )

            return href ? (
              <Link
                key={event.slug ?? event.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block h-full"
              >
                {card}
              </Link>
            ) : (
              <div key={event.slug ?? event.id} className={cn('h-full')}>
                {card}
              </div>
            )
          })}
        </Reveal>
      </Container>
    </Section>
  )
}
