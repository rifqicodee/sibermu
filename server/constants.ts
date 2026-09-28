export const CONTENT_TAG = 'content'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const SITE_NAME = 'Universitas Siber Muhammadiyah'

type NavChild = { label: string; labelEn?: string; href: string; description?: string }
type NavItem = { label: string; labelEn?: string; href: string; children: NavChild[] }

export const NAV_FALLBACK: NavItem[] = [
  { label: 'Beranda', labelEn: 'Home', href: '/', children: [] },
  {
    label: 'Profil',
    labelEn: 'Profile',
    href: '/tentang',
    children: [
      { label: 'Sejarah & Legalitas', labelEn: 'History & Legal', href: '/tentang#sejarah', description: 'Perjalanan dan akreditasi kampus' },
      { label: 'Visi & Misi', labelEn: 'Vision & Mission', href: '/tentang#visi', description: 'Arah dan tujuan universitas' },
      { label: 'Rektorat & Struktur', labelEn: 'Rectorate', href: '/tentang#rektor', description: 'Pimpinan dan struktur organisasi' },
      { label: 'Akreditasi & Kampus', labelEn: 'Accreditation', href: '/tentang#akreditasi', description: 'Izin operasional dan fasilitas' },
    ],
  },
  {
    label: 'Akademik',
    labelEn: 'Academics',
    href: '/akademik',
    children: [
      { label: 'Kalender Akademik', labelEn: 'Academic Calendar', href: '/akademik#kalender', description: 'Jadwal kuliah, ujian, dan libur' },
      { label: 'Kurikulum & RPS', labelEn: 'Curriculum', href: '/akademik#kurikulum', description: 'Struktur kurikulum berbasis outcome' },
      { label: 'Layanan Akademik', labelEn: 'Academic Services', href: '/akademik#layanan', description: 'KRS, nilai, dan administrasi' },
      { label: 'Dosen', labelEn: 'Lecturers', href: '/dosen', description: 'Tenaga pengajar profesional' },
    ],
  },
  {
    label: 'Fakultas',
    labelEn: 'Faculties',
    href: '/fakultas',
    children: [
      { label: 'Ilmu Komputer', labelEn: 'Computer Science', href: '/fakultas#ilmu-komputer', description: 'Informatika, sistem informasi, ilmu data' },
      { label: 'Ekonomi & Bisnis', labelEn: 'Economics & Business', href: '/fakultas#ekonomi-bisnis', description: 'Manajemen, akuntansi, bisnis digital' },
      { label: 'Teknik', labelEn: 'Engineering', href: '/fakultas#teknik', description: 'Elektro, industri, mesin' },
      { label: 'Sosial & Politik', labelEn: 'Social & Political', href: '/fakultas#sosial-politik', description: 'Ilmu komunikasi, hubungan internasional' },
      { label: 'Ilmu Kesehatan', labelEn: 'Health Sciences', href: '/fakultas#ilmu-kesehatan', description: 'Keperawatan, gizi, administrasi RS' },
      { label: 'Agama Islam', labelEn: 'Islamic Studies', href: '/fakultas#agama-islam', description: 'PAI dan komunikasi dakwah' },
    ],
  },
  {
    label: 'Program Studi',
    labelEn: 'Study Programs',
    href: '/program',
    children: [
      { label: 'Semua Program Studi', labelEn: 'All Programs', href: '/program', description: 'Jelajahi seluruh prodi' },
      { label: 'Jenjang S1', labelEn: "Bachelor's", href: '/program?jenjang=S1', description: 'Program sarjana' },
      { label: 'Jenjang S2', labelEn: "Master's", href: '/program?jenjang=S2', description: 'Program magister' },
      { label: 'Jenjang D3', labelEn: 'Diploma', href: '/program?jenjang=D3', description: 'Program diploma' },
    ],
  },
  {
    label: 'PMB',
    labelEn: 'Admissions',
    href: '/pmb',
    children: [
      { label: 'Alur Pendaftaran', labelEn: 'How to Apply', href: '/pmb#alur', description: 'Langkah demi langkah' },
      { label: 'Persyaratan', labelEn: 'Requirements', href: '/pmb#persyaratan', description: 'Dokumen dan kualifikasi' },
      { label: 'Biaya & Beasiswa', labelEn: 'Fees & Scholarships', href: '/pmb#biaya', description: 'Transparansi pendidikan' },
      { label: 'Formulir Online', labelEn: 'Online Form', href: '/pmb#daftar', description: 'Daftar sekarang secara online' },
    ],
  },
  {
    label: 'Penelitian',
    labelEn: 'Research',
    href: '/penelitian',
    children: [
      { label: 'Hibah & Karya', labelEn: 'Grants & Works', href: '/penelitian#hibah', description: 'Penelitian dan pengabdian dosen' },
      { label: 'Jurnal & Repository', labelEn: 'Journals', href: '/penelitian', description: 'Publikasi ilmiah kampus' },
    ],
  },
  {
    label: 'Karir',
    labelEn: 'Career',
    href: '/karir',
    children: [
      { label: 'Magang & Industri', labelEn: 'Internship', href: '/karir#magang', description: 'Kolaborasi dengan mitra industri' },
      { label: 'Alumni', labelEn: 'Alumni', href: '/karir#alumni', description: 'Jejaring lulusan' },
    ],
  },
  { label: 'Berita', labelEn: 'News', href: '/berita', children: [] },
]

export const FOOTER_FALLBACK = {
  description:
    'Universitas digital Muhammadiyah — merdeka belajar, berkemajuan, dan siap kerja.',
  descriptionEn:
    'Muhammadiyah digital university — freedom to learn, progress, and career ready.',
  copyright: '© 2026 Universitas Siber Muhammadiyah. Seluruh hak cipta dilindungi.',
  columns: [
    {
      title: 'Akademik',
      titleEn: 'Academics',
      links: [
        { label: 'Fakultas', labelEn: 'Faculties', href: '/fakultas' },
        { label: 'Program Studi', labelEn: 'Study Programs', href: '/program' },
        { label: 'Dosen', labelEn: 'Lecturers', href: '/dosen' },
        { label: 'Kalender Akademik', labelEn: 'Academic Calendar', href: '/akademik#kalender' },
      ],
    },
    {
      title: 'Informasi',
      titleEn: 'Information',
      links: [
        { label: 'Profil', labelEn: 'Profile', href: '/tentang' },
        { label: 'Berita', labelEn: 'News', href: '/berita' },
        { label: 'Penelitian', labelEn: 'Research', href: '/penelitian' },
        { label: 'Prestasi', labelEn: 'Achievements', href: '/prestasi' },
        { label: 'Galeri', labelEn: 'Gallery', href: '/galeri' },
      ],
    },
    {
      title: 'Layanan',
      titleEn: 'Services',
      links: [
        { label: 'LMS', labelEn: 'LMS', href: '/akademik' },
        { label: 'Repository', labelEn: 'Repository', href: '/penelitian' },
        { label: 'Perpustakaan', labelEn: 'Library', href: '/tentang' },
        { label: 'Portal Mahasiswa', labelEn: 'Student Portal', href: '/akademik' },
      ],
    },
    {
      title: 'PMB',
      titleEn: 'Admissions',
      links: [
        { label: 'Pendaftaran', labelEn: 'Registration', href: '/pmb' },
        { label: 'Biaya & Beasiswa', labelEn: 'Fees & Scholarships', href: '/pmb#biaya' },
        { label: 'FAQ', labelEn: 'FAQ', href: '/faq' },
        { label: 'Kontak', labelEn: 'Contact', href: '/kontak' },
      ],
    },
  ],
}
