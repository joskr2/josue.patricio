'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useMemo, useTransition } from 'react'
import { type Locale, localizedPath, unlocalizedPath } from '@/lib/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** True while the navigation to the other language is in flight. */
  isPending: boolean
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const value = useMemo<LocaleContextType>(
    () => ({
      locale,
      isPending,
      // Switching language is a navigation between prerendered routes, not a
      // client-only state flip: the server has to re-render the tree in the
      // other language so the URL, the metadata and <html lang> agree.
      setLocale: (next: Locale) => {
        if (next === locale) return
        // Remember the choice for the locale-less entry points ("/", legacy
        // links), which the proxy resolves before any page renders.
        // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is not available in Safari or Firefox, and this first-party preference cookie is what makes the locale-less entry points follow the last explicit choice.
        document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`
        // Inside a transition so `isPending` stays true until the new tree is
        // ready, which is what lets the switcher react on click instead of
        // looking frozen for the length of the round trip.
        startTransition(() => {
          router.push(localizedPath(next, unlocalizedPath(pathname)))
        })
      },
    }),
    [locale, isPending, pathname, router],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
