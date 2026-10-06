import type { Metadata } from 'next'

import { ExperiencesClient } from '@/components/ExperiencesClient'

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'My professional journey and work experience across banking, insurance, retail, and e-commerce.',
  alternates: { canonical: '/experiences' },
}

export default function ExperiencesPage() {
  return <ExperiencesClient />
}
