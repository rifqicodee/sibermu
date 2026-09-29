import { Building2, Globe2, ShieldCheck, Cpu, Laptop, Landmark, BookOpen, Award, Sparkles, Network, School, Code } from 'lucide-react'
import { Container } from '@/components/shared/container'
import type { Locale } from '@/lib/i18n/config'

type SponsorsSectionProps = {
  locale: Locale
}

const row1Partners = [
  { name: 'PP Muhammadiyah', tag: 'Diktilitbang', icon: Building2 },
  { name: 'Kemdiktisaintek', tag: 'BAN-PT Akreditasi', icon: ShieldCheck },
  { name: 'Google for Education', tag: 'Cloud & AI Learning', icon: Globe2 },
  { name: 'Microsoft Education', tag: 'Digital Platform', icon: Cpu },
  { name: 'AWS Educate', tag: 'Cloud Computing', icon: Laptop },
  { name: 'Coursera for Campus', tag: 'Global Certificate', icon: BookOpen },
]

const row2Partners = [
  { name: 'PTMA Network', tag: '170+ Kampus Muhammadiyah', icon: Landmark },
  { name: 'Bank Syariah Indonesia', tag: 'Layanan Finansial', icon: Award },
  { name: 'Open edX Platform', tag: 'LMS Siber Utama', icon: Code },
  { name: 'SilatMu Network', tag: 'Sistem Terintegrasi', icon: Network },
  { name: 'EdTech Indonesia', tag: 'Teknologi Pembelajaran', icon: School },
  { name: 'Siber Muhammadiyah Hub', tag: 'Inovasi Digital', icon: Sparkles },
]

export function SponsorsSection({ locale }: SponsorsSectionProps) {
  const isEn = locale === 'en'

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-muted/20 py-10 transition-colors duration-300">
      <Container className="relative z-10 mb-6 flex flex-col items-center text-center">
        <p className="text-[0.7rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
          {isEn
            ? "CONNECTING THE WORLD'S GREATEST INSTITUTIONS & TECHNOLOGY PARTNERS"
            : 'MITRA STRATEGIS & KEMITRAAN TEKNOLOGI UNIVERSITAS SIBER MUHAMMADIYAH'}
        </p>
      </Container>

      {/* Ticker Container with Side Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Overlays */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent sm:w-36" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent sm:w-36" />

        {/* Row 1: Moves Left */}
        <div className="mb-4 flex w-max gap-4 animate-[marquee-left_32s_linear_infinite] hover:[animation-play-state:paused]">
          {[...row1Partners, ...row1Partners, ...row1Partners, ...row1Partners].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`row1-${item.name}-${idx}`}
                className="group flex min-w-[210px] items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-xs transition-all duration-300 hover:border-blue/50 hover:bg-background hover:shadow-md"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue group-hover:text-white dark:bg-blue-500/15 dark:text-blue-400">
                  <Icon className="size-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-foreground transition-colors group-hover:text-blue">
                    {item.name}
                  </span>
                  <span className="text-[0.65rem] font-medium text-muted-foreground">
                    {item.tag}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex w-max gap-4 animate-[marquee-right_32s_linear_infinite] hover:[animation-play-state:paused]">
          {[...row2Partners, ...row2Partners, ...row2Partners, ...row2Partners].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`row2-${item.name}-${idx}`}
                className="group flex min-w-[210px] items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-xs transition-all duration-300 hover:border-blue/50 hover:bg-background hover:shadow-md"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Icon className="size-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {item.name}
                  </span>
                  <span className="text-[0.65rem] font-medium text-muted-foreground">
                    {item.tag}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
