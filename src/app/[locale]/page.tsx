import type { Metadata } from 'next'

import { HomeClient } from '@/components/HomeClient'
import image1 from '@/images/photos/image-1.webp'
import image2 from '@/images/photos/image-2.webp'
import image3 from '@/images/photos/image-3.webp'
import image4 from '@/images/photos/image-4.webp'
import portraitImage from '@/images/portrait.webp'
import { buildPageMetadata, resolveLocale } from '@/lib/metadata'
import { personalInfo } from '@/lib/personal-data'
import { projects } from '@/lib/projects-data'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale: resolveLocale(locale),
    path: '/',
    key: 'home',
  })
}

export default async function Home() {
  const featuredProject = projects.find((p) => p.featured)

  return (
    <HomeClient
      personalInfo={{
        name: personalInfo.name,
        title: personalInfo.title,
        location: personalInfo.location,
        email: personalInfo.email,
        phone: personalInfo.phone,
        linkedin: personalInfo.linkedin,
        github: personalInfo.github,
        summary: personalInfo.summary,
        portraitImage: portraitImage,
      }}
      featuredProject={featuredProject}
      galleryImages={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
      ]}
    />
  )
}
