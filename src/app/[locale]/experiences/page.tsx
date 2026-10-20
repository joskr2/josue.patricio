import type { Metadata } from 'next'

import { ExperiencesClient } from '@/components/ExperiencesClient'
import { buildPageMetadata, resolveLocale } from '@/lib/metadata'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale: resolveLocale(locale),
    path: '/experiences',
    key: 'experiences',
  })
}

export default function ExperiencesPage() {
  return <ExperiencesClient />
}
