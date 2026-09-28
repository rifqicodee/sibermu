import { cache } from 'react'
import { getPayload, type Where } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'

import { CONTENT_TAG } from './constants'
import type {
  Achievement,
  Category,
  Dosen,
  Event,
  Faq,
  Faculty,
  News,
  Prodi,
  Testimonial,
} from './payload-types'
import type { Homepage, Navigation, SiteSettings, Footer } from './globals-types'

const payload = () => getPayload({ config })

function cached<T>(key: unknown, fn: () => Promise<T>): Promise<T> {
  return unstable_cache(fn, [typeof key === 'string' ? key : JSON.stringify(key)], {
    tags: [CONTENT_TAG],
    revalidate: false,
  })()
}

/* ---------------------------------- globals --------------------------------- */

export const getSiteSettings = cache(() =>
  cached('site-settings', async () => {
    return (await payload()).findGlobal({ slug: 'site-settings' }) as unknown as SiteSettings
  }),
)

export const getHomepage = cache(() =>
  cached('homepage', async () => {
    return (await payload()).findGlobal({ slug: 'homepage' }) as unknown as Homepage
  }),
)

export const getNavigation = cache(() =>
  cached('navigation', async () => {
    return (await payload()).findGlobal({ slug: 'navigation' }) as unknown as Navigation
  }),
)

export const getFooter = cache(() =>
  cached('footer', async () => {
    return (await payload()).findGlobal({ slug: 'footer' }) as unknown as Footer
  }),
)

/* --------------------------------- faculties -------------------------------- */

type FacultyQuery = { limit?: number; featured?: boolean; q?: string }

export const getFaculties = cache((query: FacultyQuery = {}) =>
  cached(['faculties', query], async () => {
    const where: Where = {}
    if (query.featured) where.featured = { equals: true }
    if (query.q) where.or = [{ name: { like: query.q } }, { dean: { like: query.q } }]
    const res = await (await payload()).find({
      collection: 'faculties',
      where,
      limit: query.limit ?? 24,
      sort: 'name',
    })
    return res.docs as Faculty[]
  }),
)

export const getFacultyBySlug = cache((slug: string) =>
  cached(['faculty', slug], async () => {
    const res = await (await payload()).find({
      collection: 'faculties',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (res.docs[0] ?? null) as Faculty | null
  }),
)

/* ---------------------------------- prodi ----------------------------------- */

type ProdiQuery = { limit?: number; featured?: boolean; faculty?: string; degree?: string; q?: string }

export const getProdi = cache((query: ProdiQuery = {}) =>
  cached(['prodi', query], async () => {
    const where: Where = {}
    if (query.featured) where.featured = { equals: true }
    if (query.degree) where.degree = { equals: query.degree }
    if (query.faculty) where['faculty.slug'] = { equals: query.faculty }
    if (query.q) {
      where.or = [{ title: { like: query.q } }, { code: { like: query.q } }]
    }
    const res = await (await payload()).find({
      collection: 'prodi',
      where,
      limit: query.limit ?? 50,
      sort: 'title',
    })
    return res.docs as Prodi[]
  }),
)

export const getProdiBySlug = cache((slug: string) =>
  cached(['prodi-item', slug], async () => {
    const res = await (await payload()).find({
      collection: 'prodi',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (res.docs[0] ?? null) as Prodi | null
  }),
)

/* ---------------------------------- events ---------------------------------- */

export const getEvents = cache((query: { limit?: number; featured?: boolean; upcoming?: boolean } = {}) =>
  cached(['events', query], async () => {
    const where: Where = {}
    if (query.featured) where.featured = { equals: true }
    if (query.upcoming) where.startsAt = { greater_than_equal: new Date().toISOString() }
    const res = await (await payload()).find({
      collection: 'events',
      where,
      limit: query.limit ?? 6,
      sort: 'startsAt',
    })
    return res.docs as Event[]
  }),
)

/* ----------------------------------- news ----------------------------------- */

type NewsQuery = {
  limit?: number
  page?: number
  category?: string
  featured?: boolean
  q?: string
  faculty?: string
}

export const getNews = cache((query: NewsQuery = {}) =>
  cached(['news', query], async () => {
    const where: Where = {}
    if (query.category) where['category.slug'] = { equals: query.category }
    if (query.featured) where.featured = { equals: true }
    if (query.faculty) where['faculty.slug'] = { equals: query.faculty }
    if (query.q) {
      where.or = [{ title: { like: query.q } }, { excerpt: { like: query.q } }]
    }
    const res = await (await payload()).find({
      collection: 'news',
      where,
      limit: query.limit ?? 12,
      page: query.page ?? 1,
      sort: '-publishedAt',
    })
    return { docs: res.docs as News[], totalDocs: res.totalDocs, totalPages: res.totalPages, page: res.page }
  }),
)

export const getNewsBySlug = cache((slug: string) =>
  cached(['news-item', slug], async () => {
    const res = await (await payload()).find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (res.docs[0] ?? null) as News | null
  }),
)

export const getCategories = cache(() =>
  cached('categories', async () => {
    const res = await (await payload()).find({ collection: 'categories', sort: 'name', limit: 50 })
    return res.docs as Category[]
  }),
)

/* -------------------------------- achievements ------------------------------ */

export const getAchievements = cache((limit = 20) =>
  cached(['achievements', limit], async () => {
    const res = await (await payload()).find({
      collection: 'achievements',
      limit,
      sort: '-year',
    })
    return res.docs as Achievement[]
  }),
)

/* ----------------------------------- dosen ---------------------------------- */

type DosenQuery = { limit?: number; q?: string; faculty?: string; featured?: boolean }

export const getDosen = cache((query: DosenQuery = {}) =>
  cached(['dosen', query], async () => {
    const where: Where = {}
    if (query.faculty) where['faculty.slug'] = { equals: query.faculty }
    if (query.featured) where.featured = { equals: true }
    if (query.q) where.or = [{ name: { like: query.q } }, { title: { like: query.q } }]
    const res = await (await payload()).find({
      collection: 'dosen',
      where,
      limit: query.limit ?? 48,
      sort: 'name',
    })
    return res.docs as Dosen[]
  }),
)

export const getDosenBySlug = cache((slug: string) =>
  cached(['dosen-item', slug], async () => {
    const res = await (await payload()).find({
      collection: 'dosen',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (res.docs[0] ?? null) as Dosen | null
  }),
)

/* ------------------------------- testimonials -------------------------------- */

export const getTestimonials = cache((limit = 12) =>
  cached(['testimonials', limit], async () => {
    const res = await (await payload()).find({ collection: 'testimonials', limit, sort: 'name' })
    return res.docs as Testimonial[]
  }),
)

/* ----------------------------------- faqs ------------------------------------ */

export const getFaqs = cache((opts: { homepage?: boolean; category?: string } = {}) =>
  cached(['faqs', opts], async () => {
    const where: Where = {}
    if (opts.homepage) where.showOnHomepage = { equals: true }
    if (opts.category) where.category = { equals: opts.category }
    const res = await (await payload()).find({
      collection: 'faqs',
      where,
      limit: 100,
      sort: 'order',
    })
    return res.docs as Faq[]
  }),
)
