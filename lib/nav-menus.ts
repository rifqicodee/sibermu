import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  ClipboardList,
  Database,
  GraduationCap,
  Landmark,
  Map,
  MonitorPlay,
  Presentation,
  Rocket,
  School,
} from 'lucide-react'

export type NavLink = {
  label: string
  labelEn?: string
  href: string
  description?: string
  descriptionEn?: string
}

export type MegaColumn = {
  title?: string
  titleEn?: string
  links: NavLink[]
}

export type MegaQuickItem = NavLink & { icon: LucideIcon }

export type MegaFeature = {
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  cta: string
  ctaEn?: string
  href: string
}

export type TimelineStep = NavLink

export type MegaConfig =
  | { layout: 'profile'; columns: MegaColumn[]; feature: MegaFeature }
  | { layout: 'academics'; columns: MegaColumn[]; quick: { title: string; titleEn?: string; items: MegaQuickItem[] } }
  | { layout: 'admissions'; steps: TimelineStep[]; cta: { label: string; labelEn?: string; href: string } }
  | { layout: 'campus'; columns: MegaColumn[] }
  | { layout: 'career'; columns: MegaColumn[] }
  | { layout: 'repository'; columns: MegaColumn[] }
  | { layout: 'none' }

export type NavId = 'profil' | 'akademik' | 'admisi' | 'kampus-virtual' | 'karir' | 'repository'

export type NavItem = {
  id: NavId
  label: string
  labelEn?: string
  href: string
  icon: LucideIcon
  mega: MegaConfig
}

const L = {
  profil: 'Profil',
  akademik: 'Akademik',
  admisi: 'Admisi',
  kampusVirtual: 'Kampus Virtual',
  karir: 'Karir',
  repository: 'Repository',
} as const

/**
 * Navigasi utama — meniru struktur sibermu.ac.id.
 * Label id/en statis; href menunjuk rute yang tersedia di aplikasi ini.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'profil',
    label: L.profil,
    labelEn: 'Profile',
    href: '/tentang',
    icon: Landmark,
    mega: {
      layout: 'profile',
      columns: [
        {
          title: 'Tentang Universitas',
          titleEn: 'About the University',
          links: [
            { label: 'Visi dan Misi', labelEn: 'Vision and Mission', href: '/tentang#visi', description: 'Arah dan tujuan universitas', descriptionEn: 'University direction and goals' },
            { label: 'Sejarah', labelEn: 'History', href: '/tentang#sejarah', description: 'Perjalanan kampus sejak berdiri', descriptionEn: 'The campus journey since its founding' },
            { label: 'Akreditasi', labelEn: 'Accreditation', href: '/tentang#akreditasi', description: 'Izin operasional dan peringkat', descriptionEn: 'Operational permit and rankings' },
            { label: 'Pimpinan dan Pejabat', labelEn: 'Leadership and Officials', href: '/tentang#pimpinan', description: 'Rektorat dan struktur pimpinan', descriptionEn: 'Rectorate and leadership structure' },
            { label: 'Organisasi', labelEn: 'Organization', href: '/tentang#organisasi', description: 'Unit kerja dan bagian universitas', descriptionEn: 'Work units and university departments' },
          ],
        },
        {
          title: 'Tata Kelola',
          titleEn: 'Governance',
          links: [
            { label: 'Muhammadiyah', labelEn: 'Muhammadiyah', href: '/tentang#muhammadiyah', description: 'Yayasan pendiri dan tradisi', descriptionEn: 'Founding foundation and tradition' },
            { label: 'Manajemen Mutu', labelEn: 'Quality Assurance', href: '/tentang#mutu', description: 'Penjaminan mutu internal', descriptionEn: 'Internal quality assurance' },
            { label: 'Rencana Strategis', labelEn: 'Strategic Plan', href: '/tentang#renstra', description: 'Target dan roadmap lima tahun', descriptionEn: 'Five-year targets and roadmap' },
            { label: 'Badan Pembina Harian', labelEn: 'Supervisory Board', href: '/tentang#badan-pembina', description: 'Pembinaan dan pengawasan', descriptionEn: 'Guidance and oversight' },
            { label: 'Fasilitas Kampus', labelEn: 'Campus Facilities', href: '/tentang#fasilitas', description: 'Laboratorium dan ruang belajar', descriptionEn: 'Laboratories and learning spaces' },
          ],
        },
      ],
      feature: {
        title: 'Universitas digital Muhammadiyah',
        titleEn: 'Muhammadiyah digital university',
        description:
          'Paduan akhlak mulia, teknologi terkini, dan standar akademik global untuk generasi berkemajuan.',
        descriptionEn:
          'Noble character, modern technology, and global academic standards for a progressive generation.',
        cta: 'Pelajari Kampus',
        ctaEn: 'Learn More',
        href: '/tentang',
      },
    },
  },
  {
    id: 'akademik',
    label: L.akademik,
    labelEn: 'Academics',
    href: '/akademik',
    icon: GraduationCap,
    mega: {
      layout: 'academics',
      columns: [
        {
          title: 'Kegiatan Akademik',
          titleEn: 'Academic Activities',
          links: [
            { label: 'Kalender Akademik', labelEn: 'Academic Calendar', href: '/akademik#kalender', description: 'Jadwal kuliah, ujian, dan libur', descriptionEn: 'Classes, exams, and holidays' },
            { label: 'Kurikulum & RPS', labelEn: 'Curriculum', href: '/akademik#kurikulum', description: 'Struktur kurikulum berbasis outcome', descriptionEn: 'Outcome-based curriculum structure' },
            { label: 'E-learning', labelEn: 'E-learning', href: '/akademik#e-learning', description: 'Kelas daring dan materi kuliah', descriptionEn: 'Online classes and course material' },
            { label: 'Yudisium', labelEn: 'Yudisium', href: '/akademik#yudisium', description: 'Penetapan kelulusan mahasiswa', descriptionEn: 'Student graduation determination' },
            { label: 'Wisuda', labelEn: 'Graduation', href: '/akademik#wisuda', description: 'Jadwal dan prosedur wisuda', descriptionEn: 'Graduation schedule and procedure' },
          ],
        },
        {
          title: 'Sumber Belajar',
          titleEn: 'Learning Resources',
          links: [
            { label: 'Program Studi', labelEn: 'Study Programs', href: '/program', description: 'Jelajahi seluruh program', descriptionEn: 'Explore all programs' },
            { label: 'Dosen', labelEn: 'Lecturers', href: '/dosen', description: 'Tenaga pengajar profesional', descriptionEn: 'Professional teaching staff' },
            { label: 'Perpustakaan', labelEn: 'Library', href: '/akademik#perpustakaan', description: 'Koleksi digital dan pinjaman', descriptionEn: 'Digital collection and loans' },
            { label: 'Beasiswa', labelEn: 'Scholarships', href: '/pmb#biaya', description: 'Bantuan biaya pendidikan', descriptionEn: 'Tuition assistance' },
            { label: 'Penelitian', labelEn: 'Research', href: '/penelitian', description: 'Hibah, jurnal, dan pengabdian', descriptionEn: 'Grants, journals, and community service' },
          ],
        },
      ],
      quick: {
        title: 'Akses Cepat',
        titleEn: 'Quick Access',
        items: [
          { label: 'Portal Mahasiswa', labelEn: 'Student Portal', href: '/akademik#portal', icon: School },
          { label: 'Portal Dosen', labelEn: 'Lecturer Portal', href: '/akademik#dosen', icon: Presentation },
          { label: 'SIAKAD', labelEn: 'Academic System', href: '/akademik', icon: MonitorPlay },
          { label: 'Kelas Virtual', labelEn: 'Virtual Classroom', href: '/akademik#kelas', icon: Rocket },
        ],
      },
    },
  },
  {
    id: 'admisi',
    label: L.admisi,
    labelEn: 'Admissions',
    href: '/pmb',
    icon: ClipboardList,
    mega: {
      layout: 'admissions',
      steps: [
        { label: 'Jadwal Pendaftaran', labelEn: 'Admission Schedule', href: '/pmb#alur', description: 'Gelombang dan tenggat', descriptionEn: 'Waves and deadlines' },
        { label: 'Persyaratan', labelEn: 'Requirements', href: '/pmb#persyaratan', description: 'Dokumen dan kualifikasi', descriptionEn: 'Documents and qualifications' },
        { label: 'Biaya Pendidikan', labelEn: 'Tuition Fees', href: '/pmb#biaya', description: 'Rincian biaya transparan', descriptionEn: 'Transparent fee breakdown' },
        { label: 'Beasiswa', labelEn: 'Scholarships', href: '/pmb#beasiswa', description: 'Potongan dan bantuan biaya', descriptionEn: 'Discounts and financial aid' },
        { label: 'FAQ', labelEn: 'FAQ', href: '/faq', description: 'Pertanyaan yang sering diajukan', descriptionEn: 'Frequently asked questions' },
      ],
      cta: { label: 'Daftar Sekarang', labelEn: 'Register Now', href: '/pmb#daftar' },
    },
  },
  {
    id: 'kampus-virtual',
    label: L.kampusVirtual,
    labelEn: 'Virtual Campus',
    href: '/#kampus',
    icon: Map,
    mega: {
      layout: 'campus',
      columns: [
        {
          title: 'Jelajahi',
          titleEn: 'Explore',
          links: [
            { label: 'Tur 360°', labelEn: '360° Tour', href: '/#kampus', description: 'Berjalan virtual di kampus', descriptionEn: 'Walk through campus virtually' },
            { label: 'Peta Kampus', labelEn: 'Campus Map', href: '/#kampus', description: 'Denah gedung dan fasilitas', descriptionEn: 'Building and facility layout' },
            { label: 'Fasilitas', labelEn: 'Facilities', href: '/tentang#fasilitas', description: 'Lab, perpustakaan, studio', descriptionEn: 'Labs, library, studios' },
          ],
        },
        {
          title: 'Kehidupan Kampus',
          titleEn: 'Campus Life',
          links: [
            { label: 'Galeri', labelEn: 'Gallery', href: '/galeri', description: 'Foto dan video kegiatan', descriptionEn: 'Photos and event videos' },
            { label: 'Prestasi', labelEn: 'Achievements', href: '/prestasi', description: 'Capaian mahasiswa dan dosen', descriptionEn: 'Student and faculty achievements' },
            { label: 'Agenda Kampus', labelEn: 'Campus Events', href: '/#agenda', description: 'Acara dan seminar mendatang', descriptionEn: 'Upcoming events and seminars' },
            { label: 'Berita', labelEn: 'News', href: '/berita', description: 'Kabar terbaru sivitas', descriptionEn: 'Latest campus news' },
          ],
        },
      ],
    },
  },
  {
    id: 'karir',
    label: L.karir,
    labelEn: 'Career',
    href: '/karir',
    icon: Briefcase,
    mega: {
      layout: 'career',
      columns: [
        {
          title: 'Karier & Industri',
          titleEn: 'Career & Industry',
          links: [
            { label: 'Magang & Industri', labelEn: 'Internship', href: '/karir#magang', description: 'Kolaborasi dengan mitra industri', descriptionEn: 'Industry partnership programs' },
            { label: 'Lowongan Kerja', labelEn: 'Job Openings', href: '/karir#lowongan', description: 'Peluang kerja terbaru', descriptionEn: 'Latest job opportunities' },
            { label: 'Pengembangan Karir', labelEn: 'Career Development', href: '/karir#pengembangan', description: 'Pelatihan dan sertifikasi', descriptionEn: 'Training and certification' },
            { label: 'Alumni', labelEn: 'Alumni', href: '/karir#alumni', description: 'Jejaring lulusan', descriptionEn: 'Graduate network' },
          ],
        },
        {
          title: 'Komunitas',
          titleEn: 'Community',
          links: [
            { label: 'Organisasi Mahasiswa', labelEn: 'Student Organizations', href: '/galeri', description: 'UKM dan himpunan', descriptionEn: 'Student clubs and associations' },
            { label: 'Kompetisi', labelEn: 'Competitions', href: '/prestasi', description: 'Akademik dan non-akademik', descriptionEn: 'Academic and non-academic' },
            { label: 'Prestasi', labelEn: 'Achievements', href: '/prestasi', description: 'Karya sivitas akademika', descriptionEn: 'Academic community works' },
          ],
        },
      ],
    },
  },
  {
    id: 'repository',
    label: L.repository,
    labelEn: 'Repository',
    href: '/repository',
    icon: Database,
    mega: {
      layout: 'repository',
      columns: [
        {
          title: 'Karya Ilmiah',
          titleEn: 'Scholarly Works',
          links: [
            { label: 'Repository', labelEn: 'Repository', href: '/repository', description: 'Skripsi, tugas akhir, dan karya', descriptionEn: 'Theses and other works' },
            { label: 'Jurnal', labelEn: 'Journals', href: '/penelitian', description: 'Publikasi ilmiah kampus', descriptionEn: 'Campus scientific publications' },
            { label: 'Hibah & Riset', labelEn: 'Grants & Research', href: '/penelitian#hibah', description: 'Penelitian dan pengabdian dosen', descriptionEn: 'Faculty research and service' },
            { label: 'E-learning', labelEn: 'E-learning', href: '/akademik#e-learning', description: 'Materi dan modul daring', descriptionEn: 'Online material and modules' },
          ],
        },
      ],
    },
  },
]

/** Semua link di sebuah item (untuk accordion mobile). */
export function megaLinks(item: NavItem): NavLink[] {
  const mega = item.mega
  switch (mega.layout) {
    case 'profile':
    case 'academics':
    case 'campus':
    case 'career':
    case 'repository':
      return mega.columns.flatMap((column) => column.links)
    case 'admissions':
      return mega.steps
    default:
      return []
  }
}

/** Item tanpa children dipakai sebagai link biasa di mobile. */
export function mobileChildren(item: NavItem): NavLink[] {
  return megaLinks(item)
}
