import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE

  if (isLoggedIn) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/shop/:path*', '/orders/:path*', '/qa-challenge/:path*', '/cart/:path*']
}
