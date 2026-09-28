import { getPayload, type Where } from 'payload'
import config from '@payload-config'

import { FOOTER_FALLBACK, NAV_FALLBACK } from '../constants'
import { slugify } from '../../lib/slug'
import type { Config } from '../payload-types'

const payload = await getPayload({ config })

type Collections = keyof Config['collections']

/** Cari berdasarkan where; update bila ada, create bila belum. */
async function upsert(collection: Collections, where: Where, data: Record<string, unknown>) {
  const { docs } = await payload.find({ collection, where, limit: 1 } as never)
  const existing = docs[0]
  if (existing) {
    const id = (existing as { id: string | number }).id
    await payload.update({ collection, id, data } as never)
    return id
  }
  const created = await payload.create({ collection, data } as never)
  return (created as { id: string | number }).id
}

function lexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph' as const,
        children: [{ type: 'text' as const, text, format: '' as const }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

/* ---------------------------------- users ---------------------------------- */

async function seedUsers() {
  const email = 'admin@sibermu.test'
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { name: 'Administrator', email, password: 'Admin123!', role: 'admin' },
    })
    console.log('✓ user admin dibuat (admin@sibermu.test / Admin123!)')
  } else {
    console.log('• user admin sudah ada, dilewati')
  }
}

/* --------------------------------- globals --------------------------------- */

async function seedGlobals() {
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Universitas Siber Muhammadiyah',
      tagline: 'Kampus Digital untuk Generasi Berkemajuan',
      email: 'halo@sibermu.test',
      phone: '(021) 555-0199',
      whatsapp: '6281234567890',
      address: 'Jl. K.H. Ahmad Dahlan No. 1, Jakarta Pusat, DKI Jakarta',
      mapsUrl: 'https://maps.google.com/?q=Jakarta',
      faculties: 6,
      programs: 20,
      lecturers: 320,
      students: 4200,
      employmentRate: 92,
      partners: 85,
      years: 65,
      notificationEnabled: true,
      notificationText: 'mahasiswa sedang belajar sekarang',
      notificationCount: 126,
      admissionOpen: true,
      admissionTitle: 'Penerimaan Mahasiswa Baru',
      admissionDeadline: '2027-06-30T23:59:00.000Z',
      admissionWave: 'Gelombang 1 – 30 Juni 2027',
      socials: [
        { platform: 'instagram', url: 'https://instagram.com/muhammadiyah' },
        { platform: 'youtube', url: 'https://youtube.com/@muhammadiyah' },
        { platform: 'x', url: 'https://x.com/muhammadiyah' },
        { platform: 'tiktok', url: 'https://tiktok.com/@muhammadiyah' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      eyebrow: 'Universitas Digital Muhammadiyah',
      titleLine1: 'Belajar Merdeka',
      titleLine2: 'Berkemajuan Bersama',
      subtitle:
        'Universitas digital Muhammadiyah yang memadukan akhlak mulia, teknologi, dan kesiapan kerja untuk generasi penerus peradaban.',
      primaryCta: { label: 'Daftar Sekarang', href: '/pmb' },
      quickAccess: [
        { label: 'LMS', href: '/akademik', description: 'Kelas daring, tugas, dan materi kuliah.', icon: 'MonitorPlay' },
        { label: 'Repository', href: '/penelitian', description: 'Skripsi, jurnal, dan publikasi dosen.', icon: 'LibraryBig' },
        { label: 'Kalender Akademik', href: '/akademik', description: 'Jadwal kuliah, ujian, dan libur.', icon: 'CalendarDays' },
        { label: 'Perpustakaan', href: '/tentang', description: 'Katalog digital dan peminjaman.', icon: 'BookOpenText' },
        { label: 'Beasiswa', href: '/pmb', description: 'Pendanaan dan bantuan biaya kuliah.', icon: 'GraduationCap' },
        { label: 'Portal Mahasiswa', href: '/akademik', description: 'KRS, nilai, dan administrasi online.', icon: 'IdCard' },
        { label: 'Virtual Tour', href: '/galeri', description: 'Jelajahi kampus secara virtual.', icon: 'MapPinned' },
        { label: 'Karir & Kemitraan', href: '/karir', description: 'Magang, industri, dan alumni.', icon: 'BriefcaseBusiness' },
      ],
      secondaryCta: { label: 'Lihat Program Studi', href: '/program' },
      statsTitle: 'Kampus dalam Angka',
      statsSubtitle: 'Jejak pengabdian Muhammadiyah untuk pendidikan tinggi bangsa.',
      facultiesTitle: 'Fakultas & Program',
      facultiesSubtitle: 'Enam fakultas dengan program studi terakreditasi dan kurikulum berbasis industri.',
      programsTitle: 'Program Studi Unggulan',
      programsSubtitle: 'Dirancang bersama mitra industri untuk kesiapan kerja lulusan.',
      newsTitle: 'Berita & Wawasan',
      newsSubtitle: 'Kabar terbaru kampus, penelitian, dan komunitas mahasiswa.',
      eventsTitle: 'Agenda Terdekat',
      testimonialsTitle: 'Cerita Sivitas',
      campusTitle: 'Jelajahi Kampus Virtual',
      campusSubtitle: 'Lihat fasilitas dan lingkungan belajar kami secara interaktif.',
      faqTitle: 'Pertanyaan Umum',
      ctaTitle: 'Siap Bergabung dengan Universitas Siber Muhammadiyah?',
      ctaText: 'Jadilah bagian dari tradisi keunggulan pendidikan Muhammadiyah di era digital.',
    },
  })

  await payload.updateGlobal({ slug: 'navigation', data: { mainMenu: NAV_FALLBACK } })
  await payload.updateGlobal({ slug: 'footer', data: { ...FOOTER_FALLBACK } })

  console.log('✓ globals: site-settings, homepage, navigation, footer')
}

/* -------------------------------- reference -------------------------------- */

async function seedCategories() {
  const categories = [
    { name: 'Akademik', description: 'Kurikulum, kuliah, dan kegiatan akademik.' },
    { name: 'Kampus', description: 'Kehidupan dan fasilitas kampus.' },
    { name: 'Penelitian', description: 'Riset, jurnal, dan pengabdian masyarakat.' },
    { name: 'Kemahasiswaan', description: 'Organisasi, UKM, dan prestasi mahasiswa.' },
    { name: 'Pengumuman', description: 'Informasi resmi universitas.' },
  ]
  const ids: Record<string, string | number> = {}
  for (const cat of categories) {
    ids[cat.name] = await upsert('categories', { slug: { equals: slugify(cat.name) } }, cat)
  }
  console.log('✓ kategori:', categories.length)
  return ids
}

type FacultySeed = {
  name: string
  code: string
  dean: string
  establishedYear: number
  excerpt: string
  vision: string
  mission: string[]
  labs: { name: string; description?: string }[]
}

const FACULTIES: FacultySeed[] = [
  {
    name: 'Fakultas Ilmu Komputer',
    code: 'FIK',
    dean: 'Dr. Rina Wulandari, S.Kom., M.T.',
    establishedYear: 2016,
    excerpt: 'Melahirkan talenta digital yang menguasai rekayasa perangkat lunak, data, dan kecerdasan buatan.',
    vision: 'Menjadi fakultas ilmu komputer unggul di Asia Tenggara yang melahirkan talenta digital berakhlak mulia.',
    mission: [
      'Menyelenggarakan pendidikan teknologi informasi yang relevan dengan kebutuhan industri.',
      'Mengembangkan riset terapan di bidang kecerdasan buatan dan data sains.',
      'Membangun kemitraan strategis dengan dunia industri dan komunitas teknologi.',
      'Menanamkan nilai Islam dan karakter berkemajuan pada seluruh sivitas.',
    ],
    labs: [
      { name: 'Laboratorium Rekayasa Perangkat Lunak', description: 'Praktikum agile development dan DevOps.' },
      { name: 'Laboratorium Data & AI', description: 'Komputasi data, machine learning, dan IoT.' },
      { name: 'Studio Kreatif Digital', description: 'Produksi konten, UX lab, dan inkubasi startup.' },
    ],
  },
  {
    name: 'Fakultas Ekonomi dan Bisnis',
    code: 'FEB',
    dean: 'Dr. Ahmad Fauzi, S.E., M.M.',
    establishedYear: 2014,
    excerpt: 'Membentuk profesional bisnis yang adaptif terhadap ekonomi digital dan keuangan syariah.',
    vision: 'Menjadi pusat pendidikan ekonomi dan bisnis digital yang unggul dan berdaya saing global.',
    mission: [
      'Menyelenggarakan pendidikan ekonomi berbasis teknologi dan etika.',
      'Mengembangkan riset ekonomi kerakyatan dan keuangan syariah.',
      'Membangun jejaring dengan dunia usaha dan koperasi.',
      'Mendorong kewirausahaan mahasiswa sebagai wujud dakwah ekonomi.',
    ],
    labs: [
      { name: 'Business Analytics Lab', description: 'Simulasi pasar, data bisnis, dan business intelligence.' },
      { name: 'Money Market & Trading Lab', description: 'Praktik investasi dan pasar modal.' },
      { name: 'Akuntansi & Perpajakan Lab', description: 'Software akuntansi dan audit terpadu.' },
    ],
  },
  {
    name: 'Fakultas Teknik',
    code: 'FT',
    dean: 'Ir. Budi Santoso, M.T.',
    establishedYear: 2015,
    excerpt: 'Rekayasa teknologi untuk industri 4.0 dengan penekanan pada efisiensi dan keberlanjutan.',
    vision: 'Menjadi fakultas teknik yang menghasilkan insinyur profesional, inovatif, dan berwawasan lingkungan.',
    mission: [
      'Menyelenggarakan pendidikan teknik berstandar kompetensi nasional.',
      'Mengembangkan teknologi tepat guna untuk masyarakat.',
      'Memperkuat kemitraan dengan industri manufaktur dan energi.',
      'Menanamkan budaya keselamatan, mutu, dan integritas.',
    ],
    labs: [
      { name: 'Laboratorium Kendali & Robotika', description: 'Sistem otomasi, PLC, dan robot industri.' },
      { name: 'Laboratorium Material & Konstruksi', description: 'Uji beton, struktur, dan BIM.' },
      { name: 'Workshop Produksi Terpadu', description: 'Manufaktur terkomputerisasi dan 3D printing.' },
    ],
  },
  {
    name: 'Fakultas Ilmu Sosial dan Politik',
    code: 'FISIP',
    dean: 'Dr. Siti Nurhaliza, M.Si.',
    establishedYear: 2018,
    excerpt: 'Menghasilkan komunikator dan analis kebijakan yang menjunjung keadilan dan moderasi beragama.',
    vision: 'Menjadi fakultas ilmu sosial politik yang unggul dalam penguatan demokrasi dan moderasi beragama.',
    mission: [
      'Menyelenggarakan pendidikan ilmu sosial politik yang aplikatif.',
      'Mengembangkan riset kebijakan publik dan komunikasi massa.',
      'Membangun kapasitas masyarakat melalui pengabdian.',
      'Menumbuhkan literasi media dan etika digital.',
    ],
    labs: [
      { name: 'Broadcasting & Multimedia Lab', description: 'Produksi podcast, radio, dan TV kampus.' },
      { name: 'Public Policy Lab', description: 'Analisis kebijakan dan simulasi tata kelola.' },
      { name: 'Digital Communication Lab', description: 'Riset audiens dan media sosial.' },
    ],
  },
  {
    name: 'Fakultas Ilmu Kesehatan',
    code: 'FIKes',
    dean: 'Ns. Dra. Maria Aminah, M.Kep.',
    establishedYear: 2019,
    excerpt: 'Pendidikan kesehatan berbasis bukti untuk pelayanan primer dan kesehatan masyarakat.',
    vision: 'Menjadi fakultas ilmu kesehatan terdepan dalam penerapan pembelajaran digital dan pelayanan berpusat pada pasien.',
    mission: [
      'Menyelenggarakan pendidikan kesehatan berbasis bukti dan teknologi.',
      'Mengembangkan riset pelayanan kesehatan primer.',
      'Membangun kemitraan dengan rumah sakit dan puskesmas.',
      'Menanamkan profesi yang humanis dan amanah.',
    ],
    labs: [
      { name: 'Skills Lab Keperawatan', description: 'Simulasi klinis dan manajemen pasien.' },
      { name: 'Laboratorium Gizi & Dietetik', description: 'Analisis nutrisi dan kitchen lab.' },
      { name: 'Laboratorium Kesehatan Masyarakat', description: 'Surveilans dan epidemiologi terapan.' },
    ],
  },
  {
    name: 'Fakultas Agama Islam',
    code: 'FAI',
    dean: 'Dr. H. Abdul Karim, M.A.',
    establishedYear: 2013,
    excerpt: 'Penguatan keislaman moderat, pendidikan, dan dakwah komunikatif di ruang digital.',
    vision: 'Menjadi fakultas agama Islam unggul dalam pendidikan, riset, dan dakwah digital yang moderat.',
    mission: [
      'Menyelenggarakan pendidikan Islam yang integratif dan moderat.',
      'Mengembangkan riset keislaman dan pemikiran kontemporer.',
      'Membekali mahasiswa dengan keterampilan dakwah digital.',
      'Menanamkan akhlakul karimah dalam seluruh proses akademik.',
    ],
    labs: [
      { name: 'Laboratorium Bahasa Arab', description: 'Peningkatan keterampilan lisan dan tulis.' },
      { name: 'Digital Dakwah Studio', description: 'Produksi konten kajian dan media dakwah.' },
    ],
  },
]

async function seedFaculties() {
  const ids: Record<string, string | number> = {}
  for (const f of FACULTIES) {
    ids[f.code] = await upsert('faculties', { code: { equals: f.code } }, {
      name: f.name,
      slug: slugify(f.name),
      code: f.code,
      dean: f.dean,
      establishedYear: f.establishedYear,
      accreditation: 'Unggul',
      featured: true,
      excerpt: f.excerpt,
      vision: f.vision,
      mission: f.mission.map((item) => ({ item })),
      labs: f.labs,
      address: 'Jl. K.H. Ahmad Dahlan No. 1, Jakarta Pusat, DKI Jakarta',
      phone: '(021) 555-0199',
      email: `${f.code.toLowerCase()}@sibermu.test`,
    })
  }
  console.log('✓ fakultas:', FACULTIES.length)
  return ids
}

/* ---------------------------------- prodi ---------------------------------- */

type ProdiSeed = {
  title: string
  code: string
  degree: 'D3' | 'S1' | 'S2'
  faculty: string
  duration: number
  featured?: boolean
  excerpt: string
  highlights: { label: string; value: string }[]
  prospects: string[]
  courses: string[]
}

const PRODI: ProdiSeed[] = [
  {
    title: 'Teknik Informatika', code: '61201', degree: 'S1', faculty: 'FIK', duration: 8, featured: true,
    excerpt: 'Rekayasa perangkat lunak, sistem terdistribusi, dan kecerdasan buatan untuk industri digital.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }, { label: 'Kelas', value: 'Hybrid' }],
    prospects: ['Software Engineer', 'Data Engineer', 'AI Engineer', 'DevOps Engineer'],
    courses: ['Struktur Data & Algoritma', 'Kecerdasan Buatan', 'Rekayasa Perangkat Lunak', 'Keamanan Siber'],
  },
  {
    title: 'Sistem Informasi', code: '61202', degree: 'S1', faculty: 'FIK', duration: 8, featured: true,
    excerpt: 'Perancangan sistem informasi organisasi yang menghubungkan teknologi dan proses bisnis.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Business Analyst', 'System Analyst', 'IT Consultant', 'Product Manager'],
    courses: ['Analisis & Desain Sistem', 'Basis Data Terdistribusi', 'Enterprise Architecture', 'Proyek TI'],
  },
  {
    title: 'Ilmu Data', code: '61203', degree: 'S1', faculty: 'FIK', duration: 8,
    excerpt: 'Statistika, visualisasi, dan machine learning untuk menghasilkan keputusan berbasis data.',
    highlights: [{ label: 'Akreditasi', value: 'Baik' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Data Analyst', 'Machine Learning Engineer', 'Data Scientist'],
    courses: ['Statistika Terapan', 'Pembelajaran Mesin', 'Visualisasi Data', 'Big Data Processing'],
  },
  {
    title: 'Magister Informatika', code: '61203', degree: 'S2', faculty: 'FIK', duration: 4, featured: true,
    excerpt: 'Pendalaman riset terapan informatika: kecerdasan buatan, keamanan, dan sistem cerdas.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '4 Semester' }],
    prospects: ['Researcher', 'Technology Lead', 'Dosen', 'IT Strategist'],
    courses: ['Penelitian Terapan Informatika', 'Deep Learning', 'Arsitektur Perusahaan', 'Metodologi Riset'],
  },
  {
    title: 'Manajemen', code: '62201', degree: 'S1', faculty: 'FEB', duration: 8, featured: true,
    excerpt: 'Kepemimpinan organisasi, pemasaran digital, dan pengelolaan usaha berbasis data.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Manajer Pemasaran', 'Konsultan Manajemen', 'Entrepreneur', 'HR Manager'],
    courses: ['Manajemen Strategis', 'Pemasaran Digital', 'Perilaku Konsumen', 'Kewirausahaan'],
  },
  {
    title: 'Akuntansi', code: '62202', degree: 'S1', faculty: 'FEB', duration: 8,
    excerpt: 'Pelaporan keuangan, audit, dan pajak dengan penguatan teknologi akuntansi modern.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Akuntan Publik', 'Auditor', 'Analis Pajak', 'Controller'],
    courses: ['Akuntansi Keuangan Menengah', 'Audit', 'Pajak Indonesia', 'Sistem Informasi Akuntansi'],
  },
  {
    title: 'Ekonomi Syariah', code: '62203', degree: 'S1', faculty: 'FEB', duration: 8,
    excerpt: 'Prinsip ekonomi Islam untuk keuangan syariah, maqashid, dan koperasi umat.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Analis Shariah', 'Staf Bank Syariah', 'Konsultan Wakaf'],
    courses: ['Ekonomi Mikro Islam', 'Manajemen Bank Syariah', 'Maqashid Syariah', 'Akuntansi Syariah'],
  },
  {
    title: 'Bisnis Digital', code: '62204', degree: 'S1', faculty: 'FEB', duration: 8, featured: true,
    excerpt: 'Strategi bisnis di era platform: e-commerce, growth, dan tata kelola startup.',
    highlights: [{ label: 'Akreditasi', value: 'Baik' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Growth Manager', 'E-commerce Manager', 'Startup Founder'],
    courses: ['Strategi Bisnis Digital', 'Growth Hacking', 'Analytics untuk Bisnis', 'Manajemen Produk'],
  },
  {
    title: 'Teknik Elektro', code: '63201', degree: 'S1', faculty: 'FT', duration: 8,
    excerpt: 'Sistem tenaga, elektronika industri, dan kendali untuk transisi energi bersih.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Engineer Kelistrikan', 'Otomasi Industri', 'Teknisi Energi Terbarukan'],
    courses: ['Rangkaian Elektrik', 'Sistem Kendali', 'Elektronika Daya', 'PLTS Terpadu'],
  },
  {
    title: 'Teknik Industri', code: '63202', degree: 'S1', faculty: 'FT', duration: 8, featured: true,
    excerpt: 'Optimasi produksi, ergonomi, dan rantai pasok berbasis analitik operasi.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Industrial Engineer', 'Supply Chain Analyst', 'Quality Engineer'],
    courses: ['Perencanaan & Pengendalian Produksi', 'Riset Operasi', 'Ergonomi', 'Lean Manufacturing'],
  },
  {
    title: 'Teknik Mesin', code: '63203', degree: 'S1', faculty: 'FT', duration: 8,
    excerpt: 'Desain mesin, manufaktur presisi, dan perawatan terprediksi untuk industri 4.0.',
    highlights: [{ label: 'Akreditasi', value: 'Baik' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Manufacturing Engineer', 'Maintenance Engineer', 'Design Engineer'],
    courses: ['Mekanika Teknik', 'Manufaktur', 'CAD/CAM', 'Pemeliharaan Mesin'],
  },
  {
    title: 'Ilmu Komunikasi', code: '64201', degree: 'S1', faculty: 'FISIP', duration: 8, featured: true,
    excerpt: 'Produksi media, humas, dan komunikasi digital dengan pendekatan data dan etika.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Public Relations', 'Content Strategist', 'Journalist', 'Media Planner'],
    courses: ['Teori Komunikasi', 'Jurnalistik Digital', 'Humas & Advertensi', 'Riset Audiens'],
  },
  {
    title: 'Hubungan Internasional', code: '64202', degree: 'S1', faculty: 'FISIP', duration: 8,
    excerpt: 'Diplomasi, kebijakan global, dan ekonomi politik internasional dengan lensa moderasi.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Diplomat', 'Analis Kebijakan', 'Staf NGO/IO', 'Trade Officer'],
    courses: ['Teori Hubungan Internasional', 'Diplomasi Publik', 'Ekonomi Politik Global', 'Hukum Internasional'],
  },
  {
    title: 'Administrasi Publik', code: '64203', degree: 'S1', faculty: 'FISIP', duration: 8,
    excerpt: 'Tata kelola pemerintahan digital, kebijakan publik, dan pelayanan berbasis teknologi.',
    highlights: [{ label: 'Akreditasi', value: 'Baik' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Analis Kebijakan', 'PNS/Pemda', 'Konsultan Tata Kelola'],
    courses: ['Kebijakan Publik', 'E-Government', 'Administrasi Pembangunan', 'Manajemen Sektor Publik'],
  },
  {
    title: 'Keperawatan', code: '65201', degree: 'S1', faculty: 'FIKes', duration: 8, featured: true,
    excerpt: 'Asuhan keperawatan profesional berbasis bukti dengan kompetensi digital klinis.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Perawat Klinis', 'Perawat Komunitas', 'Case Manager', 'Educator'],
    courses: ['Fisiologi Keperawatan', 'Asuhan Keperawatan Keluarga', 'Keperawatan Emergensi', 'Evidence Based Practice'],
  },
  {
    title: 'Ilmu Gizi', code: '65202', degree: 'S1', faculty: 'FIKes', duration: 8,
    excerpt: 'Nutrisi klinik dan komunitas, food service, serta intervensi berbasis data kesehatan.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Dietisien', 'Nutritionist', 'Konsultan Gizi Industri'],
    courses: ['Nutrisi Klinik', 'Keamanan Pangan', 'Gizi Masyarakat', 'Dietetik'],
  },
  {
    title: 'Administrasi Rumah Sakit', code: '65203', degree: 'D3', faculty: 'FIKes', duration: 6,
    excerpt: 'Manajemen pelayanan kesehatan: rekam medis, mutu, dan rumah sakit digital.',
    highlights: [{ label: 'Akreditasi', value: 'Baik' }, { label: 'Durasi', value: '6 Semester' }],
    prospects: ['Staf Manajemen RS', 'Coding Officer', 'Quality Assurance RS'],
    courses: ['Manajemen Pelayanan RS', 'Rekam Medis Elektronik', 'Mutu & Keselamatan Pasien', 'Akuntansi RS'],
  },
  {
    title: 'Pendidikan Agama Islam', code: '66201', degree: 'S1', faculty: 'FAI', duration: 8, featured: true,
    excerpt: 'Pendidikan Islam moderat dengan penguatan kurikulum, pembelajaran digital, dan konseling.',
    highlights: [{ label: 'Akreditasi', value: 'Unggul' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Guru PAI', 'Dosen', 'Pengembang Kurikulum', 'Konselor'],
    courses: ['Pendidikan Agama Islam', 'Metodologi Pengajaran', 'Psikologi Pendidikan', 'Kurikulum & Pembelajaran'],
  },
  {
    title: 'Komunikasi Dakwah', code: '66202', degree: 'S1', faculty: 'FAI', duration: 8,
    excerpt: 'Strategi dakwah kontemporer melalui media, konten, dan komunitas digital.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '8 Semester' }],
    prospects: ['Content Creator Dakwah', 'Pramuwisma Digital', 'Pengelola Media Dakwah'],
    courses: ['Teori Dakwah', 'Produksi Media Dakwah', 'Manajemen Komunitas', 'Etika Digital'],
  },
  {
    title: 'Magister Manajemen', code: '62201', degree: 'S2', faculty: 'FEB', duration: 4,
    excerpt: 'Kepemimpinan strategis dan transformasi digital organisasi bagi profesional berpengalaman.',
    highlights: [{ label: 'Akreditasi', value: 'Baik Sekali' }, { label: 'Durasi', value: '4 Semester' }],
    prospects: ['Executive Manager', 'Konsultan Strategi', 'Dosen & Peneliti'],
    courses: ['Manajemen Strategis Lanjutan', 'Transformasi Digital', 'Kepemimpinan', 'Tesis'],
  },
]

async function seedProdi(facultyIds: Record<string, string | number>) {
  const ids: Record<string, string | number> = {}
  for (const p of PRODI) {
    ids[p.title] = await upsert('prodi', { code: { equals: p.code }, title: { equals: p.title } }, {
      title: p.title,
      slug: slugify(p.title),
      code: p.code,
      degree: p.degree,
      faculty: facultyIds[p.faculty],
      accreditation: p.degree === 'S2' ? 'Baik Sekali' : 'Unggul',
      featured: p.featured ?? false,
      duration: p.duration,
      excerpt: p.excerpt,
      highlights: p.highlights,
      prospects: p.prospects.map((career) => ({ career })),
      featuredCourses: p.courses.map((course) => ({ course })),
      requirements:
        p.degree === 'S1'
          ? 'Lulusan SMA/SMK/MA sederajat, nilai rata-rata minimal 75, dan mengikuti seleksi sesuai jalur pendaftaran.'
          : p.degree === 'S2'
            ? 'Lulusan S1/sederajat dari bidang relevan, IPK minimal 2.75, dan lulus seleksi masuk program magister.'
            : 'Lulusan SMA/SMK/MA sederajat dan mengikuti seleksi masuk program diploma.',
    })
  }
  console.log('✓ prodi:', PRODI.length)
  return ids
}

/* ---------------------------------- dosen ---------------------------------- */

type DosenSeed = {
  name: string
  title: string
  faculty: string
  prodi?: string
  featured?: boolean
  bio: string
  expertise: string[]
}

const DOSEN: DosenSeed[] = [
  { name: 'Dr. Rina Wulandari, S.Kom., M.T.', title: 'S.Kom., M.T.', faculty: 'FIK', prodi: 'Teknik Informatika', featured: true, bio: 'Peneliti kecerdasan buatan terapan dan pengembangan kurikulum merdeka belajar.', expertise: ['Kecerdasan Buatan', 'Rekayasa Perangkat Lunak', 'Pendidikan Teknologi'] },
  { name: 'Andi Pratama, M.T.', title: 'M.T.', faculty: 'FIK', prodi: 'Sistem Informasi', bio: 'Praktisi sistem enterprise dengan pengalaman transformasi digital lintas industri.', expertise: ['Arsitektur Sistem', 'Basis Data', 'Cloud Computing'] },
  { name: 'Dewi Lestari, M.Si.', title: 'M.Si.', faculty: 'FIK', prodi: 'Ilmu Data', featured: true, bio: 'Analis data yang fokus pada visualisasi dan penerapan statistika bisnis.', expertise: ['Data Science', 'Statistika', 'Visualisasi Data'] },
  { name: 'Dr. Ahmad Fauzi, S.E., M.M.', title: 'S.E., M.M.', faculty: 'FEB', prodi: 'Manajemen', featured: true, bio: 'Konsultan manajemen strategis dan pengembangan usaha mikro digital.', expertise: ['Manajemen Strategis', 'Kewirausahaan', 'Pemasaran'] },
  { name: 'Ratna Sari, S.E., Ak., M.Ak.', title: 'S.E., Ak., M.Ak.', faculty: 'FEB', prodi: 'Akuntansi', bio: 'Akuntan publik yang aktif mengembangkan literasi keuangan digital.', expertise: ['Akuntansi Keuangan', 'Audit', 'Teknologi Akuntansi'] },
  { name: 'Ir. Budi Santoso, M.T.', title: 'M.T.', faculty: 'FT', prodi: 'Teknik Industri', featured: true, bio: 'Insinyur industri dengan pengalaman lean manufacturing di sektor otomotif.', expertise: ['Lean Manufacturing', 'Riset Operasi', 'Manajemen Mutu'] },
  { name: 'Hendra Gunawan, M.T.', title: 'M.T.', faculty: 'FT', prodi: 'Teknik Elektro', bio: 'Spesialis sistem kendali dan integrasi energi terbarukan.', expertise: ['Sistem Kendali', 'Elektronika Daya', 'Energi Terbarukan'] },
  { name: 'Dr. Siti Nurhaliza, M.Si.', title: 'M.Si.', faculty: 'FISIP', prodi: 'Ilmu Komunikasi', featured: true, bio: 'Peneliti komunikasi digital dan literasi media masyarakat.', expertise: ['Komunikasi Digital', 'Riset Media', 'Humas'] },
  { name: 'Faisal Rahman, M.I.Kom.', title: 'M.I.Kom.', faculty: 'FISIP', prodi: 'Hubungan Internasional', bio: 'Analis kebijakan regional dengan fokus pada diplomasi publik ASEAN.', expertise: ['Diplomasi Publik', 'Kebijakan Regional', 'Ekonomi Politik'] },
  { name: 'Ns. Dra. Maria Aminah, M.Kep.', title: 'M.Kep.', faculty: 'FIKes', prodi: 'Keperawatan', featured: true, bio: 'Pendidik keperawatan klinis yang mendorong pemanfaatan rekam medis elektronik.', expertise: ['Keperawatan Klinis', 'Pendidikan Profesi', 'Evidence Based Practice'] },
  { name: 'Sari Rahmawati, S.Gz., M.Gz.', title: 'S.Gz., M.Gz.', faculty: 'FIKes', prodi: 'Ilmu Gizi', bio: 'Praktisi gizi komunitas dan pengembangan program intervensi berbasis data.', expertise: ['Gizi Klinik', 'Gizi Masyarakat', 'Keamanan Pangan'] },
  { name: 'Dr. H. Abdul Karim, M.A.', title: 'M.A.', faculty: 'FAI', prodi: 'Pendidikan Agama Islam', featured: true, bio: 'Dosen pendidikan Islam yang mengembangkan model pembelajaran digital moderat.', expertise: ['Pendidikan Islam', 'Metodologi Pengajaran', 'Pemikiran Islam'] },
  { name: 'Nadia Zahra, M.A.', title: 'M.A.', faculty: 'FAI', prodi: 'Komunikasi Dakwah', bio: 'Praktisi konten dakwah dan pengelola komunitas kajian digital.', expertise: ['Dakwah Digital', 'Produksi Konten', 'Manajemen Komunitas'] },
]

async function seedDosen(facultyIds: Record<string, string | number>, prodiIds: Record<string, string | number>) {
  for (const d of DOSEN) {
    const { name, title, faculty, prodi, ...rest } = d
    await upsert('dosen', { name: { equals: name } }, {
      name,
      slug: slugify(name),
      title,
      faculty: facultyIds[faculty],
      prodi: prodi ? prodiIds[prodi] : undefined,
      featured: d.featured ?? false,
      email: `${slugify(name).split('-')[0]}@sibermu.test`,
      expertise: rest.expertise.map((field) => ({ field })),
      bio: rest.bio,
      education: [{ degree: title, institution: 'Universitas Indonesia', year: '2015' }],
    })
  }
  console.log('✓ dosen:', DOSEN.length)
}

/* ---------------------------------- news ----------------------------------- */

type NewsSeed = {
  title: string
  category: string
  featured?: boolean
  excerpt: string
  body: string[]
  daysAgo: number
}

const NEWS: NewsSeed[] = [
  {
    title: 'Kampus Digital USM Luncurkan Platform Kelas Hibrida',
    category: 'Akademik', featured: true, daysAgo: 2,
    excerpt: 'Platform baru memungkinkan kuliah tatap muka dan daring berpadu dalam satu pengalaman belajar.',
    body: [
      'Universitas Siber Muhammadiyah resmi meluncurkan platform kelas hibrida yang menggabungkan sesi tatap muka dengan materi daring terstruktur.',
      'Platform ini dilengkapi forum diskusi, penilaian otomatis, dan analitik pembelajaran yang membantu dosen memantau progres mahasiswa secara real time.',
      'Rektor menegaskan bahwa transformasi digital kampus harus berjalan beriringan dengan penguatan karakter dan nilai keislaman.',
    ],
  },
  {
    title: 'Mahasiswa Teknik Informatika Raih Medali di Kompetisi Coding Nasional',
    category: 'Kemahasiswaan', featured: true, daysAgo: 6,
    excerpt: 'Tim mahasiswa FIK membawa pulang medali emas setelah bersaing dengan 120 tim dari berbagai kampus.',
    body: [
      'Tim programming Fakultas Ilmu Komputer meraih medali emas pada kompetisi coding nasional yang diikuti 120 tim terbaik dari seluruh Indonesia.',
      'Kemenangan ini merupakan hasil pembinaan rutin kelas algoritma dan klub kompetisi kampus.',
      'Tim akan mewakili Indonesia pada ajang internasional yang dijadwalkan tahun depan.',
    ],
  },
  {
    title: 'Kemitraan Industri: Kolaborasi Riset dengan Manufaktur Nasional',
    category: 'Penelitian', daysAgo: 12,
    excerpt: 'Fakultas Teknik menjalin kerja sama riset terapan untuk otomasi lini produksi berbasis IoT.',
    body: [
      'Fakultas Teknik menandatangani nota kesepahaman riset dengan perusahaan manufaktur nasional.',
      'Kerja sama mencakup penerapan sensor IoT pada lini produksi dan program magang mahasiswa.',
      'Program ini diharapkan memperkuat link and match antara riset kampus dan kebutuhan industri.',
    ],
  },
  {
    title: 'PMB 2027 Dibuka: Empat Jalur Masuk bagi Calon Mahasiswa',
    category: 'Pengumuman', featured: true, daysAgo: 1,
    excerpt: 'Pendaftaran mahasiswa baru dibuka melalui jalur SNBP, SNBT, mandiri, dan afirmasi.',
    body: [
      'Universitas Siber Muhammadiyah membuka Penerimaan Mahasiswa Baru tahun akademik 2027/2028.',
      'Tersedia empat jalur masuk: SNBP berbasis prestasi, SNBT berbasis tes, mandiri, dan afirmasi bagi berprestasi terbatas.',
      'Calon mahasiswa dapat mendaftar secara daring melalui halaman PMB dan memantau status menggunakan kode tracking.',
    ],
  },
  {
    title: 'Seminar Nasional Moderasi Beragama di Era Media Sosial',
    category: 'Kampus', daysAgo: 20,
    excerpt: 'Ratusan peserta mengikuti seminar yang mengangkat etika digital dan penguatan literasi media.',
    body: [
      'Universitas menggelar seminar nasional bertema moderasi beragama di era media sosial.',
      'Hadir narasumber dari akademisi, media, dan organisasi kemasyarakatan.',
      'Peserta diajak membangun budaya diskusi sehat dan mencegah penyebaran hoaks.',
    ],
  },
  {
    title: 'Jurnal Kampus Terindeks di Basis Data Ilmiah Nasional',
    category: 'Penelitian', daysAgo: 30,
    excerpt: 'Pencapaian ini menandai peningkatan mutu publikasi ilmiah dosen dan mahasiswa.',
    body: [
      'Jurnal ilmiah yang dikelola universitas resmi terindeks pada basis data publikasi nasional.',
      'Indeksasi ini mendorong dosen dan mahasiswa memperbanyak karya tulis yang terukur dan bereputasi.',
      'Pengelolaan jurnal dilakukan sepenuhnya secara daring melalui repository kampus.',
    ],
  },
]

async function seedNews(categoryIds: Record<string, string | number>) {
  for (const item of NEWS) {
    const publishedAt = new Date(Date.now() - item.daysAgo * 24 * 60 * 60 * 1000)
    await upsert('news', { slug: { equals: slugify(item.title) } }, {
      title: item.title,
      slug: slugify(item.title),
      category: categoryIds[item.category] ?? categoryIds['Pengumuman'],
      featured: item.featured ?? false,
      excerpt: item.excerpt,
      content: lexical(item.body),
      publishedAt: publishedAt.toISOString(),
    })
  }
  console.log('✓ berita:', NEWS.length)
}

/* --------------------------------- events ---------------------------------- */

async function seedEvents() {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000
  const events = [
    {
      title: 'Open House Kampus & Virtual Tour',
      slug: slugify('Open House Kampus & Virtual Tour'),
      category: 'pmb', featured: true,
      startsAt: new Date(now + 14 * day).toISOString(),
      location: 'Auditorium Kampus & Zoom',
      excerpt: 'Kenali kampus, fakultas, dan program studi bersama tim PMB dan dosen pengampu.',
      registrationUrl: '/pmb#daftar',
    },
    {
      title: 'Kuliah Umum: Etika Kecerdasan Buatan',
      slug: slugify('Kuliah Umum Etika Kecerdasan Buatan'),
      category: 'akademik', featured: true,
      startsAt: new Date(now + 21 * day).toISOString(),
      location: 'Auditorium Kampus',
      excerpt: 'Pembicara praktisi AI nasional membahas tanggung jawab pengembangan teknologi cerdas.',
    },
    {
      title: 'Webinar Riset: Menulis Proposal Hibah Internal',
      slug: slugify('Webinar Riset Menulis Proposal Hibah Internal'),
      category: 'penelitian',
      startsAt: new Date(now + 30 * day).toISOString(),
      location: 'Zoom Meeting',
      excerpt: 'Panduan praktis menyusun proposal penelitian dan pengabdian bagi dosen baru.',
    },
    {
      title: 'Bazar Kewirausahaan Mahasiswa',
      slug: slugify('Bazar Kewirausahaan Mahasiswa'),
      category: 'kemahasiswaan',
      startsAt: new Date(now + 45 * day).toISOString(),
      location: 'Lapangan Utama Kampus',
      excerpt: 'Pameran usaha mahasiswa dari seluruh fakultas dengan mentor bisnis.',
    },
  ]
  for (const e of events) {
    await upsert('events', { slug: { equals: e.slug } }, e)
  }
  console.log('✓ events:', events.length)
}

/* ------------------------------- achievements ------------------------------ */

async function seedAchievements(facultyIds: Record<string, string | number>) {
  const items = [
    { title: 'Medali Emas Kompetisi Coding Nasional', year: 2026, scope: 'nasional', category: 'teknologi', faculty: 'FIK', icon: 'Trophy' },
    { title: 'Juara 1 Lomba Bisnis Plan Syariah', year: 2026, scope: 'nasional', category: 'akademik', faculty: 'FEB', icon: 'Medal' },
    { title: 'Best Paper Konferensi Sistem Informasi', year: 2025, scope: 'internasional', category: 'akademik', faculty: 'FIK', icon: 'ScrollText' },
    { title: 'Juara 2 Debat Kebijakan Publik', year: 2025, scope: 'nasional', category: 'akademik', faculty: 'FISIP', icon: 'Award' },
    { title: 'Inovasi Riset Terapan Energi Surya', year: 2025, scope: 'provinsi', category: 'teknologi', faculty: 'FT', icon: 'Lightbulb' },
    { title: 'Juara 1 Lomba Pidato Bahasa Arab', year: 2024, scope: 'nasional', category: 'keagamaan', faculty: 'FAI', icon: 'Mic' },
  ]
  for (const item of items) {
    const { faculty, ...rest } = item
    await upsert('achievements', { title: { equals: item.title } }, { ...rest, faculty: facultyIds[faculty] })
  }
  console.log('✓ achievements:', items.length)
}

/* ------------------------------- testimonials ------------------------------ */

async function seedTestimonials(facultyIds: Record<string, string | number>) {
  const items = [
    { name: 'Anisa Putri', role: 'alumni', faculty: 'FIK', featured: true, quote: 'Kuliah hibrida di USM membuat saya bisa magang di startup sejak semester tiga tanpa tertinggal materi.' },
    { name: 'Bagas Ramadhan', role: 'siswa', faculty: 'FEB', featured: true, quote: 'Dosen pembimbingnya dekat, materi bisnis digital langsung dipraktikkan lewat proyek bersama mitra.' },
    { name: 'Citra Dewi', role: 'siswa', faculty: 'FIKes', quote: 'Skills lab-nya lengkap dan simulasi klinisnya realistis. Siap kerja terasa sejak awal kuliah.' },
    { name: 'Dr. Hendra (Orang Tua)', role: 'orangtua', faculty: 'FISIP', quote: 'Biaya transparan dan ada beasiswa, anak saya bisa kuliah di kampus berkualitas.' },
    { name: 'Muhammad Ilham', role: 'alumni', faculty: 'FT', quote: 'Proyek teknik industri kampus saya bawa sampai kerja. Link and match-nya terasa nyata.' },
    { name: 'Zahra Aulia', role: 'siswa', faculty: 'FAI', quote: 'Dakwah digital diajarkan secara praktik, bukan teori. Sekarang saya punya kanal kajian sendiri.' },
  ]
  for (const item of items) {
    const { faculty, ...rest } = item
    await upsert('testimonials', { name: { equals: item.name } }, { ...rest, faculty: facultyIds[faculty] })
  }
  console.log('✓ testimonials:', items.length)
}

/* ---------------------------------- faqs ----------------------------------- */

async function seedFaqs() {
  const faqs = [
    { question: 'Bagaimana cara mendaftar sebagai mahasiswa baru?', category: 'pmb', answer: 'Daftar melalui halaman PMB, isi formulir daring, unggah dokumen, lalu pantau status menggunakan kode tracking yang diberikan sistem.' },
    { question: 'Apa saja jalur masuk yang tersedia?', category: 'pmb', answer: 'Tersedia jalur SNBP (berbasis prestasi), SNBT (berbasis tes), mandiri, dan afirmasi bagi calon mahasiswa dengan keterbatasan ekonomi.' },
    { question: 'Apakah tersedia beasiswa?', category: 'biaya', answer: 'Ya. Tersedia beasiswa prestasi akademik, beasiswa ekonomi, dan keringanan biaya dari Yayasan Pendidikan Muhammadiyah.' },
    { question: 'Bagaimana model perkuliahan di kampus digital ini?', category: 'akademik', answer: 'Perkuliahan hibrida: sesi tatap muka terjadwal dipadukan dengan kelas daring, forum diskusi, dan proyek kolaboratif di LMS.' },
    { question: 'Apakah program studi sudah terakreditasi?', category: 'program', answer: 'Seluruh program studi telah terakreditasi oleh LAM-PTesik dengan kategori Baik hingga Unggul, dan beberapa sedang proses akreditasi internasional.' },
    { question: 'Berapa lama studi program sarjana?', category: 'umum', answer: 'Program sarjana (S1) berdurasi 8 semester, program diploma (D3) 6 semester, dan program magister (S2) 4 semester.' },
    { question: 'Apakah ada magang dan kemitraan industri?', category: 'umum', answer: 'Ada. Kampus menjalin kemitraan dengan puluhan mitra industri untuk magang, proyek bersama, dan penempatan kerja lulusan.' },
  ]
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    await upsert('faqs', { question: { equals: f.question } }, { ...f, showOnHomepage: true, order: i + 1 })
  }
  console.log('✓ faqs:', faqs.length)
}

/* ----------------------------------- run ----------------------------------- */

console.log('Seeding database...')
try {
  await seedUsers()
  await seedGlobals()
  const facultyIds = await seedFaculties()
  const prodiIds = await seedProdi(facultyIds)
  await seedDosen(facultyIds, prodiIds)
  const categoryIds = await seedCategories()
  await seedNews(categoryIds)
  await seedEvents()
  await seedAchievements(facultyIds)
  await seedTestimonials(facultyIds)
  await seedFaqs()

  // Dev server mempertahankan cache unstable_cache — minta revalidasi bila jalan.
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const secret = process.env.REVALIDATE_SECRET ? `?secret=${process.env.REVALIDATE_SECRET}` : ''
    const res = await fetch(`${base}/api/revalidate${secret}`, { method: 'POST' })
    console.log(res.ok ? '✓ cache konten direvalidasi' : '• revalidate dilewati')
  } catch {
    console.log('• dev server tidak berjalan — jalankan ulang `npm run dev` agar data tampil')
  }

  console.log('Selesai. Login admin: admin@sibermu.test / Admin123!')
} catch (error) {
  console.error('Seed gagal:', error)
  process.exit(1)
}
