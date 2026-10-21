'use client'

import { motion } from 'motion/react'
import { ContactForm } from '@/components/ContactForm'
import { SimpleLayout } from '@/components/SimpleLayout'
import { useTranslation } from '@/hooks/useTranslation'
import { cv } from '@/lib/personal-data'

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12.75l-3-3m3 3l3 3m0 0l-3-3m3 3H6"
      />
    </svg>
  )
}

const cvCardStyles =
  'flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-6 py-4 font-medium text-sm text-zinc-800 transition-all hover:border-teal-500 hover:bg-teal-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-teal-500 dark:hover:bg-teal-900/20'

export function ContactClient() {
  const { t } = useTranslation()

  return (
    <SimpleLayout title={t('contact.title')} intro={t('contact.subtitle')}>
      <div className="mx-auto max-w-4xl">
        {/* Contact Form */}
        <ContactForm />

        {/* Download CV */}
        <motion.div
          className="mt-16 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-700"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center font-bold text-xl text-zinc-900 tracking-tight dark:text-zinc-100">
            {t('contact.downloadCV')}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={cv.es.href}
              download={cv.es.downloadName}
              className={cvCardStyles}
            >
              <DownloadIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              Español - Desarrollador Software
            </a>
            <a
              href={cv.en.href}
              download={cv.en.downloadName}
              className={cvCardStyles}
            >
              <DownloadIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              English - Software Developer
            </a>
          </div>
        </motion.div>
      </div>
    </SimpleLayout>
  )
}
