import { CONTENT_TAG } from '../constants'

/**
 * Bust the tagged content cache after a CMS write.
 * Guarded so it is a no-op when Payload runs outside the Next.js
 * request scope (CLI commands, seed scripts).
 */
export async function revalidateContent(): Promise<void> {
  if (!process.env.NEXT_RUNTIME) return
  try {
    const { revalidateTag } = await import('next/cache')
    revalidateTag(CONTENT_TAG, 'max')
  } catch {
    // never break a CMS write because of cache revalidation
  }
}

/** Attach to every public collection/global so edits go live immediately. */
export const revalidateHook = {
  afterChange: [async () => { await revalidateContent() }],
  afterDelete: [async () => { await revalidateContent() }],
}
