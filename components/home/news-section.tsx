import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { GlassCard } from '@/components/shared/glass-card'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import type { News } from '@/server/payload-types'
import type { Homepage } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'
import { localise } from '@/lib/i18n'

const textures = ['/textures/pattern-2.svg', '/textures/pattern-3.svg', '/textures/pattern-4.svg']

type NewsSectionProps = {
  page: Homepage
  news: News[]
  locale: Locale
}

export function NewsSection({ page, news, locale }: NewsSectionProps) {
  const dict = getDictionary(locale)
  const items = news.slice(0, 3)
  const formatDate = (iso: string | null | undefined) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Section id="berita" spacing="lg">
      <Container>
        <SectionHeading
          eyebrow={dict.search.group.berita}
          title={locale === 'en' ? dict.news.title : page.newsTitle ?? dict.news.title}
          description={dict.news.description}
        />

        <Reveal stagger className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Link key={item.slug ?? item.id} href={localise('/berita', locale)} className="group block h-full">
              <GlassCard className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {item.cover && typeof item.cover !== 'number' && item.cover.url ? (
                    <Image
                      src={item.cover.url}
                      alt={item.cover.alt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={textures[i % textures.length]}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[0.65rem] font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                    {(item.category as { name?: string } | null)?.name ?? 'Berita'}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs text-muted-foreground" dateTime={item.publishedAt ?? undefined}>
                    {formatDate(item.publishedAt)}
                  </time>
                  <h3 className="mt-2 font-display text-xl leading-snug transition-colors group-hover:text-blue-hover">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-blue">
                    {dict.news.baca}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="glass" size="xl">
            <Link href={localise('/berita', locale)}>{dict.common.semuaBerita}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
