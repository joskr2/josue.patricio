import { type NextRequest, NextResponse } from 'next/server'

import { defaultLocale, isLocale, type Locale, localizedPath } from '@/lib/i18n'

const LOCALE_COOKIE = 'locale'

function preferredLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(fromCookie)) return fromCookie

  const accept = request.headers.get('accept-language')?.toLowerCase() ?? ''
  return accept.includes('es') ? 'es' : defaultLocale
}

/**
 * Every page lives under a locale segment. This redirects locale-less URLs
 * ("/about", the legacy shape of the site) into the visitor's language, and
 * remembers an explicit switch so the next visit to "/" lands there.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/')[1]

  if (isLocale(segment)) return NextResponse.next()

  const locale = preferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = localizedPath(locale, pathname)

  const response = NextResponse.redirect(url, 308)
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  // Skip framework internals, API routes, the generated share image and any
  // request for a file (CV PDFs, favicon, robots.txt, sitemap.xml).
  matcher: ['/((?!_next/|api/|og|.*\\..*).*)'],
}
