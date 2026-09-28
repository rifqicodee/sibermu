import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { CursorGlow } from '@/components/shared/cursor-glow'
import { Footer } from '@/components/layout/footer'
import { SearchDialogLazy } from '@/components/search/search-dialog-lazy'
import { Navbar, type MenuItem } from '@/components/layout/navbar'
import { NAV_FALLBACK } from '@/server/constants'
import { getNavigation, getSiteSettings } from '@/server/queries'
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
  let menu: MenuItem[] = NAV_FALLBACK
  let admissionOpen = true
  let admissionDeadline: string | null = null

  try {
    const [nav, settings] = await Promise.all([getNavigation(), getSiteSettings()])
    if (nav.mainMenu?.length) menu = nav.mainMenu
    admissionOpen = settings.admissionOpen ?? true
    admissionDeadline = settings.admissionDeadline ?? null
  } catch {
    // DB belum siap (mis. build pertama tanpa payload.db) — pakai fallback
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
            <Navbar
              menu={menu}
              admissionOpen={admissionOpen}
              admissionDeadline={admissionDeadline}
              locale={locale}
              dict={dict}
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
