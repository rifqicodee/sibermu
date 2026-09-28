import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { group: 'Konten', useAsTitle: 'name' },
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
        if (data?.name && !data.slug) data.slug = slugify(data.name)
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'description', type: 'textarea' },
  ],
}
