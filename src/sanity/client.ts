import { createClient } from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

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
