import type { CollectionConfig } from 'payload'

import { adminOnly, anyone } from '../access'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: { group: 'Sistem', useAsTitle: 'email', defaultColumns: ['email', 'source', 'subscribedAt'] },
  access: {
    read: adminOnly,
    create: anyone,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data && !data.subscribedAt) data.subscribedAt = new Date().toISOString()
        return data
      },
    ],
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'footer',
      options: [
        { label: 'Footer', value: 'footer' },
        { label: 'Pengumuman', value: 'announcement' },
        { label: 'Acara', value: 'event' },
        { label: 'Lainnya', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'subscribedAt', type: 'date', defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar' } },
    { name: 'notes', type: 'textarea', admin: { readOnly: true } },
  ],
}
