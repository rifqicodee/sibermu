import type { CollectionConfig } from 'payload'

import { adminOnly, anyone } from '../access'

/**
 * Public upload target for PMB application documents.
 * Read is admin-only because files contain personal data.
 */
export const PpdbDocuments: CollectionConfig = {
  slug: 'pmb-documents',
  access: {
    read: adminOnly,
    create: anyone,
    update: () => false,
    delete: adminOnly,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if (operation === 'create' && req?.file && req.file.size > 5 * 1024 * 1024) {
          throw new Error('Ukuran file maksimal 5MB')
        }
      },
    ],
  },
  upload: {
    staticDir: 'pmb-documents',
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
  },
  fields: [
    { name: 'label', type: 'text', required: true },
  ],
  admin: {
    hidden: true,
    group: 'PMB',
  },
}
