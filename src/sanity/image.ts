import { createImageUrlBuilder } from '@sanity/image-url'
import { client, isSanityConfigured } from './client'

const builder = isSanityConfigured ? createImageUrlBuilder(client) : null

type BuilderInstance = NonNullable<typeof builder>
type ImageSource = Parameters<BuilderInstance['image']>[0]

/**
 * Generate an image URL from a Sanity image reference.
 * Usage: urlFor(doc.mainImage).width(1200).height(630).fit('crop').format('jpg').quality(80).url()
 */
export function urlFor(source: unknown) {
  if (!builder || !source) {
    const fallbackUrl =
      typeof source === 'string'
        ? source
        : (source as { asset?: { url?: string } })?.asset?.url ||
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop'

    const chainable = {
      width: () => chainable,
      height: () => chainable,
      fit: () => chainable,
      format: () => chainable,
      quality: () => chainable,
      url: () => (source ? fallbackUrl : ''),
    }
    return chainable as unknown as ReturnType<BuilderInstance['image']>
  }

  return builder.image(source as ImageSource)
}
