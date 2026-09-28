import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const Achievements: CollectionConfig = {
  slug: 'achievements',
  admin: { group: 'Konten', useAsTitle: 'title', defaultColumns: ['title', 'year', 'scope'] },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  hooks: {
    ...revalidateHook,
    beforeChange: [
      async ({ data }) => {
        if (data?.title && !data.slug) data.slug = slugify(data.title)
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'year', type: 'number', required: true, admin: { position: 'sidebar' } },
    {
      name: 'scope',
      type: 'select',
      required: true,
      defaultValue: 'nasional',
      options: [
        { label: 'Internasional', value: 'internasional' },
        { label: 'Nasional', value: 'nasional' },
        { label: 'Provinsi', value: 'provinsi' },
        { label: 'Kota/Kabupaten', value: 'kota' },
        { label: 'Sekolah', value: 'sekolah' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'category', type: 'select', options: [
      { label: 'Akademik', value: 'akademik' },
      { label: 'Olahraga', value: 'olahraga' },
      { label: 'Seni', value: 'seni' },
      { label: 'Teknologi', value: 'teknologi' },
      { label: 'Keagamaan', value: 'keagamaan' },
    ] },
    { name: 'faculty', type: 'relationship', relationTo: 'faculties', label: 'Fakultas' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'relationship', relationTo: 'media' },
    { name: 'icon', type: 'text', admin: { description: 'Nama ikon Lucide, mis. Trophy' } },
  ],
}
