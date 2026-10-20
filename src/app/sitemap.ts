import type { MetadataRoute } from 'next'

import { experiences } from '@/lib/experience-data'
import { languageAlternates, locales, localizedPath } from '@/lib/i18n'
import { siteUrl } from '@/lib/personal-data'
import { slugify } from '@/lib/slugify'

type Entry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const entries: Entry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/experiences', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  ...experiences.map((experience) => ({
    path: `/experiences/${slugify(experience.company)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Every page exists once per language and each copy points at the others, so
  // search engines can pick the right one instead of treating them as dupes.
  return entries.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
