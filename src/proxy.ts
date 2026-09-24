import { NextResponse, type NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, 308)
  }
}

export const config = { matcher: ['/article/:path*', '/category/:path*'] }
