import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: { group: 'Sistem' },
  access: {
    read: anyone,
    update: adminOnly,
  },
  hooks: revalidateHook,
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Universitas Siber Muhammadiyah' },
    { name: 'tagline', type: 'text', defaultValue: 'Kampus Digital untuk Generasi Berkemajuan' },
    { type: 'tabs', tabs: [
      {
        label: 'Kontak',
        fields: [
          { name: 'email', type: 'email' },
          { name: 'phone', type: 'text' },
          { name: 'whatsapp', type: 'text', admin: { description: 'Format internasional, mis. 6281234567890' } },
          { name: 'address', type: 'textarea' },
          { name: 'mapsUrl', type: 'text' },
          { name: 'mapsEmbedUrl', type: 'text' },
        ],
      },
      {
        label: 'Statistik',
        fields: [
          { name: 'faculties', type: 'number', defaultValue: 6, label: 'Jumlah Fakultas' },
          { name: 'programs', type: 'number', defaultValue: 18, label: 'Jumlah Prodi' },
          { name: 'lecturers', type: 'number', defaultValue: 320, label: 'Jumlah Dosen' },
          { name: 'students', type: 'number', defaultValue: 4200, label: 'Jumlah Mahasiswa' },
          { name: 'employmentRate', type: 'number', defaultValue: 92, label: 'Lulusan Bekerja (%)' },
          { name: 'partners', type: 'number', defaultValue: 85, label: 'Mitra Industri' },
          { name: 'years', type: 'number', defaultValue: 65, label: 'Tahun Pengabdian' },
        ],
      },
      {
        label: 'Hero & Notifikasi',
        fields: [
          { name: 'notificationEnabled', type: 'checkbox', defaultValue: true },
          { name: 'notificationText', type: 'text', defaultValue: 'mahasiswa sedang belajar sekarang' },
          { name: 'notificationCount', type: 'number', defaultValue: 126 },
        ],
      },
      {
        label: 'PMB',
        fields: [
          { name: 'admissionOpen', type: 'checkbox', defaultValue: true },
          { name: 'admissionTitle', type: 'text', defaultValue: 'Penerimaan Mahasiswa Baru' },
          { name: 'admissionDeadline', type: 'date', label: 'Batas Akhir Pendaftaran', defaultValue: '2027-06-30T23:59:00.000Z', admin: { description: 'Dipakai countdown di bar pengumuman.' } },
          { name: 'admissionWave', type: 'text', defaultValue: 'Gelombang 1 – 30 Juni 2027' },
          { name: 'admissionBrochureUrl', type: 'text' },
        ],
      },
      {
        label: 'Media Sosial',
        fields: [
          { name: 'socials', type: 'array', admin: { initCollapsed: true }, fields: [
            { name: 'platform', type: 'select', required: true, options: [
              { label: 'Instagram', value: 'instagram' },
              { label: 'Facebook', value: 'facebook' },
              { label: 'X / Twitter', value: 'x' },
              { label: 'YouTube', value: 'youtube' },
              { label: 'TikTok', value: 'tiktok' },
              { label: 'Telegram', value: 'telegram' },
              { label: 'WhatsApp', value: 'whatsapp' },
            ] },
            { name: 'url', type: 'text', required: true },
          ] },
        ],
      },
    ] },
  ],
}
