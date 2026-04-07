import { personalInfo } from '@/lib/personal-data'
import { projects } from '@/lib/projects-data'
import { HomeClient } from '@/components/HomeClient'
import portraitImage from '@/images/portrait.webp'
import image1 from '@/images/photos/image-1.webp'
import image2 from '@/images/photos/image-2.webp'
import image3 from '@/images/photos/image-3.webp'
import image4 from '@/images/photos/image-4.webp'

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
        { src: image1, alt: 'Gallery 1' },
        { src: image2, alt: 'Gallery 2' },
        { src: image3, alt: 'Gallery 3' },
        { src: image4, alt: 'Gallery 4' },
      ]}
    />
  )
}
