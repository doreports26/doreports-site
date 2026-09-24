import { NextResponse, type NextRequest } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET

    if (!secret) {
      console.error('Missing SANITY_REVALIDATE_SECRET in environment')
      return new NextResponse('Webhook secret not configured', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<{
      _type?: string
      slug?: string | { current?: string }
      categorySlug?: string | { current?: string }
    }>(req, secret, false)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body) {
      return new NextResponse('Bad request: empty body', { status: 400 })
    }

    const docType = body._type
    const rawSlug = typeof body.slug === 'string' ? body.slug : body.slug?.current
    const slug = rawSlug ? rawSlug.trim().toLowerCase() : ''
    const rawCatSlug = typeof body.categorySlug === 'string' ? body.categorySlug : body.categorySlug?.current
    const categorySlug = rawCatSlug ? rawCatSlug.trim().toLowerCase() : ''

    const revalidated: string[] = []

    // 1. Always revalidate homepage
    revalidatePath('/', 'page')
    revalidated.push('/')

    // 2. Revalidate article path if article
    if (docType === 'article' && slug) {
      const articlePath = `/article/${slug}`
      revalidatePath(articlePath, 'page')
      revalidated.push(articlePath)
    }

    // 3. Revalidate category path if provided or if category document
    if (docType === 'category' && slug) {
      const catPath = `/category/${slug === 'trending' ? 'important' : slug}`
      revalidatePath(catPath, 'page')
      revalidated.push(catPath)
    } else if (categorySlug) {
      const catPath = `/category/${categorySlug === 'trending' ? 'important' : categorySlug}`
      revalidatePath(catPath, 'page')
      revalidated.push(catPath)
    }

    // 4. Revalidate sitemaps tag and paths
    try {
      revalidateTag('sitemap', 'default')
      revalidated.push('tag:sitemap')
    } catch {
      revalidatePath('/sitemap.xml')
      revalidatePath('/news-sitemap.xml')
      revalidated.push('/sitemap.xml', '/news-sitemap.xml')
    }

    return NextResponse.json({
      status: 200,
      revalidated,
      now: Date.now(),
    })
  } catch (err: unknown) {
    console.error('Revalidation error:', err)
    return new NextResponse((err as Error).message, { status: 500 })
  }
}
