import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export type SearchType = 'fakultas' | 'prodi' | 'dosen' | 'berita' | 'event' | 'faq' | 'page'

export type SearchItem = {
  type: SearchType
  title: string
  excerpt?: string | null
  meta?: string | null
  href: string
}

const PER_TYPE = 40

const PAGES: SearchItem[] = [
  { type: 'page', title: 'Profil Universitas', href: '/tentang' },
  { type: 'page', title: 'Akademik', href: '/akademik' },
  { type: 'page', title: 'Fakultas', href: '/fakultas' },
  { type: 'page', title: 'Program Studi', href: '/program' },
  { type: 'page', title: 'PMB', href: '/pmb' },
  { type: 'page', title: 'Penelitian', href: '/penelitian' },
  { type: 'page', title: 'Karir & Kemitraan', href: '/karir' },
  { type: 'page', title: 'Berita', href: '/berita' },
  { type: 'page', title: 'FAQ', href: '/faq' },
  { type: 'page', title: 'Kontak', href: '/kontak' },
  { type: 'page', title: 'Galeri', href: '/galeri' },
  { type: 'page', title: 'Prestasi', href: '/prestasi' },
]

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const q = request.nextUrl.searchParams.get('q')?.trim()

    const likeFilter = (field: string) => (q ? { [field]: { like: q } } : {})

    const [faculties, prodi, dosen, news, events, faqs] = await Promise.all([
      payload.find({
        collection: 'faculties',
        where: likeFilter('name'),
        limit: PER_TYPE,
        sort: 'name',
        select: { name: true, slug: true, excerpt: true, code: true },
      }),
      payload.find({
        collection: 'prodi',
        where: likeFilter('title'),
        limit: PER_TYPE,
        sort: 'title',
        select: { title: true, slug: true, excerpt: true, degree: true },
      }),
      payload.find({
        collection: 'dosen',
        where: likeFilter('name'),
        limit: PER_TYPE,
        sort: 'name',
        select: { name: true, slug: true, bio: true, title: true },
      }),
      payload.find({
        collection: 'news',
        where: likeFilter('title'),
        limit: PER_TYPE,
        sort: '-publishedAt',
        select: { title: true, slug: true, excerpt: true },
      }),
      payload.find({
        collection: 'events',
        where: likeFilter('title'),
        limit: PER_TYPE,
        sort: 'startsAt',
        select: { title: true, slug: true, excerpt: true, location: true },
      }),
      payload.find({
        collection: 'faqs',
        where: likeFilter('question'),
        limit: PER_TYPE,
        sort: 'order',
        select: { question: true, answer: true },
      }),
    ])

    const items: SearchItem[] = [
      ...faculties.docs.map((d) => ({
        type: 'fakultas' as const,
        title: d.name,
        excerpt: d.excerpt,
        meta: d.code,
        href: `/fakultas#${d.slug}`,
      })),
      ...prodi.docs.map((d) => ({
        type: 'prodi' as const,
        title: d.title,
        excerpt: d.excerpt,
        meta: d.degree,
        href: '/program',
      })),
      ...dosen.docs.map((d) => ({
        type: 'dosen' as const,
        title: d.name,
        excerpt: d.bio,
        meta: d.title,
        href: '/dosen',
      })),
      ...news.docs.map((d) => ({
        type: 'berita' as const,
        title: d.title,
        excerpt: d.excerpt,
        href: '/berita',
      })),
      ...events.docs.map((d) => ({
        type: 'event' as const,
        title: d.title,
        excerpt: d.excerpt,
        meta: d.location,
        href: '/#agenda',
      })),
      ...faqs.docs.map((d) => ({
        type: 'faq' as const,
        title: d.question,
        excerpt: d.answer,
        href: '/faq',
      })),
      ...PAGES.filter((p) => (q ? p.title.toLowerCase().includes(q.toLowerCase()) : true)),
    ]

    return NextResponse.json({ items })
  } catch (error) {
    console.error('search error:', error)
    return NextResponse.json({ items: [], error: 'server_error' }, { status: 500 })
  }
}
