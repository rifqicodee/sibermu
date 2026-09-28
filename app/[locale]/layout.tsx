import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display, Quicksand } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { CursorGlow } from '@/components/shared/cursor-glow'
import { Footer } from '@/components/layout/footer'
import { SearchDialogLazy } from '@/components/search/search-dialog-lazy'
import { SiteHeader } from '@/components/layout/header/site-header'
import type { HeaderContact, HeaderFaculty, HeaderStats } from '@/components/layout/header/types'
import { getFaculties, getProdi, getSiteSettings } from '@/server/queries'
import { getDictionary } from '@/lib/i18n/messages'
import { defaultLocale, isLocale, locales } from '@/lib/i18n/config'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/** Font nav (Quicksand) — meniru tipografi sibermu.ac.id. */
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'id')

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.brand.name} — ${dict.brand.tagline}`,
      template: `%s · ${dict.brand.name}`,
    },
    description: dict.hero.subtitle,
    applicationName: dict.brand.name,
    keywords: [
      dict.brand.name,
      'Muhammadiyah',
      'kampus digital',
      'PMB 2027',
      'program studi',
      'pendidikan tinggi',
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
        'x-default': `${SITE_URL}/${defaultLocale}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'id_ID',
      siteName: dict.brand.name,
      url: SITE_URL,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#081420' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  let admissionOpen = true
  let admissionDeadline: string | null = null
  let faculties: HeaderFaculty[] = []
  const programsPerFaculty: Record<string, number> = {}
  let contact: HeaderContact = {}
  let stats: HeaderStats = {}

  try {
    const [settings, facultyDocs, prodiDocs] = await Promise.all([
      getSiteSettings(),
      getFaculties({ limit: 6 }),
      getProdi({ limit: 200 }),
    ])

    admissionOpen = settings.admissionOpen ?? true
    admissionDeadline = settings.admissionDeadline ?? null

    contact = {
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      address: settings.address,
      mapsUrl: settings.mapsUrl,
    }

    stats = {
      employmentRate: settings.employmentRate,
      partners: settings.partners,
      students: settings.students,
    }

    faculties = facultyDocs.map((faculty) => ({
      id: String(faculty.id),
      code: faculty.code,
      name: faculty.name,
      accreditation: faculty.accreditation,
      href: faculty.slug ? `/fakultas#${faculty.slug}` : '/fakultas',
    }))

    for (const prodi of prodiDocs) {
      const raw = prodi.faculty as unknown
      const facultyId =
        typeof raw === 'string'
          ? raw
          : raw && typeof raw === 'object' && 'id' in raw
            ? String((raw as { id: string | number }).id)
            : null
      if (!facultyId) continue
      programsPerFaculty[facultyId] = (programsPerFaculty[facultyId] ?? 0) + 1
    }
  } catch {
    // DB belum siap (mis. build pertama tanpa payload.db) — pakai default
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${quicksand.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
            <SiteHeader
              locale={locale}
              dict={dict}
              admissionOpen={admissionOpen}
              admissionDeadline={admissionDeadline}
              faculties={faculties}
              programsPerFaculty={programsPerFaculty}
              contact={contact}
              stats={stats}
            />
            <CursorGlow />
            <main id="konten" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} dict={dict} />
            <SearchDialogLazy locale={locale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  )
}
