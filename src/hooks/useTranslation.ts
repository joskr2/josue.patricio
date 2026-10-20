import { useCallback, useMemo } from 'react'
import { useLocale } from '@/contexts/LocaleContext'
import { getTranslation, lookupTranslation } from '@/lib/i18n'

export function useTranslation() {
  const { locale } = useLocale()

  const t = useCallback(
    (key: string): string => {
      return getTranslation(locale, key)
    },
    [locale],
  )

  const tArray = useMemo(() => {
    return (key: string): string[] => {
      const value = lookupTranslation(locale, key)
      return Array.isArray(value) ? [...value] : []
    }
  }, [locale])

  return { t, tArray, locale }
}
