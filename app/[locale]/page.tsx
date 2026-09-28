import type { Metadata } from 'next'

import { CtaSection } from '@/components/home/cta-section'
import { EventsSection } from '@/components/home/events-section'
import { FacultiesSection } from '@/components/home/faculties-section'
import { FaqSection } from '@/components/home/faq-section'
import { FeaturedPrograms } from '@/components/home/featured-programs'
import { Hero } from '@/components/home/hero'
import { NewsSection } from '@/components/home/news-section'
import { QuickAccess } from '@/components/home/quick-access'
import { StatsSection } from '@/components/home/stats-section'
import { Testimonials } from '@/components/home/testimonials'
import { VirtualCampus } from '@/components/home/virtual-campus'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'
import {
  getEvents,
  getFaculties,
  getFaqs,
  getHomepage,
  getNews,
  getProdi,
  getSiteSettings,
  getTestimonials,
} from '@/server/queries'
import type { Homepage, SiteSettings } from '@/server/globals-types'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'id')
  return {
    title: {
      default: dict.brand.name,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.hero.subtitle,
  }
}

async function safe<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise
  } catch {
    return null
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'id'
  const dict = getDictionary(locale)

  const [
    pageRes,
    settingsRes,
    prodiRes,
    facultiesRes,
    eventsRes,
    newsRes,
    testimonialsRes,
    faqsRes,
  ] = await Promise.all([
    safe(getHomepage()),
    safe(getSiteSettings()),
    safe(getProdi({ limit: 8, featured: true })),
    safe(getFaculties({ limit: 6, featured: true })),
    safe(getEvents({ limit: 4, upcoming: true })),
    safe(getNews({ limit: 3 })),
    safe(getTestimonials(6)),
    safe(getFaqs({ homepage: true })),
  ])

  const page = (pageRes ?? ({} as Homepage)) satisfies Homepage
  const settings = (settingsRes ?? ({} as SiteSettings)) satisfies SiteSettings

  return (
    <>
      <Hero page={page} settings={settings} locale={locale} />
      <QuickAccess page={page} locale={locale} />
      <StatsSection page={page} settings={settings} locale={locale} />
      <FacultiesSection page={page} faculties={facultiesRes ?? []} locale={locale} />
      <FeaturedPrograms page={page} programs={prodiRes ?? []} locale={locale} />
      <NewsSection page={page} news={newsRes?.docs ?? []} locale={locale} />
      <EventsSection page={page} events={eventsRes ?? []} locale={locale} />
      <Testimonials
        page={page}
        testimonials={testimonialsRes ?? []}
        locale={locale}
        dict={dict}
      />
      <VirtualCampus page={page} locale={locale} />
      <FaqSection page={page} faqs={faqsRes ?? []} locale={locale} />
      <CtaSection page={page} settings={settings} locale={locale} />
    </>
  )
}
