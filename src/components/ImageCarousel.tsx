import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

type CarouselItem = {
  src: string
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
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!items?.length) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [items?.length, intervalMs])

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
            <img
              src={current.src}
              alt={current.alt}
              width={current.width || 400}
              height={current.height || 400}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}