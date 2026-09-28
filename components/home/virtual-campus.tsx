'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

import { Container } from '@/components/shared/container'
import { Reveal } from '@/components/shared/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from 'cn'
import type { Homepage } from '@/server/globals-types'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/messages'

type Building = {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  facilities: string[]
  facilitiesEn: string[]
  x: number
  y: number
  w: number
  h: number
}

const buildings: Building[] = [
  {
    id: 'masjid',
    name: 'Masjid Kampus',
    nameEn: 'Campus Mosque',
    description: 'Pusat kegiatan keagamaan dan shalat berjamaah.',
    descriptionEn: 'Center of religious activities and congregational prayers.',
    facilities: ['Kapasitas 500 jamaah', 'Ruang wudhu', 'Perpustakaan digital'],
    facilitiesEn: ['Capacity of 500 worshippers', 'Ablution area', 'Digital library'],
    x: 330,
    y: 40,
    w: 140,
    h: 90,
  },
  {
    id: 'perpustakaan',
    name: 'Perpustakaan',
    nameEn: 'Library',
    description: 'Koleksi ribuan judul buku, jurnal, dan e-book.',
    descriptionEn: 'Thousands of books, journals, and e-books.',
    facilities: ['Ruang baca 200 kursi', 'E-library', 'Ruang diskusi'],
    facilitiesEn: ['200-seat reading room', 'E-library', 'Discussion rooms'],
    x: 60,
    y: 40,
    w: 150,
    h: 90,
  },
  {
    id: 'lab',
    name: 'Laboratorium & Robotik',
    nameEn: 'Labs & Robotics',
    description: 'Lab komputer, sains, dan bengkel robotik.',
    descriptionEn: 'Computer labs, science labs, and a robotics workshop.',
    facilities: ['Lab komputer 40 unit', 'Lab sains', 'Bengkel robotik'],
    facilitiesEn: ['40-unit computer lab', 'Science lab', 'Robotics workshop'],
    x: 590,
    y: 40,
    w: 150,
    h: 90,
  },
  {
    id: 'kelas',
    name: 'Gedung Kelas',
    nameEn: 'Classroom Building',
    description: 'Ruang kelas modern dengan AC dan proyektor.',
    descriptionEn: 'Modern classrooms with AC and projectors.',
    facilities: ['24 ruang kelas', 'Smartboard', 'AC & Wi-Fi'],
    facilitiesEn: ['24 classrooms', 'Smartboards', 'AC & Wi-Fi'],
    x: 60,
    y: 200,
    w: 230,
    h: 110,
  },
  {
    id: 'aula',
    name: 'Aula Serbaguna',
    nameEn: 'Multi-Purpose Hall',
    description: 'Tempat upacara, seminar, dan kegiatan kemahasiswaan.',
    descriptionEn: 'Ceremonies, seminars, and student activities.',
    facilities: ['Kapasitas 1.000 orang', 'Panggung serbaguna', 'Sound system'],
    facilitiesEn: ['Capacity of 1,000', 'Multipurpose stage', 'Sound system'],
    x: 510,
    y: 200,
    w: 230,
    h: 110,
  },
  {
    id: 'lapangan',
    name: 'Lapangan & Fasilitas',
    nameEn: 'Field & Facilities',
    description: 'Lapangan olahraga, kantin sehat, dan poliklinik.',
    descriptionEn: 'Sports field, healthy canteen, and campus clinic.',
    facilities: ['Lapangan sepak bola', 'Kantin sehat', 'Klinik kampus'],
    facilitiesEn: ['Football field', 'Healthy canteen', 'Campus clinic'],
    x: 60,
    y: 370,
    w: 680,
    h: 90,
  },
]

type VirtualCampusProps = {
  page: Homepage
  locale: Locale
}

export function VirtualCampus({ page, locale }: VirtualCampusProps) {
  const dict = getDictionary(locale)
  const en = locale === 'en'
  const [active, setActive] = useState<Building | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const label = (b: Building, idKey: 'name' | 'description', enKey: 'nameEn' | 'descriptionEn') =>
    en ? b[enKey] : b[idKey]

  return (
    <Section id="kampus" spacing="lg" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Virtual Campus"
          title={en ? dict.campus.title : page.campusTitle ?? dict.campus.title}
          description={en ? dict.campus.description : page.campusSubtitle ?? dict.campus.description}
        />

        <Reveal>
          <div className="glass relative overflow-hidden rounded-card p-3 sm:p-6">
            <svg
              viewBox="0 0 800 500"
              role="img"
              aria-label={dict.campus.petaLabel}
              className="h-auto w-full"
            >
              <defs>
                <linearGradient
                  id="campusBg"
                  x1="0"
                  y1="0"
                  x2="800"
                  y2="500"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--blue-accent)" />
                  <stop offset="1" stopColor="var(--muted)" />
                </linearGradient>
                <linearGradient id="pathBlue" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="var(--blue)" stopOpacity="0.45" />
                  <stop offset="1" stopColor="var(--blue-light)" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              <rect width="800" height="500" fill="url(#campusBg)" rx="16" />

              {/* jalur pedestrian */}
              <g stroke="url(#pathBlue)" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M40 175 H760" />
                <path d="M40 345 H760" />
                <path d="M300 120 V430" />
                <path d="M500 120 V430" />
              </g>

              {/* taman */}
              <g className="fill-blue" fillOpacity={0.12}>
                <circle cx="350" cy="175" r="22" />
                <circle cx="450" cy="175" r="22" />
                <circle cx="400" cy="345" r="26" />
              </g>

              {buildings.map((b) => {
                const isHover = hovered === b.id
                return (
                  <g
                    key={b.id}
                    role="button"
                    tabIndex={0}
                    aria-label={en ? `View details of ${b.nameEn}` : `Lihat detail ${b.name}`}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => setHovered(b.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(b.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setActive(b)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActive(b)
                      }
                    }}
                  >
                    <rect
                      x={b.x}
                      y={b.y}
                      width={b.w}
                      height={b.h}
                      rx="14"
                      className={cn('transition-all duration-200')}
                      fill={isHover ? 'color-mix(in srgb, var(--blue) 18%, transparent)' : 'var(--surface)'}
                      stroke={isHover ? 'var(--blue)' : 'color-mix(in srgb, var(--blue) 35%, transparent)'}
                      strokeWidth={isHover ? 2 : 1}
                    />
                    <text
                      x={b.x + b.w / 2}
                      y={b.y + b.h / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none fill-foreground select-none"
                      fontSize="13"
                      fontWeight="600"
                    >
                      {label(b, 'name', 'nameEn')}
                    </text>
                    <text
                      x={b.x + b.w / 2}
                      y={b.y + b.h / 2 + 20}
                      textAnchor="middle"
                      className="pointer-events-none fill-muted-foreground select-none"
                      fontSize="10"
                    >
                      {dict.campus.klikDetail}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="mt-3 flex items-center justify-between px-2 pb-1 text-xs text-muted-foreground">
              <span>{dict.campus.petunjuk}</span>
              <span className="label-caps text-[0.6rem]">
                {buildings.length} {dict.campus.fasilitas}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-blue-hover">
              {active ? label(active, 'name', 'nameEn') : null}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {active ? label(active, 'description', 'descriptionEn') : null}
            </DialogDescription>
          </DialogHeader>
          <ul className="mt-2 flex flex-col gap-2">
            {(active ? (en ? active.facilitiesEn : active.facilities) : []).map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 rounded-xl bg-blue/5 px-3.5 py-2.5 text-sm"
              >
                <span className="size-1.5 rounded-full bg-blue" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" /> {dict.common.tutup}
          </button>
        </DialogContent>
      </Dialog>
    </Section>
  )
}
