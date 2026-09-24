import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { abs, SITE } from '@/lib/seo/config'

export const revalidate = 120

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export async function GET() {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()

  const posts = await client.fetch<{ title: string; slug: string; publishedAt: string }[]>(
    /* groq */ `*[_type == "article" && defined(slug.current) && publishedAt >= $since && !(_id in path("drafts.**"))]
      | order(publishedAt desc)[0...1000] { title, "slug": slug.current, publishedAt }`,
    { since },
    { next: { revalidate: 120, tags: ['sitemap'] } },
  )

  const items = posts
    .map(
      (p) => `  <url>
    <loc>${abs(`/article/${p.slug.toLowerCase()}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.name)}</news:name>
        <news:language>mr</news:language>
      </news:publication>
      <news:publication_date>${new Date(p.publishedAt).toISOString()}</news:publication_date>
      <news:title>${esc(p.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
    },
  })
}
