import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Sistem' },
  access: {
    read: anyone,
    update: adminOnly,
  },
  hooks: revalidateHook,
  fields: [
    { name: 'description', type: 'textarea', label: 'Deskripsi (ID)', defaultValue: 'Universitas digital Muhammadiyah — merdeka belajar, berkemajuan, dan siap kerja.' },
    { name: 'descriptionEn', type: 'textarea', label: 'Deskripsi (EN)' },
    { name: 'copyright', type: 'text', defaultValue: '© 2026 Universitas Siber Muhammadiyah. Seluruh hak cipta dilindungi.' },
    { name: 'columns', type: 'array', admin: { initCollapsed: true }, fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'titleEn', type: 'text' },
      { name: 'links', type: 'array', admin: { initCollapsed: true }, fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'labelEn', type: 'text' },
        { name: 'href', type: 'text', required: true },
      ] },
    ] },
  ],
}
