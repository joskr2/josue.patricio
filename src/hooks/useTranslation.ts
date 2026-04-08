import { useCallback, useMemo } from 'react'
import { translations, type Locale } from '@/lib/i18n'
import { useLocale } from '@/contexts/LocaleContext'

export function useTranslation() {
  const { locale, setLocale } = useLocale()

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.')
      // biome-ignore lint/suspicious/noExplicitAny: required for dynamic property access
      let value: any = translations[locale]

      for (const k of keys) {
        value = value?.[k]
      }

      return value || key
    },
    [locale],
  )

  const tArray = useMemo(() => {
    return (key: string): string[] => {
      const keys = key.split('.')
      // biome-ignore lint/suspicious/noExplicitAny: required for dynamic property access
      let value: any = translations[locale]

      for (const k of keys) {
        value = value?.[k]
      }

      return Array.isArray(value) ? value : []
    }
  }, [locale])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    // Force a full page reload to get SSR with new locale
    window.location.href = window.location.pathname
  }

  return { t, tArray, locale, setLocale: changeLocale }
}
