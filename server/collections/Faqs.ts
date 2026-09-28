import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: { group: 'Konten', useAsTitle: 'question', defaultColumns: ['question', 'category', 'showOnHomepage'] },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  hooks: revalidateHook,
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'umum',
      options: [
        { label: 'Umum', value: 'umum' },
        { label: 'PMB', value: 'pmb' },
        { label: 'Program', value: 'program' },
        { label: 'Akademik', value: 'akademik' },
        { label: 'Biaya', value: 'biaya' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'showOnHomepage', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
