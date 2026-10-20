import { personalInfo, siteUrl, skills } from '@/lib/personal-data'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  alternateName: 'Josue Retamozo',
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: personalInfo.title.en,
  description: personalInfo.summary.en,
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

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be raw script content; the payload is serialized from local constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
