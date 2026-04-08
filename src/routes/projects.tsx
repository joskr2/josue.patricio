import { createFileRoute } from '@tanstack/react-router'
import { ProjectsClient } from '@/components/ProjectsClient'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return <ProjectsClient />
}