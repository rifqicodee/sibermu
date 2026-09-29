import Link from 'next/link'
import { ArrowRight, GraduationCap, School, Sparkles, Users } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { Magnetic } from '@/components/shared/magnetic'
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

export function Hero({ page: hero, settings, locale }: HeroProps) {
  const dict = getDictionary(locale)
  const en = locale === 'en'

  return (
    <section className="relative overflow-hidden bg-background pt-10 pb-20 text-foreground transition-colors duration-300">
      {/* Radial Glow Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(0, 91, 172, 0.25) 0%, rgba(47, 128, 237, 0.1) 45%, transparent 70%)' }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/8 px-4 py-1.5 shadow-xs backdrop-blur-md dark:border-white/15 dark:bg-white/5">
          <Sparkles className="size-4 text-blue dark:text-[#60a5fa]" />
          <span className="text-xs font-semibold tracking-wider text-blue uppercase dark:text-slate-200">
            {en ? 'Digital Muhammadiyah University' : 'Universitas Digital Muhammadiyah'}
          </span>
        </div>

        {/* Display Headline with Inline Rounded Image Pills */}
        <h1 className="max-w-5xl font-sans text-4xl font-extrabold tracking-tight text-[#0F172A] uppercase sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.15] dark:text-white">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>{en ? 'BUILDING' : 'MEMBANGUN'}</span>
            <span className="relative inline-flex h-9 w-20 overflow-hidden rounded-xl border-2 border-blue/20 shadow-md transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-28 md:h-16 md:w-36 lg:h-18 lg:w-44 shrink-0 align-middle dark:border-white/20">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
                alt="Digital Campus Space"
                className="size-full object-cover"
              />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#005bac] via-[#2f80ed] to-[#005bac] dark:from-white dark:via-slate-100 dark:to-blue-200">
              {en ? 'DIGITAL' : 'PENDIDIKAN'}
            </span>
          </span>

          <span className="mt-2 block inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-4">
            <span>{en ? 'FUTURE' : 'DIGITAL'}</span>
            <span className="relative inline-flex h-9 w-20 overflow-hidden rounded-xl border-2 border-blue/20 shadow-md transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-28 md:h-16 md:w-36 lg:h-18 lg:w-44 shrink-0 align-middle dark:border-white/20">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
                alt="Technology Dashboard"
                className="size-full object-cover"
              />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#005bac] to-[#2f80ed] dark:from-[#2f80ed] dark:via-[#60a5fa] dark:to-cyan-300">
              {en ? 'EDUCATION' : 'BERKEMAJUAN'}
            </span>
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg dark:text-slate-300">
          {en
            ? (hero.subtitle || 'Universitas Siber Muhammadiyah provides progressive digital higher education that is flexible, innovative, and accessible to build a bright future for all learners.')
            : (hero.subtitle || 'Universitas Siber Muhammadiyah menghadirkan perkuliahan digital berkemajuan yang fleksibel, inovatif, dan terjangkau untuk membangun masa depan generasi unggul Indonesia.')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button asChild variant="blue" size="xl" className="rounded-full px-8 font-semibold shadow-lg shadow-blue-500/25">
              <Link href={localise(hero.primaryCta?.href || '/pmb', locale)}>
                {en ? (dict.hero.ctaPrimary || 'Daftar PMB') : (hero.primaryCta?.label || 'Daftar PMB Sekarang')}
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </Magnetic>
          <Button asChild variant="glass" size="xl" className="rounded-full border border-border bg-background/80 px-8 text-foreground hover:bg-muted dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
            <Link href={localise(hero.secondaryCta?.href || '/program', locale)}>
              {en ? (dict.hero.ctaSecondary || 'Lihat Program Studi') : (hero.secondaryCta?.label || 'Jelajahi Program Studi')}
            </Link>
          </Button>
        </div>

        {/* Big Rounded Hero Banner Image */}
        <div className="relative mt-14 w-full max-w-6xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl dark:border-white/15 dark:bg-slate-900/60 dark:shadow-2xl sm:rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Mahasiswa Siber Muhammadiyah Belajar Digital"
            className="h-[320px] w-full object-cover sm:h-[480px] md:h-[580px] transition-transform duration-700 hover:scale-[1.02]"
          />
          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-90 dark:from-[#060A12]" />

          {/* Quick Floating Stats Bar on Banner */}
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-background/90 p-4 shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-black/75 dark:text-white sm:inset-x-8 sm:bottom-8 sm:p-6">
            <div className="flex items-center gap-3 text-left">
              <div className="grid size-10 place-items-center rounded-xl bg-blue/15 text-blue sm:size-12 dark:bg-blue-500/20 dark:text-blue-400">
                <School className="size-5 sm:size-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{en ? 'System' : 'Sistem Pembelajaran'}</p>
                <p className="text-sm font-bold text-foreground sm:text-base dark:text-white">100% Full Online & Flexible</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 sm:size-12 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Users className="size-5 sm:size-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{en ? 'Students' : 'Mahasiswa Aktif'}</p>
                <p className="text-sm font-bold text-foreground sm:text-base dark:text-white">{(settings.students ?? 4200).toLocaleString()} + Mahasiswa</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="grid size-10 place-items-center rounded-xl bg-amber-500/15 text-amber-600 sm:size-12 dark:bg-amber-500/20 dark:text-amber-400">
                <GraduationCap className="size-5 sm:size-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{en ? 'Programs' : 'Program Studi'}</p>
                <p className="text-sm font-bold text-foreground sm:text-base dark:text-white">Terakreditasi BAN-PT</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
