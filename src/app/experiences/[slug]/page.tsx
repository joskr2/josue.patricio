import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ExperienceDetail } from '@/components/ExperienceDetail'
import { experiences } from '@/lib/experience-data'
import { personalInfo, siteUrl } from '@/lib/personal-data'
import { slugify } from '@/lib/slugify'

type Params = { params: Promise<{ slug: string }> }

function findExperience(slug: string) {
  return experiences.find((experience) => slugify(experience.company) === slug)
}

// Every experience page is known at build time, so they are prerendered instead
// of rendered on demand.
export function generateStaticParams() {
  return experiences.map((experience) => ({
    slug: slugify(experience.company),
  }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const experience = findExperience(slug)

  if (!experience) {
    return { title: 'Experience not found' }
  }

  const role = `${experience.position.en} at ${experience.company}`
  const description =
    experience.description.en.slice(0, 2).join(' ').slice(0, 160).trim() ||
    `${experience.position.en} at ${experience.company} (${experience.duration.en}).`
  const path = `/experiences/${slug}`
  // A page that declares `openGraph` replaces the inherited object wholesale, so
  // the generated share image has to be referenced again here.
  const image = {
    url: `${siteUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${personalInfo.name} - ${personalInfo.title.en}`,
  }

  return {
    title: role,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: `${siteUrl}${path}`,
      title: `${role} - Josue Retamozo`,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${role} - Josue Retamozo`,
      description,
      images: [image],
    },
  }
}

export default async function ExperiencePage({ params }: Params) {
  const { slug } = await params
  const experience = findExperience(slug)

  if (!experience) {
    notFound()
  }

  return <ExperienceDetail experience={experience} />
}
