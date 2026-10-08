'use client'

import clsx from 'clsx'
import { motion, type Variants } from 'motion/react'
import { useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'

type Props = {
  children: React.ReactNode
  variants?: Variants
}

export function ReadMore({ children, variants }: Props) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <motion.p
        id="hero-summary"
        className={clsx(
          'mt-6 text-[clamp(1rem,3.4vw,1.125rem)] text-zinc-600 leading-relaxed dark:text-zinc-400',
          expanded ? null : 'line-clamp-3 sm:line-clamp-none',
        )}
        variants={variants}
      >
        {children}
      </motion.p>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls="hero-summary"
        className="mt-3 font-medium text-sm text-teal-600 sm:hidden dark:text-teal-400"
      >
        {expanded ? t('home.readLess') : t('home.readMore')}
      </button>
    </>
  )
}
