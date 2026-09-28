'use client'

import dynamic from 'next/dynamic'

const SearchDialog = dynamic(
  () => import('./search-dialog').then((m) => m.SearchDialog),
  { ssr: false },
)

type SearchDialogLazyProps = {
  locale: import('@/lib/i18n/config').Locale
  dict: import('@/lib/i18n/messages').Dictionary
}

/** Load pencarian (Fuse.js) setelah hydration — jauh dari critical path. */
export function SearchDialogLazy(props: SearchDialogLazyProps) {
  return <SearchDialog {...props} />
}
