import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '../access'
import { revalidateHook } from '../hooks/revalidate'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: { group: 'Sistem' },
  access: {
    read: anyone,
    update: adminOnly,
  },
  hooks: revalidateHook,
  fields: [
    { type: 'tabs', tabs: [
      {
        label: 'Hero',
        fields: [
          { name: 'eyebrow', type: 'text', defaultValue: 'Universitas Digital Muhammadiyah' },
          { name: 'titleLine1', type: 'text', required: true, defaultValue: 'Belajar Merdeka' },
          { name: 'titleLine2', type: 'text', required: true, defaultValue: 'Berkemajuan Bersama' },
          { name: 'subtitle', type: 'textarea', defaultValue: 'Universitas digital Muhammadiyah yang memadukan akhlak mulia, teknologi, dan kesiapan kerja untuk generasi penerus peradaban.' },
          { name: 'primaryCta', type: 'group', fields: [
            { name: 'label', type: 'text', defaultValue: 'Daftar Sekarang' },
            { name: 'href', type: 'text', defaultValue: '/pmb' },
          ] },
          { name: 'secondaryCta', type: 'group', fields: [
            { name: 'label', type: 'text', defaultValue: 'Lihat Program Studi' },
            { name: 'href', type: 'text', defaultValue: '/program' },
          ] },
        ],
      },
      {
        label: 'Akses Cepat',
        fields: [
          { name: 'quickAccessTitle', type: 'text', defaultValue: 'Akses Cepat' },
          {
            name: 'quickAccess',
            type: 'array',
            defaultValue: [
              { label: 'LMS', href: '/akademik', description: 'Kelas daring, tugas, dan materi kuliah.', icon: 'MonitorPlay' },
              { label: 'Repository', href: '/penelitian', description: 'Skripsi, jurnal, dan publikasi dosen.', icon: 'LibraryBig' },
              { label: 'Kalender Akademik', href: '/akademik', description: 'Jadwal kuliah, ujian, dan libur.', icon: 'CalendarDays' },
              { label: 'Perpustakaan', href: '/tentang', description: 'Katalog digital dan peminjaman.', icon: 'BookOpenText' },
              { label: 'Beasiswa', href: '/pmb', description: 'Pendanaan dan bantuan biaya kuliah.', icon: 'GraduationCap' },
              { label: 'Portal Mahasiswa', href: '/akademik', description: 'KRS, nilai, dan administrasi online.', icon: 'IdCard' },
              { label: 'Virtual Tour', href: '/galeri', description: 'Jelajahi kampus secara virtual.', icon: 'MapPinned' },
              { label: 'Karir & Kemitraan', href: '/karir', description: 'Magang, industri, dan alumni.', icon: 'BriefcaseBusiness' },
            ],
            admin: { initCollapsed: true, description: 'Tampil sebagai 8 kartu di bawah hero.' },
            fields: [
              { name: 'label', type: 'text', required: true },
              { name: 'href', type: 'text', required: true },
              { name: 'description', type: 'text' },
              { name: 'icon', type: 'text', admin: { description: 'Nama ikon Lucide, mis. MonitorPlay' } },
            ],
          },
        ],
      },
      {
        label: 'Section Lainnya',
        fields: [
          { name: 'statsTitle', type: 'text', defaultValue: 'Kampus dalam Angka' },
          { name: 'statsSubtitle', type: 'textarea', defaultValue: 'Jejak pengabdian Muhammadiyah untuk pendidikan tinggi bangsa.' },
          { name: 'facultiesTitle', type: 'text', defaultValue: 'Fakultas & Program' },
          { name: 'facultiesSubtitle', type: 'textarea', defaultValue: 'Enam fakultas dengan program studi terakreditasi dan kurikulum berbasis industri.' },
          { name: 'programsTitle', type: 'text', defaultValue: 'Program Studi Unggulan' },
          { name: 'programsSubtitle', type: 'textarea', defaultValue: 'Dirancang bersama mitra industri untuk kesiapan kerja lulusan.' },
          { name: 'newsTitle', type: 'text', defaultValue: 'Berita & Wawasan' },
          { name: 'newsSubtitle', type: 'textarea', defaultValue: 'Kabar terbaru kampus, penelitian, dan komunitas mahasiswa.' },
          { name: 'eventsTitle', type: 'text', defaultValue: 'Agenda Terdekat' },
          { name: 'testimonialsTitle', type: 'text', defaultValue: 'Cerita Sivitas' },
          { name: 'campusTitle', type: 'text', defaultValue: 'Jelajahi Kampus Virtual' },
          { name: 'campusSubtitle', type: 'textarea', defaultValue: 'Lihat fasilitas dan lingkungan belajar kami secara interaktif.' },
          { name: 'faqTitle', type: 'text', defaultValue: 'Pertanyaan Umum' },
          { name: 'ctaTitle', type: 'text', defaultValue: 'Siap Bergabung dengan Universitas Siber Muhammadiyah?' },
          { name: 'ctaText', type: 'textarea', defaultValue: 'Jadilah bagian dari tradisi keunggulan pendidikan Muhammadiyah di era digital.' },
        ],
      },
    ] },
  ],
}
