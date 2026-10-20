'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useTranslation } from '@/hooks/useTranslation'
import { localizedPath } from '@/lib/i18n'

export default function NotFound() {
  const { t, locale } = useTranslation()

  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-base text-zinc-400 dark:text-zinc-500">
          404
        </p>
        <h1 className="mt-4 font-bold text-[clamp(1.75rem,7vw,3rem)] text-zinc-800 tracking-tight dark:text-zinc-100">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          {t('notFound.description')}
        </p>
        <Button
          href={localizedPath(locale, '/')}
          variant="secondary"
          className="mt-4"
        >
          {t('notFound.backHome')}
        </Button>
      </div>
    </Container>
  )
}
