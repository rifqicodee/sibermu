import crypto from 'crypto'
import type { CollectionConfig } from 'payload'

import { adminOnly, anyone, fieldAdminOnly } from '../access'

const noPublicCreate = { create: () => false as const }

const generateTrackingCode = (): string => {
  const now = new Date()
  const y = String(now.getFullYear()).slice(-2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `USM${y}${m}${d}-${rand}`
}

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    group: 'PMB',
    useAsTitle: 'trackingCode',
    defaultColumns: ['trackingCode', 'studentName', 'targetProdi', 'status', 'submittedAt'],
    description: 'Calon mahasiswa baru yang mendaftar lewat website.',
  },
  access: {
    read: adminOnly,
    create: anyone,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data && !data.trackingCode) data.trackingCode = generateTrackingCode()
        return data
      },
    ],
  },
  fields: [
    {
      name: 'trackingCode',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar' },
      access: { create: noPublicCreate.create, update: fieldAdminOnly },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'submitted',
      options: [
        { label: 'Terkirim', value: 'submitted' },
        { label: 'Terverifikasi', value: 'verified' },
        { label: 'Diterima', value: 'accepted' },
        { label: 'Ditolak', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
      access: { create: noPublicCreate.create, update: fieldAdminOnly },
    },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
      access: { create: noPublicCreate.create, update: fieldAdminOnly },
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Data Calon Mahasiswa',
          fields: [
            { name: 'studentName', type: 'text', label: 'Nama Lengkap', required: true },
            { name: 'email', type: 'email', label: 'Email', required: true },
            { name: 'phone', type: 'text', label: 'No. HP', required: true },
            { name: 'nik', type: 'text', label: 'NIK', required: true, minLength: 16, maxLength: 16 },
            { name: 'nisn', type: 'text', label: 'NISN (opsional)' },
            {
              name: 'gender',
              type: 'select',
              label: 'Jenis Kelamin',
              required: true,
              options: [
                { label: 'Laki-laki', value: 'l' },
                { label: 'Perempuan', value: 'p' },
              ],
            },
            { name: 'birthPlace', type: 'text', label: 'Tempat Lahir', required: true },
            { name: 'birthDate', type: 'date', label: 'Tanggal Lahir', required: true },
            { name: 'previousSchool', type: 'text', label: 'Asal SMA/SMK/MA', required: true },
            { name: 'graduationYear', type: 'number', label: 'Tahun Lulus', required: true },
            { name: 'address', type: 'textarea', label: 'Alamat', required: true },
          ],
        },
        {
          label: 'Data Orang Tua',
          fields: [
            { name: 'fatherName', type: 'text', label: 'Nama Ayah', required: true },
            { name: 'fatherJob', type: 'text', label: 'Pekerjaan Ayah' },
            { name: 'motherName', type: 'text', label: 'Nama Ibu', required: true },
            { name: 'motherJob', type: 'text', label: 'Pekerjaan Ibu' },
            { name: 'parentPhone', type: 'text', label: 'No. HP Orang Tua', required: true },
            { name: 'parentEmail', type: 'email', label: 'Email Orang Tua' },
          ],
        },
        {
          label: 'Pilihan Program Studi',
          fields: [
            { name: 'targetProdi', type: 'relationship', relationTo: 'prodi', label: 'Program Studi Tujuan', required: true },
            {
              name: 'track',
              type: 'select',
              label: 'Jalur Masuk',
              required: true,
              defaultValue: 'mandiri',
              options: [
                { label: 'SNBP (Seleksi Nasional Berbasis Prestasi)', value: 'snbp' },
                { label: 'SNBT (Seleksi Nasional Berbasis Tes)', value: 'snbt' },
                { label: 'Mandiri', value: 'mandiri' },
                { label: 'Afirmasi', value: 'afirmasi' },
                { label: 'Prestasi', value: 'prestasi' },
                { label: 'Perpindahan Transfer', value: 'transfer' },
              ],
            },
            { name: 'notes', type: 'textarea', label: 'Catatan (opsional)' },
          ],
        },
        {
          label: 'Dokumen',
          fields: [
            {
              name: 'documents',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Akta Kelahiran', value: 'akta' },
                    { label: 'Kartu Keluarga', value: 'kk' },
                    { label: 'Rapor / Transkrip Terakhir', value: 'rapor' },
                    { label: 'Pas Foto 3x4', value: 'pasfoto' },
                    { label: 'SKL / Surat Keterangan Lulus', value: 'skl' },
                    { label: 'Dokumen Lainnya', value: 'lainnya' },
                  ],
                },
                { name: 'file', type: 'relationship', relationTo: 'pmb-documents', required: true },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Catatan Admin',
      access: { create: noPublicCreate.create, update: fieldAdminOnly },
    },
  ],
}
