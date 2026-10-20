'use client'

import { MotionConfig } from 'motion/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect } from 'react'
import { BlurProvider } from '@/contexts/BlurContext'
import { LocaleProvider } from '@/contexts/LocaleContext'

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
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {/* Disables transform/layout animations for visitors who ask for less
          motion, without taking the opacity fades away entirely. */}
      <MotionConfig reducedMotion="user">
        <LocaleProvider>
          <BlurProvider>
            <ThemeWatcher />
            {children}
          </BlurProvider>
        </LocaleProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
