import Link from 'next/link'
import { ArrowRight, CalendarDays, CheckCircle2 } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { Magnetic } from '@/components/shared/magnetic'
import { Button } from '@/components/ui/button'
import type { Homepage, SiteSettings } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'
import { localise } from '@/lib/i18n'

type CtaSectionProps = {
  page: Homepage
  settings: SiteSettings
  locale: Locale
}

export function CtaSection({ page, settings, locale }: CtaSectionProps) {
  const dict = getDictionary(locale)
  const en = locale === 'en'
  return (
    <Section spacing="lg" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="glass glow-blue relative overflow-hidden rounded-card px-6 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-blue/12 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 size-64 rounded-full bg-blue/8 blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-6">
              <p className="label-caps">
                {en ? dict.cta.eyebrow : `PMB ${new Date().getFullYear()}/${new Date().getFullYear() + 1}`}
              </p>

              <h2 className="max-w-3xl font-display text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
                {en ? dict.cta.title : page.ctaTitle ?? dict.cta.title}
              </h2>

              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {en ? dict.cta.text : page.ctaText ?? dict.cta.text}
              </p>

              {settings.admissionOpen ? (
                <p className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/8 px-4 py-2 text-sm text-blue">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {settings.admissionWave ?? 'Gelombang 1 – 31 Desember 2026'}
                </p>
              ) : null}

              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <Button asChild variant="blue" size="xl">
                    <Link href={localise('/pmb', locale)}>
                      {en ? dict.common.daftarSekarang : settings.admissionTitle ?? dict.common.daftarSekarang}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild variant="glass" size="xl">
                  <Link href={localise('/kontak', locale)}>{dict.common.hubungiKami}</Link>
                </Button>
              </div>

              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                {dict.cta.checklist.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-blue" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
