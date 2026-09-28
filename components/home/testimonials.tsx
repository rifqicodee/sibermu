'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { GlassCard } from '@/components/shared/glass-card'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import type { Testimonial } from '@/server/payload-types'
import type { Homepage } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/messages'

type TestimonialsProps = {
  page: Homepage
  testimonials: Testimonial[]
  locale: Locale
  dict: Dictionary
}

export function Testimonials({ page, testimonials, locale, dict }: TestimonialsProps) {
  const [index, setIndex] = useState(0)

  const items = testimonials.length
    ? testimonials
    : [
        { id: '1', name: 'Anisa Putri', role: 'alumni', quote: 'Kuliah hibrida di USM membuat saya bisa magang di startup sejak semester tiga tanpa tertinggal materi.' },
        { id: '2', name: 'Bagas Ramadhan', role: 'siswa', quote: 'Dosen pembimbingnya dekat, materi bisnis digital langsung dipraktikkan lewat proyek bersama mitra.' },
      ] as unknown as Testimonial[]

  const current = items[index % items.length]
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  return (
    <Section id="testimoni" spacing="lg" className="bg-linear-to-b from-transparent via-white/[0.015] to-transparent">
      <Container>
        <SectionHeading
          eyebrow={dict.testimonials.title}
          title={locale === 'en' ? dict.testimonials.title : page.testimonialsTitle ?? dict.testimonials.title}
          description={dict.testimonials.description}
        />

        <div className="mx-auto max-w-3xl">
          <GlassCard glow className="relative overflow-hidden p-8 sm:p-12">
            <Quote className="absolute top-6 right-6 size-12 text-blue/15" aria-hidden="true" />
            <blockquote key={current.id ?? index} className="relative slide-fade">
                <p className="font-display text-xl leading-relaxed text-balance italic sm:text-2xl">
                  “{current.quote}”
                </p>
                <footer className="mt-7 flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-blue/15 font-display text-lg text-blue-hover">
                    {current.name?.charAt(0) ?? '?'}
                  </span>
                  <div>
                    <cite className="block text-sm font-semibold not-italic">{current.name}</cite>
                    <span className="text-xs text-muted-foreground">
                      {dict.testimonials.roles[current.role as keyof typeof dict.testimonials.roles] ?? current.role}
                    </span>
                  </div>
                </footer>
            </blockquote>
          </GlassCard>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="glass" size="icon" onClick={prev} aria-label={dict.testimonials.prev}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex gap-2" role="tablist" aria-label={dict.testimonials.pilih}>
              {items.map((item, i) => (
                <button
                  key={item.id ?? i}
                  type="button"
                  role="tab"
                  aria-selected={i === index % items.length}
                  aria-label={`Testimoni ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="grid h-6 min-w-6 cursor-pointer place-items-center"
                >
                  <span
                    className={
                      i === index % items.length
                        ? 'h-2 w-8 rounded-full bg-blue transition-all'
                        : 'h-2 w-2 rounded-full bg-white/20 transition-all hover:bg-white/40'
                    }
                  />
                </button>
              ))}
            </div>
            <Button variant="glass" size="icon" onClick={next} aria-label={dict.testimonials.next}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
