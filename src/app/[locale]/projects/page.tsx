import type { Metadata } from 'next'

import { ProjectsClient } from '@/components/ProjectsClient'
import { buildPageMetadata, resolveLocale } from '@/lib/metadata'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale: resolveLocale(locale),
    path: '/projects',
    key: 'projects',
  })
}

export default function Projects() {
  return <ProjectsClient />
}
