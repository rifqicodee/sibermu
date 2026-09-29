import Link from 'next/link'
import { LogoMark } from '@/components/shared/logo'
import { SocialIcon } from '@/components/shared/social-icon'
import { Container } from '@/components/shared/container'
import { FOOTER_FALLBACK } from '@/server/constants'
import { getFooter, getSiteSettings } from '@/server/queries'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'

type FooterData = {
  description?: string | null
  descriptionEn?: string | null
  copyright?: string | null
  columns?: {
    title: string
    titleEn?: string | null
    links?: { label: string; labelEn?: string | null; href: string }[] | null
  }[] | null
}

type FooterProps = {
  locale: Locale
  dict: Dictionary
}

export async function Footer({ locale, dict }: FooterProps) {
  const pick = (label: string, labelEn?: string | null) =>
    locale === 'en' && labelEn ? labelEn : label
  let footer: FooterData = FOOTER_FALLBACK
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null

  try {
    const [foot, site] = await Promise.all([getFooter(), getSiteSettings()])
    if (foot.columns?.length) footer = foot
    settings = site
  } catch {
    // fallback
  }

  const isEn = locale === 'en'

  return (
    <footer className="relative mt-auto border-t border-primary/10 bg-gradient-to-br from-[#005bac] via-[#004f98] to-[#002f5a] text-primary-foreground pt-16 pb-10 transition-colors duration-300">
      <Container className="max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Brand, Description, and Socials (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href={localise('/', locale)} className="group flex items-center gap-4">
              {/* Circular White Badge for Logo Icon */}
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 120 120" fill="none" className="size-8">
                  <path d="M 22 92 A 46 46 0 0 0 98 92 A 48 48 0 0 1 22 92 Z" fill="#0D2B5C" />
                  <path d="M 18 56 C 18 34 35 16 60 16 C 85 16 102 34 102 56 C 102 76 86 92 60 94 C 34 92 18 76 18 56 Z" stroke="#007B3A" strokeWidth="3" fill="none" />
                  <circle cx="60" cy="54" r="32" fill="#007B3A" />
                  <circle cx="60" cy="54" r="16" fill="#007B3A" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="60" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="serif">مُحَمَّدِيَّة</text>
                </svg>
              </div>
              <div className="flex flex-col font-sans leading-none tracking-tight">
                <span className="text-xl font-bold tracking-tight text-white">SiberMu</span>
                <span className="mt-0.5 text-[0.65rem] font-medium tracking-wide text-primary-foreground/90 uppercase">Universitas Siber Muhammadiyah</span>
              </div>
            </Link>

            <p className="font-sans text-[15px] font-medium leading-relaxed text-primary-foreground/90 max-w-sm mt-2">
              {isEn
                ? 'A progressive digital university pioneering flexible higher education in Indonesia. Connecting learners with a global future.'
                : 'Pelopor Perguruan Tinggi Digital Berkemajuan di Indonesia yang Menghubungkan Pembelajar dengan Masa Depan Global.'}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {settings?.socials?.map((social) => (
                <a
                  key={social.platform + social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="grid size-10 place-items-center rounded-full bg-white text-[#005bac] shadow-sm transition-transform hover:scale-110"
                >
                  <SocialIcon platform={social.platform} className="size-5" />
                </a>
              ))}
              {/* Fallback dummy socials if none provided */}
              {!settings?.socials?.length && (
                <>
                  {['instagram', 'youtube', 'tiktok', 'facebook'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="grid size-10 place-items-center rounded-full bg-white text-[#005bac] shadow-sm transition-transform hover:scale-110"
                    >
                      <SocialIcon platform={platform} className="size-5" />
                    </a>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Right Columns: 3 Link Columns (lg:col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2 lg:pt-0">
            {/* Nav Column 1 */}
            <div className="flex flex-col gap-5">
              <span className="text-[15px] font-bold text-white">
                {isEn ? 'Academics' : 'Akademik'}
              </span>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-primary-foreground/80">
                <li>
                  <Link href={localise('/program', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Study Programs' : 'Program Studi'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/kurikulum', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Curriculum' : 'Kurikulum'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/kalender', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Academic Calendar' : 'Kalender Akademik'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/panduan', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Student Guide' : 'Panduan Mahasiswa'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2 */}
            <div className="flex flex-col gap-5">
              <span className="text-[15px] font-bold text-white">
                {isEn ? 'Company' : 'Tentang Kami'}
              </span>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-primary-foreground/80">
                <li>
                  <Link href={localise('/profil', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'About Us' : 'Profil SiberMu'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/visi-misi', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Vision & Mission' : 'Visi & Misi'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/karir', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Careers' : 'Karir'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/mitra', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Partners' : 'Kemitraan'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 3 */}
            <div className="flex flex-col gap-5">
              <span className="text-[15px] font-bold text-white">
                {isEn ? 'Resources' : 'Bantuan'}
              </span>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-primary-foreground/80">
                <li>
                  <Link href={localise('/pmb', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Admissions' : 'Portal PMB'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/#kontak', locale)} className="hover:text-white transition-colors">
                    {isEn ? 'Contact Us' : 'Hubungi Kami'}
                  </Link>
                </li>
                <li>
                  <Link href={localise('/faq', locale)} className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href={localise('/blog', locale)} className="hover:text-white transition-colors">
                    Blog & Berita
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 sm:flex-row">
          <p className="text-[13px] font-medium text-primary-foreground/70">
            © 2026 • Universitas Siber Muhammadiyah. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] font-medium text-primary-foreground/70">
            <Link href={localise('/privacy', locale)} className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href={localise('/terms', locale)} className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
