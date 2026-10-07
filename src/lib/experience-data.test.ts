import { describe, expect, it } from 'vitest'

import { experiences } from '@/lib/experience-data'
import { slugify } from '@/lib/slugify'

const URL_SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

describe('experience slugs', () => {
  it('gives every experience a non-empty, URL-safe slug', () => {
    for (const experience of experiences) {
      const slug = slugify(experience.company)

      expect(slug).not.toBe('')
      expect(slug).toMatch(URL_SAFE_SLUG)
    }
  })

  it('never assigns the same slug to two experiences', () => {
    const slugs = experiences.map((experience) => slugify(experience.company))

    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
