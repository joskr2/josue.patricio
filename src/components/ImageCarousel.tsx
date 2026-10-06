'use client'

import { Pause, Play } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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
}: Readonly<{
  items: CarouselItem[]
  intervalMs?: number
  className?: string
}>) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true)
    }
  }, [])

  useEffect(() => {
    if (!items?.length || paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [items?.length, intervalMs, paused])

  if (!items?.length) return null

  const current = items[index]

  return (
    <div className={className}>
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
              sizes="(min-width: 640px) 18rem, 20rem"
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
          className="absolute right-3 bottom-3 z-10 rounded-full bg-zinc-900/60 p-2 text-white backdrop-blur transition-colors hover:bg-zinc-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
