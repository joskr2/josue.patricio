import { personalInfo } from '@/lib/personal-data'
import { experiences } from '@/lib/experience-data'
import { AboutClient } from '@/components/AboutClient'
import portraitImage from '@/images/portrait.webp'

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
