import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { PersonJsonLd } from '@/components/PersonJsonLd'
import { isLocale, locales } from '@/lib/i18n'
import { resolveLocale } from '@/lib/metadata'
import { siteUrl } from '@/lib/personal-data'

import '@/styles/tailwind.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Josue Retamozo',
    default: 'Josue Retamozo - Software Engineer | React, .NET, Java',
  },
  robots: { index: true, follow: true },
  keywords: [
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    '.NET',
    'C#',
    'Java',
    'GeneXus',
    'SQL Server',
    'Microservices',
    'Frontend',
  ],
  authors: [{ name: 'Josue Patricio Retamozo Vargas' }],
  creator: 'Josue Retamozo',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}) {
  const { locale: segment } = await params

  // Unknown locales are a 404. Next also renders the synthetic /_not-found
  // route through this layout with no params, so an absent segment falls back
  // to the default language instead of throwing.
  if (segment !== undefined && !isLocale(segment)) {
    notFound()
  }
  const locale = resolveLocale(segment)

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Pre-paint theme bootstrap. async + blocking="render" guarantees it
            runs before the first paint, and React 19 treats async-src scripts
            as deduplicated resources, so soft navigations reuse the existing
            tag instead of re-creating it (which would trip React 19.3's
            client-rendered <script> warning). */}
        <script async src="/theme-init.js" blocking="render" />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <PersonJsonLd locale={locale} />
        <Providers locale={locale}>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
