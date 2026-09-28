import type { CollectionConfig } from 'payload'

import { adminOnly, fieldAdminOnly, fieldAdminOrEditor, staffOnly } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Sistem',
  },
  access: {
    read: staffOnly,
    create: adminOnly,
    update: ({ req, id }) => adminOnly({ req }) || req.user?.id === id,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Penulis', value: 'author' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        update: fieldAdminOrEditor,
        create: fieldAdminOnly,
      },
    },
  ],
}
