import type { Locale } from './i18n'
import { defaultLocale } from './i18n'

const LOCALE_COOKIE = 'locale'

export function getLocaleFromCookie(cookieHeader: string | null): Locale {
  if (!cookieHeader) return defaultLocale

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {} as Record<string, string>)

  const stored = cookies[LOCALE_COOKIE]
  if (stored === 'en' || stored === 'es') {
    return stored
  }

  return defaultLocale
}

export function createLocaleCookie(locale: Locale): string {
  return `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}