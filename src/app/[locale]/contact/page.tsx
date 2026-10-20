import type { Metadata } from 'next'

import { ContactClient } from '@/components/ContactClient'
import { buildPageMetadata, resolveLocale } from '@/lib/metadata'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale: resolveLocale(locale),
    path: '/contact',
    key: 'contact',
  })
}

export default function Contact() {
  return <ContactClient />
}
