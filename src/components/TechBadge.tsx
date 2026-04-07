import clsx from 'clsx'
import { motion } from 'motion/react'

type Props = Readonly<{
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md'
  animate?: boolean
}>

const badgeClasses = (
  variant: 'default' | 'primary' | 'secondary' = 'default',
  size: 'sm' | 'md' = 'sm',
) =>
  clsx(
    'inline-flex items-center rounded-full font-medium cursor-default',
    {
      'px-2 py-1 text-xs': size === 'sm',
      'px-3 py-1.5 text-sm': size === 'md',
    },
    {
      'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200':
        variant === 'default',
      'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300':
        variant === 'primary',
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300':
        variant === 'secondary',
    },
  )

function StaticTechBadge({
  children,
  variant = 'default',
  size = 'sm',
}: Props) {
  return <span className={badgeClasses(variant, size)}>{children}</span>
}

function AnimatedTechBadge({
  children,
  variant = 'default',
  size = 'sm',
}: Props) {
  return (
    <motion.span
      className={badgeClasses(variant, size)}
      initial={{ scale: 1, opacity: 0.8 }}
      animate={{ opacity: 1 }}
      whileHover={{
        scale: 1.1,
        y: -2,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 25,
        },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  )
}

export function TechBadge({ children, animate = false, ...props }: Props) {
  if (animate) {
    return <AnimatedTechBadge {...props}>{children}</AnimatedTechBadge>
  }
  return <StaticTechBadge {...props}>{children}</StaticTechBadge>
}
