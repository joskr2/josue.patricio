import { createFileRoute } from '@tanstack/react-router'
import { personalInfo } from '@/lib/personal-data'
import { experiences } from '@/lib/experience-data'
import { AboutClient } from '@/components/AboutClient'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <AboutClient
      personalInfo={{
        name: personalInfo.name,
        title: personalInfo.title,
        summary: personalInfo.summary,
        email: personalInfo.email,
        linkedin: personalInfo.linkedin,
        github: personalInfo.github,
        portraitImage: '/images/portrait.webp',
      }}
      experiences={experiences}
    />
  )
}