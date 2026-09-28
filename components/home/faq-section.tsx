import { Container } from '@/components/shared/container'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Faq } from '@/server/payload-types'
import type { Homepage } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'

const categoryLabels: Record<string, { id: string; en: string }> = {
  umum: { id: 'Umum', en: 'General' },
  pmb: { id: 'PMB', en: 'Admissions' },
  program: { id: 'Program', en: 'Program' },
  akademik: { id: 'Akademik', en: 'Academic' },
  biaya: { id: 'Biaya', en: 'Fees' },
}

const fallbackFaqs = [
  {
    id: 'f1',
    question: 'Bagaimana cara mendaftar sebagai mahasiswa baru?',
    answer:
      'Pendaftaran dilakukan secara daring melalui halaman PMB. Isi formulir, unggah dokumen, lalu pantau status pendaftaran menggunakan kode tracking yang diberikan.',
    category: 'pmb',
  },
  {
    id: 'f2',
    question: 'Apakah tersedia beasiswa atau keringanan biaya?',
    answer:
      'Ya. Tersedia beasiswa prestasi akademik, beasiswa ekonomi, dan keringanan biaya dari Yayasan Pendidikan Muhammadiyah.',
    category: 'biaya',
  },
  {
    id: 'f3',
    question: 'Program studi apa saja yang tersedia?',
    answer:
      'Tersedia 20 program studi di enam fakultas, mulai dari jenjang D3 hingga S2 — dapat dilihat lengkap di halaman Program Studi.',
    category: 'program',
  },
] as unknown as Faq[]

type FaqSectionProps = {
  page: Homepage
  faqs: Faq[]
  locale: Locale
}

export function FaqSection({ page, faqs, locale }: FaqSectionProps) {
  const dict = getDictionary(locale)
  const items = faqs.length ? faqs : fallbackFaqs

  return (
    <Section id="faq" spacing="lg">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={locale === 'en' ? dict.faq.title : page.faqTitle ?? dict.faq.title}
          description={dict.faq.description}
        />

        <Reveal>
          <Accordion type="single" collapsible className="glass rounded-card px-6 sm:px-8">
            {items.map((faq) => (
              <AccordionItem key={faq.id} value={String(faq.id)} className="border-white/8">
                <AccordionTrigger className="py-5 text-left font-medium hover:text-blue-hover">
                  <span className="pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  <span className="label-caps mb-2 block text-[0.6rem] opacity-70">
                    {locale === 'en'
                      ? (categoryLabels[faq.category ?? 'umum']?.en ?? faq.category)
                      : (categoryLabels[faq.category ?? 'umum']?.id ?? faq.category)}
                  </span>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  )
}
