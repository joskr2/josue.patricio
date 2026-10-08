'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { defaultLocale, detectLocale, type Locale } from '@/lib/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // Reconcile the detected locale after mount. The initial client render stays
  // defaultLocale so it matches the server HTML.
  useEffect(() => {
    // biome-ignore lint/nursery/useReactCompiler: mount-time reconciliation of the locale from localStorage/system preference; it must run after hydration so the first client render matches the prerendered HTML.
    setLocaleState(detectLocale())
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
