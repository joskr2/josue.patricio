'use client'

import clsx from 'clsx'
import { useLocale } from '@/contexts/LocaleContext'
import { useTranslation } from '@/hooks/useTranslation'
import type { Locale } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale, isPending } = useLocale()
  const { t } = useTranslation()

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  return (
    <div
      aria-busy={isPending}
      className={clsx(
        'flex items-center space-x-1.5 rounded-lg bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-opacity duration-150 dark:bg-zinc-800/90 dark:ring-white/10',
        // The navigation takes a round trip; dimming on click is the feedback
        // that used to be missing until the new page finally painted.
        isPending ? 'cursor-progress opacity-60' : null,
      )}
    >
      <button
        type="button"
        onClick={() => handleLocaleChange('en')}
        className={clsx(
          'flex min-h-11 min-w-11 items-center justify-center rounded px-3 font-medium text-sm transition-colors',
          locale === 'en'
            ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
            : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
        )}
        aria-label={t('a11y.switchToEnglish')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLocaleChange('es')}
        className={clsx(
          'flex min-h-11 min-w-11 items-center justify-center rounded px-3 font-medium text-sm transition-colors',
          locale === 'es'
            ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
            : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
        )}
        aria-label={t('a11y.switchToSpanish')}
        aria-pressed={locale === 'es'}
      >
        ES
      </button>
    </div>
  )
}
