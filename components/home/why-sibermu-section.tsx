import Link from 'next/link'
import {
  Sparkles,
  Flame,
  Globe,
  Clock,
  GraduationCap,
  CreditCard,
  BookOpenCheck,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react'
import { Container } from '@/components/shared/container'
import type { Locale } from '@/lib/i18n/config'

type WhySibermuSectionProps = {
  locale: Locale
}

const features = [
  {
    title: 'Kuliah Online',
    description: 'Mengutamakan pembelajaran online yang efektif dan inovatif',
    icon: Globe,
    badge: '100% Online',
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  },
  {
    title: 'Fleksibel',
    description: 'Belajar kapan pun, di mana pun tanpa mengganggu pekerjaan',
    icon: Clock,
    badge: 'Akses 24/7',
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  },
  {
    title: 'Terbimbing',
    description: 'Bentuk pembelajaran terbimbing oleh dosen profesional & praktisi',
    icon: GraduationCap,
    badge: 'Mentorship',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
  },
  {
    title: 'Terjangkau',
    description: 'Biaya kuliah terjangkau dan dapat dicicil 2 kali per semester',
    icon: CreditCard,
    badge: 'Cicilan 2x',
    color: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
  },
  {
    title: 'Kurikulum Terkini',
    description: 'Menggunakan kurikulum Kampus Merdeka berstandar nasional',
    icon: BookOpenCheck,
    badge: 'Kampus Merdeka',
    color: 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
  },
]

export function WhySibermuSection({ locale }: WhySibermuSectionProps) {
  const isEn = locale === 'en'

  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground transition-colors duration-300 sm:py-24">
      {/* Soft Background Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(234, 179, 8, 0.35) 0%, transparent 70%)' }}
      />

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="size-4 text-amber-500" />
            <span className="text-xs font-bold tracking-wider text-amber-600 uppercase dark:text-amber-400">
              {isEn ? 'WHY CHOOSE SIBERMU?' : 'MENGAPA MEMILIH SIBERMU?'}
            </span>
          </div>

          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {isEn
              ? 'Progressive Digital Education with a Proven Legacy'
              : 'Pendidikan Digital Berkemajuan dengan Rekam Jejak Teruji'}
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Muhammadiyah telah terbukti dalam menyelenggarakan pendidikan mulai dari tingkat dasar hingga perguruan tinggi. Jaringan pendidikan Muhammadiyah tersebar di seluruh Indonesia: lebih dari <strong className="text-foreground">23.000 TKAB/PAUD</strong> yang dikelola oleh ‘Aisyiyah, <strong className="text-foreground">12.000 sekolah dasar dan menengah</strong>, serta <strong className="text-foreground">174 Perguruan Tinggi</strong>. Hal ini membuktikan komitmen nyata Muhammadiyah dalam memajukan bangsa.
          </p>
        </div>

        {/* Bento Grid Widget Layout (Inspired by Attached Design) */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-12">
          {/* Bento Card 1: Large Yellow Card (Like Top-Left Yellow Card in Reference Design) */}
          <div className="relative overflow-hidden rounded-3xl bg-amber-400 p-8 text-slate-950 shadow-xl transition-all duration-300 hover:scale-[1.02] md:col-span-3 lg:col-span-4 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="text-5xl font-black tracking-tight sm:text-6xl">23.000+</span>
              <p className="mt-2 text-base font-bold uppercase tracking-wider text-slate-900/90">
                TKAB / PAUD 'Aisyiyah
              </p>
              <p className="mt-1 text-xs text-slate-900/75">
                Jaringan pendidikan usia dini terbesar di Indonesia.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-950/15 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Rekam Jejak Terbukti</span>
              <div className="grid size-12 place-items-center rounded-2xl bg-slate-950/10">
                <Flame className="size-7 text-amber-900 fill-amber-500" />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Feature Status & Pillars Card (Like Top-Right Daily Goal Widget in Reference Design) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl dark:border-white/15 md:col-span-3 lg:col-span-8 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-blue/10 text-blue dark:bg-blue-500/20 dark:text-blue-400">
                  <Award className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">5 Keunggulan SiberMu</h3>
                  <p className="text-xs text-muted-foreground">Solusi perkuliahan fleksibel & terjangkau</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>Terakreditasi BAN-PT</span>
              </div>
            </div>

            {/* Feature Pills Ticker Row */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href="https://sibermu.ac.id/#"
                    className="group flex flex-col items-center rounded-2xl border border-border/60 bg-muted/40 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue/50 hover:bg-background hover:shadow-md"
                  >
                    <div className={`mb-2 grid size-9 place-items-center rounded-xl ${item.color}`}>
                      <Icon className="size-4" />
                    </div>
                    <span className="text-xs font-bold text-foreground transition-colors group-hover:text-blue">
                      {item.title}
                    </span>
                    <span className="mt-1 text-[0.6rem] font-semibold text-muted-foreground">
                      {item.badge}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Bento Card 3: Circular Stat Ring Widget (Like Bottom-Left Widget in Reference Design) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl dark:border-white/15 md:col-span-3 lg:col-span-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground">Jaringan Kampus PTMA</h4>
                <p className="text-xs text-muted-foreground">Perguruan Tinggi Muhammadiyah</p>
              </div>
              <span className="grid size-9 place-items-center rounded-xl bg-blue/10 text-blue">
                <TrendingUp className="size-4" />
              </span>
            </div>

            <div className="my-6 flex items-center justify-center gap-6">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative grid size-20 place-items-center rounded-full border-4 border-blue bg-blue/5">
                  <span className="text-2xl font-black text-blue">174</span>
                </div>
                <span className="mt-2 text-xs font-bold text-foreground">Perguruan Tinggi</span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative grid size-20 place-items-center rounded-full border-4 border-emerald-500 bg-emerald-500/5">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">12K+</span>
                </div>
                <span className="mt-2 text-xs font-bold text-foreground">Sekolah SD - SMA</span>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Didukung infrastruktur pendidikan terpercaya di seluruh pelosok Indonesia.
            </p>
          </div>

          {/* Bento Card 4: Feature Breakdown Grid (Middle Bottom) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl dark:border-white/15 md:col-span-3 lg:col-span-4 flex flex-col justify-between">
            <h4 className="text-sm font-bold text-foreground">Sistem Perkuliahan Unggulan</h4>
            <ul className="my-4 space-y-3">
              {features.slice(0, 3).map((f) => (
                <li key={f.title} className="flex items-start gap-2.5">
                  <div className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg ${f.color}`}>
                    <f.icon className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground">{f.title}</span>
                    <p className="text-[0.72rem] text-muted-foreground">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-muted/60 p-3 text-center text-xs font-medium text-muted-foreground">
              Kurikulum berbasis Kampus Merdeka & Siap Kerja
            </div>
          </div>

          {/* Bento Card 5: Vibrant Blue Accent Card (Like Bottom-Right Blue Card in Reference Design) */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#005bac] to-[#2f80ed] p-8 text-white shadow-xl transition-all duration-300 hover:scale-[1.02] md:col-span-3 lg:col-span-4 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="text-5xl font-black tracking-tight sm:text-6xl">100%</span>
              <p className="mt-2 text-base font-bold uppercase tracking-wider text-blue-100">
                Kuliah Online & Fleksibel
              </p>
              <p className="mt-1 text-xs text-blue-200">
                Belajar kapan saja, di mana saja dengan biaya terjangkau & cicilan 2x/semester.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Daftar Sekarang</span>
              <div className="grid size-12 place-items-center rounded-2xl bg-white/20 backdrop-blur-md">
                <Flame className="size-7 text-amber-300 fill-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
