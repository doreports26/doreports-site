import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { abs } from '@/lib/seo/config'

// Caching: `revalidate` (ISR) is the correct control here. Metadata route files (sitemap.ts, robots.ts)
// cannot set custom response headers. If a specific Cache-Control is ever needed, set it with
// `headers()` in next.config for source '/sitemap.xml'. The Sanity webhook in Step 10 revalidates the
// 'sitemap' tag on every publish, so 300s is only the fallback.
export const revalidate = 300

const ARTICLES = /* groq */ `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    "slug": slug.current, publishedAt, _updatedAt, "image": mainImage.asset->url
  }`

const CATEGORIES = /* groq */ `*[_type == "category" && defined(slug.current)] {
    "slug": slug.current,
    "lastmod": coalesce(
      *[_type == "article" && references(^._id)] | order(publishedAt desc)[0].publishedAt, _updatedAt)
  }`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    client.fetch<{ slug: string; publishedAt: string; _updatedAt?: string; image?: string }[]>(
      ARTICLES, {}, { next: { revalidate: 300, tags: ['sitemap'] } }),
    client.fetch<{ slug: string; lastmod: string }[]>(
      CATEGORIES, {}, { next: { revalidate: 300, tags: ['sitemap'] } }),
  ])

  const newest = articles[0]?.publishedAt

  const staticPages: MetadataRoute.Sitemap = [
    { url: abs('/'), lastModified: newest },
    { url: abs('/about') },
    { url: abs('/contact') },
    { url: abs('/disclaimer') },
    { url: abs('/privacy-policy') },
  ]

  return [
    ...staticPages,
    ...categories.map((c) => ({
      url: abs(`/category/${(c.slug === 'trending' ? 'important' : c.slug).toLowerCase()}`),
      lastModified: c.lastmod,
    })),
    ...articles.map((a) => ({
      url: abs(`/article/${a.slug.toLowerCase()}`),
      lastModified: a._updatedAt ?? a.publishedAt,
      ...(a.image ? { images: [a.image] } : {}),
    })),
  ]
}
