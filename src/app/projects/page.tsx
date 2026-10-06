import type { Metadata } from 'next'

import { ProjectsClient } from '@/components/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected frontend and full-stack projects, including a microservices-based sports betting platform.',
  alternates: { canonical: '/projects' },
}

export default function Projects() {
  return <ProjectsClient />
}
