import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Achievements } from './server/collections/Achievements'
import { Applications } from './server/collections/Applications'
import { Categories } from './server/collections/Categories'
import { ContactSubmissions } from './server/collections/ContactSubmissions'
import { Dosen } from './server/collections/Dosen'
import { Events } from './server/collections/Events'
import { Faculties } from './server/collections/Faculties'
import { Faqs } from './server/collections/Faqs'
import { Media } from './server/collections/Media'
import { News } from './server/collections/News'
import { PpdbDocuments } from './server/collections/PpdbDocuments'
import { Prodi } from './server/collections/Prodi'
import { Subscribers } from './server/collections/Subscribers'
import { Testimonials } from './server/collections/Testimonials'
import { Users } from './server/collections/Users'
import { Footer } from './server/globals/Footer'
import { Homepage } from './server/globals/Homepage'
import { Navigation } from './server/globals/Navigation'
import { SiteSettings } from './server/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · CMS',
    },
  },
  collections: [
    Users,
    Media,
    PpdbDocuments,
    Faculties,
    Prodi,
    Dosen,
    Categories,
    News,
    Events,
    Achievements,
    Testimonials,
    Faqs,
    Applications,
    ContactSubmissions,
    Subscribers,
  ],
  globals: [SiteSettings, Homepage, Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'insecure-dev-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'server/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: { url: process.env.PAYLOAD_DB_URL || 'file:./payload.db' },
  }),
  sharp,
  telemetry: false,
})
