import { createClient } from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'
export const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN

export const isSanityConfigured = Boolean(
  projectId && projectId !== 'your-sanity-project-id' && projectId !== 'placeholder-project-id'
)

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder-id',
  dataset,
  apiVersion,
  // Use CDN for fast reads — ideal for a public news site
  useCdn: process.env.NODE_ENV === 'production',
})

/**
 * Returns a configured Sanity client, optionally with draft perspective
 * and auth token for previewing unpublished documents.
 */
export function getSanityClient(options?: { isDraftMode?: boolean; token?: string }) {
  const useDraft = options?.isDraftMode
  const authToken = options?.token || token

  if (useDraft) {
    return client.withConfig({
      useCdn: false,
      token: authToken || undefined,
      perspective: 'previewDrafts',
    })
  }

  return client
}

