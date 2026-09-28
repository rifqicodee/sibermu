import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const Faculties: CollectionConfig = {
  slug: 'faculties',
  admin: { group: 'Akademik', useAsTitle: 'name', defaultColumns: ['name', 'dean', 'code', 'featured'] },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  defaultPopulate: {
    slug: true,
    name: true,
    code: true,
    dean: true,
    cover: true,
    logo: true,
    featured: true,
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
    { name: 'code', type: 'text', label: 'Kode Fakultas', unique: true, admin: { position: 'sidebar', description: 'mis. FIK, FEB, FTI' } },
    { name: 'dean', type: 'text', label: 'Nama Dekan' },
    { name: 'establishedYear', type: 'number', label: 'Tahun Berdiri' },
    {
      name: 'accreditation',
      type: 'select',
      label: 'Akreditasi',
      defaultValue: 'Baik',
      options: [
        { label: 'Unggul', value: 'Unggul' },
        { label: 'Baik Sekali', value: 'Baik Sekali' },
        { label: 'Baik', value: 'Baik' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', label: 'Ringkasan', required: true },
    { name: 'vision', type: 'textarea', label: 'Visi' },
    { name: 'mission', type: 'array', label: 'Misi', admin: { initCollapsed: true }, fields: [
      { name: 'item', type: 'textarea', required: true },
    ] },
    { name: 'history', type: 'richText', label: 'Sejarah' },
    { name: 'labs', type: 'array', label: 'Laboratorium & Fasilitas', admin: { initCollapsed: true }, fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ] },
    { name: 'address', type: 'textarea' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'logo', type: 'relationship', relationTo: 'media' },
    { name: 'cover', type: 'relationship', relationTo: 'media' },
    { name: 'gallery', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'prodi', type: 'join', collection: 'prodi', on: 'faculty' },
    { name: 'dosen', type: 'join', collection: 'dosen', on: 'faculty' },
    { name: 'news', type: 'join', collection: 'news', on: 'faculty' },
  ],
}
