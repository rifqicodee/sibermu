import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigasi',
  admin: { group: 'Sistem' },
  access: {
    read: anyone,
    update: adminOnly,
  },
  hooks: revalidateHook,
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      admin: { description: 'Menu utama. Kolom kedua membentuk mega menu.', initCollapsed: false },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'Label bahasa Indonesia' } },
        { name: 'labelEn', type: 'text', admin: { description: 'Label bahasa Inggris (opsional — kosongkan untuk fallback)' } },
        { name: 'href', type: 'text', required: true },
        {
          name: 'children',
          type: 'array',
          admin: { description: 'Kosongkan jika item adalah link biasa.' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'labelEn', type: 'text' },
            { name: 'href', type: 'text', required: true },
            { name: 'description', type: 'text' },
            { name: 'descriptionEn', type: 'text' },
          ],
        },
      ],
    },
  ],
}
