import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/textures/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

const config = withPayload(nextConfig, { devBundleServerPackages: false })

/**
 * Payload menyuntikkan `Critical-CH: Sec-CH-Prefers-Color-Scheme`.
 * Pada kunjungan pertama (hint belum ada di browser) Chrome melakukan retry
 * navigasi yang tercatat Lighthouse sebagai "307 Internal Redirect"
 * (audit avoid-multiple-page-redirects). Buang header itu; Accept-CH/Vary
 * tetap dipertahankan agar browser tetap belajar hint tanpa retry.
 */
const payloadHeaders = config.headers
config.headers = async () => {
  const resolved = typeof payloadHeaders === 'function' ? await payloadHeaders() : payloadHeaders ?? []
  return resolved.map((entry) => ({
    ...entry,
    headers: entry.headers.filter((h) => h.key !== 'Critical-CH'),
  }))
}

export default config
