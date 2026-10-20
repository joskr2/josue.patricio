import type { Locale } from '@/lib/i18n'
import { personalInfo, siteUrl, skills } from '@/lib/personal-data'

export function PersonJsonLd({ locale }: { locale: Locale }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    alternateName: 'Josue Retamozo',
    url: siteUrl,
    image: `${siteUrl}/og`,
    jobTitle: personalInfo.title[locale],
    description: personalInfo.summary[locale],
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    sameAs: [personalInfo.linkedin, personalInfo.github],
    knowsLanguage: skills.languages.map((language) => language.name),
    knowsAbout: [
      ...skills.highlights.frontend,
      ...skills.highlights.backend,
      ...skills.highlights.infrastructure,
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'TECSUP',
    },
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be raw script content; the payload is serialized from local constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
