import type { Metadata } from 'next'
import { AboutClient } from '@/components/AboutClient'
import portraitImage from '@/images/portrait.webp'
import { experiences } from '@/lib/experience-data'
import { personalInfo } from '@/lib/personal-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Josue Retamozo: experience, skills, education, and certifications.',
  alternates: { canonical: '/about' },
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
