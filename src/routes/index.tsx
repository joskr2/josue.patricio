import { createFileRoute } from '@tanstack/react-router'
import { personalInfo } from '@/lib/personal-data'
import { projects } from '@/lib/projects-data'
import { HomeClient } from '@/components/HomeClient'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
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
        portraitImage: '/images/portrait.webp',
      }}
      featuredProject={featuredProject}
      galleryImages={[
        { src: '/images/photos/image-1.webp', alt: 'Gallery 1' },
        { src: '/images/photos/image-2.webp', alt: 'Gallery 2' },
        { src: '/images/photos/image-3.webp', alt: 'Gallery 3' },
        { src: '/images/photos/image-4.webp', alt: 'Gallery 4' },
      ]}
    />
  )
}