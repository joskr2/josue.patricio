import type { Metadata } from 'next'

import { ContactClient } from '@/components/ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Josue Retamozo for collaboration, roles, and freelance work.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return <ContactClient />
}
