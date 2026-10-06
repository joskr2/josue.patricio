import type { MetadataRoute } from 'next'

import { experiences } from '@/lib/experience-data'
import { siteUrl } from '@/lib/personal-data'
import { slugify } from '@/lib/slugify'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/experiences`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((exp) => ({
    url: `${siteUrl}/experiences/${slugify(exp.company)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...experienceRoutes]
}
