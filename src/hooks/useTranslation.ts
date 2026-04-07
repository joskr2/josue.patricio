import { useCallback, useMemo } from 'react'
import { useLocale } from '@/contexts/LocaleContext'
import { cachedGetTranslation, translations } from '@/lib/i18n'

export function useTranslation() {
  const { locale } = useLocale()

  const t = useCallback(
    (key: string): string => {
      return cachedGetTranslation(locale, key)
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

  return { t, tArray, locale }
}
