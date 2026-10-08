'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ScrollToTop } from '@/components/ScrollToTop'
import { useBlur } from '@/contexts/BlurContext'
import { useTranslation } from '@/hooks/useTranslation'
import { personalInfo } from '@/lib/personal-data'

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isBlurred } = useBlur()
  const { t } = useTranslation()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex min-h-dvh w-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-sm focus:text-zinc-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:bg-zinc-900 dark:focus:text-zinc-100"
        >
          Skip to content
        </a>
        <Header />
        <main
          id="main"
          className={`flex-auto pt-20 transition-all duration-300 ${isBlurred ? 'opacity-80 blur-sm' : ''}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: 'easeOut' }
              }
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        {!isBlurred && (
          <>
            <ScrollToTop />
            {/* Floating WhatsApp Button */}
            <FloatingWhatsAppButton
              phone={personalInfo.phone}
              message={t('contact.whatsappPrefill')}
              tooltip={t('contact.whatsappTooltip')}
            />
          </>
        )}
      </div>
    </>
  )
}
