import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { Section } from '@/components/shared/section'
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'

type ComingSoonProps = {
  locale: Locale
  title: string
}

export function ComingSoon({ locale, title }: ComingSoonProps) {
  const dict = getDictionary(locale)

  return (
    <Section spacing="lg" className="pt-40">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-blue-accent text-blue">
          <Construction className="size-7" aria-hidden="true" />
        </span>
        <p className="label-caps">{dict.common.segeraHadir}</p>
        <h1 className="max-w-2xl font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {dict.stub.description}
        </p>
        <Button asChild variant="blue" size="xl">
          <Link href={localise('/', locale)}>
            <ArrowLeft aria-hidden="true" />
            {dict.stub.backHome}
          </Link>
        </Button>
      </Container>
    </Section>
  )
}
