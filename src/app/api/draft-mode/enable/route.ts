import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const secret = searchParams.get('secret')

  // Optional secret validation if SANITY_PREVIEW_SECRET is set
  const previewSecret = process.env.SANITY_PREVIEW_SECRET
  if (previewSecret && secret !== previewSecret) {
    return new NextResponse('Invalid preview token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  if (slug) {
    redirect(`/article/${encodeURIComponent(slug)}`)
  }

  redirect('/')
}
