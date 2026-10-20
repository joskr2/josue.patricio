import type { Metadata } from 'next'

import {
  defaultLocale,
  getTranslation,
  isLocale,
  type Locale,
  languageAlternates,
  localizedPath,
  ogLocale,
} from '@/lib/i18n'
import { siteUrl } from '@/lib/personal-data'

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale
}

/**
 * Every page declares its own `openGraph`, which replaces the inherited object
 * wholesale, so the share card is referenced explicitly instead of relying on a
 * file-convention image that would be dropped.
 */
export function shareImage(alt: string) {
  return {
    url: `${siteUrl}/og`,
    width: 1200,
    height: 630,
    alt,
  }
}

type PageMetaOptions = {
  locale: Locale
  /** Locale-independent path, e.g. '/about'. */
  path: string
  /** Key under `meta.*` in the dictionary. */
  key: string
  type?: 'website' | 'article'
}

export function buildPageMetadata({
  locale,
  path,
  key,
  type = 'website',
}: PageMetaOptions): Metadata {
  const title = getTranslation(locale, `meta.${key}.title`)
  const description = getTranslation(locale, `meta.${key}.description`)
  const canonical = localizedPath(locale, path)
  const socialTitle = `${title} - Josue Retamozo`
  const image = shareImage(socialTitle)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url: `${siteUrl}${canonical}`,
      siteName: 'Josue Retamozo',
      title: socialTitle,
      description,
      locale: ogLocale(locale),
      alternateLocale: ogLocale(locale === 'es' ? 'en' : 'es'),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  }
}
