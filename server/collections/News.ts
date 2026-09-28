import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const News: CollectionConfig = {
  slug: 'news',
  admin: { group: 'Konten', useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt'] },
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
    category: true,
    publishedAt: true,
    featured: true,
    author: true,
    faculty: true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    ...revalidateHook,
    beforeChange: [
      async ({ data }) => {
        if (data?.title && !data.slug) data.slug = slugify(data.title)
        if (!data?.publishedAt) data.publishedAt = new Date().toISOString()
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true, admin: { position: 'sidebar' } },
    { name: 'faculty', type: 'relationship', relationTo: 'faculties', label: 'Fakultas', admin: { position: 'sidebar', description: 'Opsional: berita terkait fakultas tertentu' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'cover', type: 'relationship', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date', required: true },
    { name: 'content', type: 'richText', required: true },
  ],
}
