import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { group: 'Konten', useAsTitle: 'title', defaultColumns: ['title', 'category', 'startsAt', 'featured'] },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  defaultPopulate: {
    slug: true,
    title: true,
    excerpt: true,
    cover: true,
    startsAt: true,
    endsAt: true,
    location: true,
    category: true,
    featured: true,
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
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true, position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'akademik',
      options: [
        { label: 'Akademik', value: 'akademik' },
        { label: 'Kemahasiswaan', value: 'kemahasiswaan' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Penerimaan Mahasiswa Baru', value: 'pmb' },
        { label: 'Penelitian', value: 'penelitian' },
        { label: 'Alumni', value: 'alumni' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'startsAt', type: 'date', required: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endsAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'location', type: 'text', admin: { description: 'mis. Auditorium Kampus / Zoom Meeting' } },
    { name: 'registrationUrl', type: 'text', label: 'Tautan Pendaftaran' },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'cover', type: 'relationship', relationTo: 'media' },
    { name: 'content', type: 'richText' },
  ],
}
