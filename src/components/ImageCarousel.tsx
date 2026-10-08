'use client'

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
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

function slideKey(item: CarouselItem) {
  return typeof item.src === 'string' ? item.src : item.src.src
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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

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

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    // A gesture that starts on a control belongs to that control: handling it as
    // a swipe too would advance the carousel twice for one gesture.
    if ((event.target as HTMLElement).closest('button')) return

    const touch = event.touches[0]
    touchStartRef.current = touch
      ? { x: touch.clientX, y: touch.clientY }
      : null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    const touch = event.changedTouches[0]
    if (!start || !touch) return

    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    // Require a dominant horizontal gesture so vertical page scrolling is not
    // hijacked into a slide change.
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return

    setIndex((i) =>
      deltaX < 0
        ? (i + 1) % items.length
        : (i - 1 + items.length) % items.length,
    )
  }

  return (
    <div className={className} ref={rootRef}>
      <div
        className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          aria-label={t('carousel.previous')}
          className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/60 text-white backdrop-blur transition-colors hover:bg-zinc-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <ChevronLeft aria-hidden="true" className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          aria-label={t('carousel.next')}
          className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/60 text-white backdrop-blur transition-colors hover:bg-zinc-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <ChevronRight aria-hidden="true" className="h-6 w-6" />
        </button>

        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
          {items.map((item, dotIndex) => (
            <button
              key={slideKey(item)}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`${t('carousel.goTo')} ${dotIndex + 1}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  dotIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? t('carousel.play') : t('carousel.pause')}
          aria-pressed={paused}
          // top-right so it does not collide with the 5 x 44px dot row centered at the bottom.
          className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/60 text-white backdrop-blur transition-colors hover:bg-zinc-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
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
