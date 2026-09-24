import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { abs, SITE } from '@/lib/seo/config'

export const revalidate = 300

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export async function GET() {
  const articles = await client.fetch<{
    title: string
    slug: string
    publishedAt: string
    excerpt?: string
    snippet?: string
    author?: { name?: string }
  }[]>(
    `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))]
      | order(publishedAt desc)[0...50] {
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        snippet,
        author->{name}
      }`
  )

  const items = articles
    .map((a) => {
      const link = abs(`/article/${a.slug.toLowerCase()}`)
      const desc = esc(a.excerpt || a.snippet || a.title)
      const title = esc(a.title)
      const pubDate = new Date(a.publishedAt).toUTCString()
      const author = esc(a.author?.name || SITE.name)

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${desc}</description>
      <author>${author}</author>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} | ताज्या मराठी बातम्या</title>
    <link>${SITE.url}</link>
    <description>महाराष्ट्रातील ताज्या आणि महत्त्वपूर्ण घडामोडी, कल्याण-डोंबिवली, राजकारण, शिक्षण आणि क्रीडा क्षेत्रातील बातम्या.</description>
    <language>mr</language>
    <atom:link href="${abs('/feed.xml')}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
