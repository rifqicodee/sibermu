import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const Dosen: CollectionConfig = {
  slug: 'dosen',
  admin: { group: 'Akademik', useAsTitle: 'name', defaultColumns: ['name', 'title', 'faculty', 'featured'] },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  defaultPopulate: {
    slug: true,
    name: true,
    title: true,
    photo: true,
    faculty: true,
    prodi: true,
    featured: true,
    expertise: true,
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
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'title', type: 'text', label: 'Gelar', required: true, admin: { description: 'mis. "S.Kom., M.T."', position: 'sidebar' } },
    { name: 'nip', type: 'text', label: 'NIP' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'faculty', type: 'relationship', relationTo: 'faculties', required: true, admin: { position: 'sidebar' } },
    { name: 'prodi', type: 'relationship', relationTo: 'prodi', label: 'Prodi Utama', admin: { position: 'sidebar' } },
    { name: 'photo', type: 'relationship', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'email', type: 'email' },
    { name: 'expertise', type: 'array', label: 'Bidang Keahlian', admin: { initCollapsed: true }, fields: [
      { name: 'field', type: 'text', required: true },
    ] },
    { name: 'education', type: 'array', admin: { initCollapsed: true }, fields: [
      { name: 'degree', type: 'text', required: true },
      { name: 'institution', type: 'text', required: true },
      { name: 'year', type: 'text' },
    ] },
    { name: 'experience', type: 'array', admin: { initCollapsed: true }, fields: [
      { name: 'role', type: 'text', required: true },
      { name: 'institution', type: 'text', required: true },
      { name: 'period', type: 'text', admin: { description: 'mis. 2019 – Sekarang' } },
    ] },
    { name: 'publications', type: 'array', label: 'Publikasi', admin: { initCollapsed: true }, fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'year', type: 'text' },
    ] },
  ],
}
