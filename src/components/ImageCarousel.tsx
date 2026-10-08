'use client'

import { Pause, Play } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'

type CarouselItem = {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
}

export function ImageCarousel({
  items,
  intervalMs = 30000,
  className,
  sizes = '(min-width: 640px) 18rem, 20rem',
}: Readonly<{
  items: CarouselItem[]
  intervalMs?: number
  className?: string
  sizes?: string
}>) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Assume visible until an observer says otherwise, so environments without
  // `IntersectionObserver` keep the previous always-on autoplay behaviour.
  const [inView, setInView] = useState(true)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // biome-ignore lint/nursery/useReactCompiler: the reduced-motion preference can only be read after mount (matchMedia is absent during the static prerender), so the paused flag is reconciled in an effect.
      setPaused(true)
    }
  }, [])

  useEffect(() => {
    const element = rootRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) setInView(entry.isIntersecting)
    })

    observer.observe(element)
    return () => observer.disconnect()
    // ponytail: attaches once per mount; an empty item list renders no root to
    // observe, and `inView` then stays true (the no-IntersectionObserver path).
  }, [])

  useEffect(() => {
    if (!items?.length || paused || !inView) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [items?.length, intervalMs, paused, inView])

  if (!items?.length) return null

  const current = items[index]

  return (
    <div className={className} ref={rootRef}>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width || 400}
              height={current.height || 400}
              sizes={sizes}
              className="absolute inset-0 h-full w-full object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? t('carousel.play') : t('carousel.pause')}
          aria-pressed={paused}
          className="absolute right-3 bottom-3 z-10 rounded-full bg-zinc-900/60 p-2 text-white backdrop-blur transition-colors hover:bg-zinc-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {paused ? (
            <Play aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Pause aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
