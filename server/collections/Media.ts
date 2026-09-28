import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Konten',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOnly,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 320, height: 320, position: 'centre' },
      { name: 'card', width: 800, position: 'centre' },
      { name: 'hero', width: 1920, position: 'centre' },
    ],
  },
  hooks: revalidateHook,
  fields: [
    { name: 'alt', type: 'text', required: true, admin: { description: 'Deskripsi gambar untuk aksesibilitas & SEO' } },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text', label: 'Kredit' },
  ],
}
