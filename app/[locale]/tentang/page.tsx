import type { Metadata } from 'next'

import { ComingSoon } from '@/components/shared/coming-soon'
import { getDictionary } from '@/lib/i18n/messages'
import { isLocale } from '@/lib/i18n/config'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'id')
  return { title: 'Profil Universitas', description: dict.stub.description }
}

export default async function Page({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) return null
  return <ComingSoon locale={locale} title={'Profil Universitas'} />
}
