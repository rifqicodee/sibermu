import type { CollectionConfig } from 'payload'

import { adminOnly, anyone, fieldAdminOnly } from '../access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    group: 'PPDB',
    useAsTitle: 'name',
    description: 'Pesan dari formulir kontak website.',
  },
  access: {
    read: adminOnly,
    create: anyone,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'baru',
      options: [
        { label: 'Baru', value: 'baru' },
        { label: 'Dibaca', value: 'dibaca' },
        { label: 'Dibalas', value: 'dibalas' },
      ],
      admin: { position: 'sidebar' },
      access: { create: () => false as const, update: fieldAdminOnly },
    },
  ],
}
