import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'
import { slugify } from '../../lib/slug'

export const Prodi: CollectionConfig = {
  slug: 'prodi',
  admin: { group: 'Akademik', useAsTitle: 'title', defaultColumns: ['title', 'code', 'degree', 'faculty', 'featured'] },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  defaultPopulate: {
    slug: true,
    title: true,
    code: true,
    degree: true,
    faculty: true,
    excerpt: true,
    cover: true,
    featured: true,
  },
  hooks: {
    ...revalidateHook,
    beforeChange: [
      async ({ data }) => {
        if (data?.title && !data.slug) data.slug = slugify(data.title)
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'code', type: 'text', label: 'Kode Prodi', admin: { position: 'sidebar', description: 'mis. 61201' } },
    {
      name: 'degree',
      type: 'select',
      label: 'Jenjang',
      required: true,
      defaultValue: 'S1',
      options: [
        { label: 'D3 (Diploma Tiga)', value: 'D3' },
        { label: 'S1 (Sarjana)', value: 'S1' },
        { label: 'S2 (Magister)', value: 'S2' },
        { label: 'S3 (Doktor)', value: 'S3' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'faculty', type: 'relationship', relationTo: 'faculties', required: true, admin: { position: 'sidebar' } },
    {
      name: 'accreditation',
      type: 'select',
      label: 'Akreditasi Prodi',
      defaultValue: 'Unggul',
      options: [
        { label: 'Unggul', value: 'Unggul' },
        { label: 'Baik Sekali', value: 'Baik Sekali' },
        { label: 'Baik', value: 'Baik' },
        { label: 'Tidak Terakreditasi', value: 'Tidak Terakreditasi' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'duration', type: 'number', label: 'Durasi (semester)', defaultValue: 8, admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', label: 'Ringkasan', required: true },
    { name: 'overview', type: 'richText', label: 'Gambaran Umum' },
    { name: 'highlights', type: 'array', label: 'Highlight', admin: { initCollapsed: true }, fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'value', type: 'text', required: true },
    ] },
    { name: 'prospects', type: 'array', label: 'Prospek Karier', admin: { initCollapsed: true }, fields: [
      { name: 'career', type: 'text', required: true },
    ] },
    { name: 'featuredCourses', type: 'array', label: 'Mata Kuliah Unggulan', admin: { initCollapsed: true }, fields: [
      { name: 'course', type: 'text', required: true },
    ] },
    { name: 'benefits', type: 'array', admin: { initCollapsed: true }, fields: [
      { name: 'benefit', type: 'text', required: true },
    ] },
    { name: 'requirements', type: 'textarea', label: 'Persyaratan Masuk' },
    { name: 'cover', type: 'relationship', relationTo: 'media' },
    { name: 'gallery', type: 'relationship', relationTo: 'media', hasMany: true },
  ],
}
