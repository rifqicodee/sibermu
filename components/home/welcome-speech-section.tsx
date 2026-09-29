import Image from 'next/image'
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/container'
import type { Locale } from '@/lib/i18n/config'

type WelcomeSpeechSectionProps = {
  locale: Locale
}

export function WelcomeSpeechSection({ locale }: WelcomeSpeechSectionProps) {
  const isEn = locale === 'en'

  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground transition-colors duration-300 sm:py-24">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0, 91, 172, 0.4) 0%, transparent 70%)' }}
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* Left Column: Portrait Card of Prof. Dr. Haedar Nashir, M.Si. */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Backdrop Decorative Frame */}
            <div className="absolute -inset-3 rounded-3xl bg-linear-to-tr from-[#005bac]/20 via-[#2f80ed]/10 to-transparent blur-xl dark:from-blue-500/20" />

            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-4 shadow-xl dark:border-white/15 dark:bg-slate-900/80">
              <div className="relative h-[380px] w-full overflow-hidden rounded-2xl sm:h-[450px]">
                <img
                  src="/haedar-nashir.jpg"
                  alt="Prof. Dr. Haedar Nashir, M.Si. - Ketua Umum PP Muhammadiyah"
                  className="size-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                {/* Name Card Badge at Bottom of Photo */}
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/65 p-4 text-white backdrop-blur-md">
                  <h3 className="text-base font-bold sm:text-lg">Prof. Dr. Haedar Nashir, M.Si.</h3>
                  <p className="text-xs text-blue-300">Ketua Umum Pimpinan Pusat Muhammadiyah</p>
                </div>
              </div>

              {/* Quick Highlight Points */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-blue" />
                  <span>Resmi SK Mendikbudristek</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-blue" />
                  <span>Era Revolusi Siber</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Speech Content */}
          <div className="flex flex-col items-start text-left">
            {/* Category Tag Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/8 px-4 py-1.5 backdrop-blur-md dark:border-white/15 dark:bg-white/5">
              <Sparkles className="size-4 text-blue dark:text-[#60a5fa]" />
              <span className="text-xs font-bold tracking-wider text-blue uppercase dark:text-blue-300">
                {isEn ? 'OFFICIAL REMARKS' : 'SAMBUTAN KETUA UMUM PP MUHAMMADIYAH'}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              SiberMu Jawab Tantangan Zaman
            </h2>

            {/* Quote Icon Accent */}
            <div className="my-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-blue/10 text-blue dark:bg-blue-500/20 dark:text-blue-400">
                <Quote className="size-5" />
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-blue/30 to-transparent" />
            </div>

            {/* Speech Paragraphs */}
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Alhamdulillah kita bersyukur kepada Allah SWT, pimpinan pusat Muhammadiyah telah secara resmi menerima SK berdirinya Universitas Siber Muhammadiyah (SiberMu). Atas nama pimpinan pusat Muhammadiyah menyampaikan terima kasih yang sebesar-besarnya kepada Mendikbud Republik Indonesia dan LLDikti wilayah 5 yang telah mendukung proses pengajuan SiberMu ini yang mana sudah berjalan sekitar dua tahun sejak bernama Muhammadiyah Online University dan kemudian menjadi Universitas Siber Muhammadiyah seperti yang kita kenal saat ini.
              </p>
              <p>
                Proses pengajuan tersebut dilalui sesuai dengan tradisi dan cara berpikir Muhammadiyah yang selalu menempuh prosedur yang resmi, legal, objektif dan mengikuti sistem. Inilah salah satu bentuk Muhammadiyah dalam mengedukasi masyarakat dan bangsa ini bahwa Indonesia akan selalu tegak baik sebagai state (negara) maupun sebagai nation (bangsa) dengan tradisi yang objektif, profesional, meritokrasi, sekaligus good governance, yang mana akan selalu dijaga oleh Muhammadiyah.
              </p>
              <p>
                Hari ini kita memperoleh mandat dari negara untuk menyelenggarakan Universitas Siber Muhammadiyah (SiberMu) sebagai terobosan baru sekaligus juga merupakan langkah kita dalam mengisi ruang baru yang disebut sebagai era revolusi perguruan tinggi. Muhammadiyah sebenarnya telah memiliki basic sistem penyelenggaraan pendidikan yang di dalamnya memiliki program-program yang sudah berbentuk siber yang tersebar di 164 perguruan tinggi yang artinya aktivitas siber sudah menjadi bagian integral dari perguruan tinggi Muhammadiyah yang sehat, bukan sekedar memperoleh tetapi InsyaAllah akan menjadi universitas yang berkualitas. Berkualitas yang dimaksud disini yaitu universitas yang dikelola dengan cara yang sehebat-hebatnya, sebaik-baiknya dan modern demi menunjukkan dan membuktikan kepada Indonesia bahwa Muhammadiyah selalu berada di depan dalam mewujudkan pranata-pranata modern yang bermutu, berkualitas, dan berkemajuan.
              </p>
            </div>

            {/* Signature Block */}
            <div className="mt-8 flex items-center gap-4 border-t border-border/80 pt-6">
              <div className="flex flex-col">
                <span className="font-bold text-foreground sm:text-lg">Prof. Dr. Haedar Nashir, M.Si.</span>
                <span className="text-xs font-semibold text-blue dark:text-blue-400">Ketua Umum PP Muhammadiyah</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
