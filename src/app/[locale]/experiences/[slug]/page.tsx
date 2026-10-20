import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ExperienceDetail } from '@/components/ExperienceDetail'
import { experiences } from '@/lib/experience-data'
import {
  type Locale,
  languageAlternates,
  localizedPath,
  ogLocale,
} from '@/lib/i18n'
import { resolveLocale, shareImage } from '@/lib/metadata'
import { siteUrl } from '@/lib/personal-data'
import { slugify } from '@/lib/slugify'

type Params = { params: Promise<{ locale: string; slug: string }> }

function findExperience(slug: string) {
  return experiences.find((experience) => slugify(experience.company) === slug)
}

// Every experience page is known at build time, so they are prerendered instead
// of rendered on demand. The locale combinations come from the layout.
export function generateStaticParams() {
  return experiences.map((experience) => ({
    slug: slugify(experience.company),
  }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: segment, slug } = await params
  const locale: Locale = resolveLocale(segment)
  const experience = findExperience(slug)

  if (!experience) {
    return { title: 'Experience not found' }
  }

  const path = `/experiences/${slug}`
  const canonical = localizedPath(locale, path)
  const role = `${experience.position[locale]} · ${experience.company}`
  const description =
    experience.description[locale].slice(0, 2).join(' ').slice(0, 160).trim() ||
    role
  // A page that declares `openGraph` replaces the inherited object wholesale, so
  // the generated share image has to be referenced again here.
  const image = shareImage(role)

  return {
    title: role,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'article',
      url: `${siteUrl}${canonical}`,
      title: `${role} - Josue Retamozo`,
      description,
      locale: ogLocale(locale),
      alternateLocale: ogLocale(locale === 'es' ? 'en' : 'es'),
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
