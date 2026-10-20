import type { Metadata } from 'next'

import { AboutClient } from '@/components/AboutClient'
import portraitImage from '@/images/portrait.webp'
import { experiences } from '@/lib/experience-data'
import { buildPageMetadata, resolveLocale } from '@/lib/metadata'
import { personalInfo } from '@/lib/personal-data'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale: resolveLocale(locale),
    path: '/about',
    key: 'about',
  })
}

export default async function About() {
  return (
    <AboutClient
      personalInfo={{
        name: personalInfo.name,
        title: personalInfo.title,
        summary: personalInfo.summary,
        email: personalInfo.email,
        linkedin: personalInfo.linkedin,
        github: personalInfo.github,
        portraitImage: portraitImage,
      }}
      experiences={experiences}
    />
  )
}
