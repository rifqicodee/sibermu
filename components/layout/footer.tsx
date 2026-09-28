import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import { NewsletterForm } from '@/components/layout/newsletter-form'
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

  return (
    <footer className="relative mt-auto border-t border-white/8 bg-muted/40 dark:bg-[#060e15]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue/50 to-transparent"
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-6">
            <Link href={localise('/', locale)} className="w-fit">
              <LogoMark withWordmark />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {locale === 'en' && footer.descriptionEn ? footer.descriptionEn : footer.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {settings?.socials?.map((social) => {
                return (
                  <a
                    key={social.platform + social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="glass inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-blue-hover hover:shadow-blue-sm"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </a>
                )
              })}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <h3 className="label-caps">{dict.footer.newsletterTitle}</h3>
              <NewsletterForm dict={dict} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {footer.columns?.map((column) => (
              <div key={column.title}>
                <h3 className="label-caps mb-4">{pick(column.title, column.titleEn)}</h3>
                <ul className="flex flex-col gap-2.5">
                  {column.links?.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={localise(link.href, locale)}
                        className="text-sm text-muted-foreground transition-colors hover:text-blue-hover"
                      >
                        {pick(link.label, link.labelEn)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {settings?.email ? (
              <a href={`mailto:${settings?.email}`} className="inline-flex items-center gap-1.5 hover:text-blue-hover">
                <Mail className="size-3.5" /> {settings?.email}
              </a>
            ) : null}
            {settings?.phone ? (
              <a href={`tel:${settings?.phone}`} className="inline-flex items-center gap-1.5 hover:text-blue-hover">
                <Phone className="size-3.5" /> {settings?.phone}
              </a>
            ) : null}
            {settings?.address ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {settings?.address.split('\n')[0]}
              </span>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  )
}
