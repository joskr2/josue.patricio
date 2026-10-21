'use client'

import { MotionConfig } from 'motion/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect } from 'react'
import { BlurProvider } from '@/contexts/BlurContext'
import { LocaleProvider } from '@/contexts/LocaleContext'
import type { Locale } from '@/lib/i18n'

function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      const systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function Providers({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      // next-themes renders its anti-FOUC <script> inside this client
      // component. React 19.3 warns when a client component renders an
      // executable <script>, so the script is demoted to an inert data block
      // (it never needs to run: the root layout loads its own render-blocking
      // bootstrap at /theme-init.js — see public/theme-init.js — and soft
      // navigations keep the theme class that is already on <html>).
      scriptProps={{ type: 'application/json' }}
    >
      {/* Disables transform/layout animations for visitors who ask for less
          motion, without taking the opacity fades away entirely. */}
      <MotionConfig reducedMotion="user">
        <LocaleProvider locale={locale}>
          <BlurProvider>
            <ThemeWatcher />
            {children}
          </BlurProvider>
        </LocaleProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
