import Link from 'next/link'
import { ArrowRight, GraduationCap, School, Trophy, Users } from 'lucide-react'

import { NeuralCanvasLazy } from '@/components/home/neural-canvas-lazy'
import { Container } from '@/components/shared/container'
import { Magnetic } from '@/components/shared/magnetic'
import { NotificationPill } from '@/components/shared/notification-pill'
import { GlassCard } from '@/components/shared/glass-card'
import { Button } from '@/components/ui/button'
import type { Homepage, SiteSettings } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'
import { localise } from '@/lib/i18n'

type HeroProps = {
  page: Homepage
  settings: SiteSettings
  locale: Locale
}

const floatingCards = [
  {
    icon: Trophy,
    label: { id: 'Juara 1', en: '1st Place' },
    text: { id: 'Kompetisi Coding Nasional', en: 'National Coding Competition' },
    pos: 'top-2 -left-4 sm:-left-10',
    delay: '0s',
  },
  {
    icon: GraduationCap,
    label: { id: 'Akreditasi Unggul', en: 'Excellent Accredited' },
    text: { id: 'Program studi terakreditasi', en: 'Accredited study programs' },
    pos: 'bottom-16 -right-3 sm:-right-8',
    delay: '1.4s',
  },
  {
    icon: Users,
    label: { id: '4.200+', en: '4,200+' },
    text: { id: 'Mahasiswa aktif belajar', en: 'Active students learning' },
    pos: '-bottom-2 left-6',
    delay: '2.6s',
  },
]

export function Hero({ page: hero, settings, locale }: HeroProps) {
  const dict = getDictionary(locale)
  const en = locale === 'en'
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <NeuralCanvasLazy className="absolute inset-0 size-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(0,91,172,0.16) 0%, transparent 65%)' }}
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-7">
          <p className="label-caps">{en ? dict.brand.name : hero.eyebrow}</p>

          <h1 className="font-display text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.05] font-normal">
            <span className="block">{en ? dict.hero.line1 : hero.titleLine1}</span>
            <span className="text-gradient-blue block italic">
              {en ? dict.hero.line2 : hero.titleLine2}
            </span>
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {en ? dict.hero.subtitle : hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button asChild variant="blue" size="xl">
                <Link href={localise(hero.primaryCta?.href || '/pmb', locale)}>
                  {en ? dict.hero.ctaPrimary : hero.primaryCta?.label || dict.hero.ctaPrimary}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="glass" size="xl">
              <Link href={localise(hero.secondaryCta?.href || '/program', locale)}>
                {en ? dict.hero.ctaSecondary : hero.secondaryCta?.label || dict.hero.ctaSecondary}
              </Link>
            </Button>
          </div>

          <NotificationPill
            enabled={settings.notificationEnabled ?? undefined}
            count={settings.notificationCount ?? undefined}
            text={settings.notificationText ?? 'mahasiswa sedang belajar sekarang'}
          />
        </div>

        <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="false">
          <GlassCard className="glow-blue relative z-10 p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-blue/15 text-blue-hover">
                <School className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  {en ? 'Digital Muhammadiyah University' : 'Universitas Digital Muhammadiyah'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {en ? 'Progressive in the digital era' : 'Berkemajuan di era digital'}
                </p>
              </div>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/8 pt-6">
              {[
                { icon: School, value: `${settings.faculties ?? 6}+`, label: dict.stats.faculties },
                {
                  icon: Users,
                  value: `${(settings.students ?? 4200).toLocaleString(en ? 'en-US' : 'id-ID')}+`,
                  label: dict.stats.students,
                },
                { icon: GraduationCap, value: `${settings.employmentRate ?? 92}%`, label: dict.stats.employment },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                  <s.icon className="size-4 text-blue" aria-hidden="true" />
                  <dt className="order-2 text-[0.65rem] tracking-wider text-muted-foreground uppercase">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-display text-xl text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/4 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                {en ? 'Years of progress' : 'Tahun berkemajuan'}
              </span>
              <span className="text-sm font-semibold text-blue-hover">
                {settings.years ?? 65} {en ? 'yrs' : 'tahun'}
              </span>
            </div>
          </GlassCard>

          {floatingCards.map((card) => (
            <div
              key={card.delay}
              className={`glass absolute z-20 w-48 animate-float rounded-2xl p-4 shadow-lg shadow-black/40 ${card.pos}`}
              style={{ animationDelay: card.delay }}
            >
              <div className="flex items-center gap-2">
                <card.icon className="size-4 text-blue" aria-hidden="true" />
                <span className="label-caps text-[0.6rem]">{en ? card.label.en : card.label.id}</span>
              </div>
              <p className="mt-1.5 text-xs leading-snug text-foreground/90">
                {en ? card.text.en : card.text.id}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
