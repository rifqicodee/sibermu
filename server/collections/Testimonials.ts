import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { group: 'Konten', useAsTitle: 'name' },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  hooks: revalidateHook,
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'siswa',
      options: [
        { label: 'Siswa', value: 'siswa' },
        { label: 'Orang Tua', value: 'orangtua' },
        { label: 'Guru', value: 'guru' },
        { label: 'Alumni', value: 'alumni' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'faculty', type: 'relationship', relationTo: 'faculties', label: 'Fakultas', admin: { position: 'sidebar' } },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'photo', type: 'relationship', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
