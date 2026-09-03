import { createImageUrlBuilder } from '@sanity/image-url'
import { client, isSanityConfigured } from './client'

const builder = isSanityConfigured ? createImageUrlBuilder(client) : null

export interface ImageUrlBuilderResult {
  width: (w: number) => ImageUrlBuilderResult
  height: (h: number) => ImageUrlBuilderResult
  url: () => string
}

/**
 * Generate an image URL from a Sanity image reference.
 * Usage: urlFor(doc.mainImage).width(1200).url()
 */
export function urlFor(source: unknown): ImageUrlBuilderResult {
  if (!source) {
    const emptyResult: ImageUrlBuilderResult = {
      width: () => emptyResult,
      height: () => emptyResult,
      url: () => '',
    }
    return emptyResult
  }

  if (!builder) {
    const fallbackUrl =
      typeof source === 'string'
        ? source
        : (source as { asset?: { url?: string } })?.asset?.url ||
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop'
    const fallbackResult: ImageUrlBuilderResult = {
      width: () => fallbackResult,
      height: () => fallbackResult,
      url: () => fallbackUrl,
    }
    return fallbackResult
  }

  return builder.image(source as Parameters<typeof builder.image>[0]) as unknown as ImageUrlBuilderResult
}
