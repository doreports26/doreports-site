import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const redirectUrl = searchParams.get('redirect')

  const draft = await draftMode()
  draft.disable()

  if (redirectUrl) {
    redirect(redirectUrl)
  }

  if (slug) {
    redirect(`/article/${encodeURIComponent(slug)}`)
  }

  redirect('/')
}
