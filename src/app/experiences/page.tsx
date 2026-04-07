'use client'

import { experiences } from '@/lib/experience-data'
import { useTranslation } from '@/hooks/useTranslation'
import { Container } from '@/components/Container'
import { TechBadge } from '@/components/TechBadge'
import { slugify } from '@/lib/slugify'
import Link from 'next/link'

export default function ExperiencesPage() {
  const { locale, t } = useTranslation()

  return (
    <Container className="mt-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('about.experience')}
        </h1>
        <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
          {locale === 'es'
            ? 'Mi trayectoria profesional y experiencia laboral'
            : 'My professional journey and work experience'}
        </p>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/50"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {exp.position[locale]}
                  </h2>
                  <p className="font-medium text-teal-600 dark:text-teal-400">
                    {exp.company}
                  </p>
                </div>
                <span className="text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                  {exp.duration[locale]}
                </span>
              </div>

              <ul className="mb-4 space-y-2">
                {exp.description[locale].map((desc, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="mt-1.5 shrink-0 text-teal-500">
                      <svg
                        className="h-2 w-2"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>

              <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                <Link
                  href={`/experiences/${slugify(exp.company)}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  {t('about.viewDetail')} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
