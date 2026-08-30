import { createImageUrlBuilder } from '@sanity/image-url'
import { client, isSanityConfigured } from './client'

const builder = isSanityConfigured ? createImageUrlBuilder(client) : null

/**
 * Generate an image URL from a Sanity image reference.
 * Usage: urlFor(doc.mainImage).width(1200).url()
 */
export function urlFor(source: any) {
  if (!source) {
    return {
      width: () => ({ height: () => ({ url: () => '' }), url: () => '' }),
      height: () => ({ width: () => ({ url: () => '' }), url: () => '' }),
      url: () => '',
    } as any
  }

  if (!builder) {
    const fallbackUrl =
      typeof source === 'string'
        ? source
        : source?.asset?.url || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop'
    return {
      width: () => ({ height: () => ({ url: () => fallbackUrl }), url: () => fallbackUrl }),
      height: () => ({ width: () => ({ url: () => fallbackUrl }), url: () => fallbackUrl }),
      url: () => fallbackUrl,
    } as any
  }

  return builder.image(source)
}
