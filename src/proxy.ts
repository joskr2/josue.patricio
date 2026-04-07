import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Check if locale cookie exists
  const localeCookie = request.cookies.get('locale')
  if (!localeCookie) {
    // Detect from Accept-Language header
    const acceptLang = request.headers.get('accept-language') || ''
    const locale = acceptLang.startsWith('es') ? 'es' : defaultLocale
    response.cookies.set('locale', locale)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
