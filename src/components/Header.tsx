import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

import { Container } from '@/components/Container'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'
import { useBlur } from '@/contexts/BlurContext'

function CloseIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDownIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function SunIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" />
    </svg>
  )
}

function MoonIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavItem({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  return (
    <li>
      <PopoverButton as={Link} to={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigationContent({
  open,
  t,
}: Readonly<{
  open: boolean
  t: (key: string) => string
}>) {
  const { setBlur } = useBlur()

  useEffect(() => {
    setBlur(open)
  }, [open, setBlur])

  return (
    <>
      <PopoverButton className="group rounded-lg bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20">
        <MenuIcon className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300" />
      </PopoverButton>
			<PopoverBackdrop
				transition
				className="fixed left-0 right-0 bottom-0 z-30 bg-black/10 backdrop-blur-sm duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/15"
				style={{ top: '80px' }}
			/>
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-40 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton aria-label="Close menu" className="-m-1 p-1">
            <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          </PopoverButton>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
            <MobileNavItem href="/">{t('nav.home')}</MobileNavItem>
            <MobileNavItem href="/about">
              <span className="whitespace-nowrap">{t('nav.about')}</span>
            </MobileNavItem>
            <MobileNavItem href="/projects">{t('nav.projects')}</MobileNavItem>
            <MobileNavItem href="/contact">{t('nav.contact')}</MobileNavItem>
          </ul>
        </nav>
      </PopoverPanel>
    </>
  )
}

function MobileNavigation(
  props: Readonly<React.ComponentPropsWithoutRef<typeof Popover>>,
) {
  const { t } = useTranslation()

  return (
    <Popover {...props}>
      {({ open }) => <MobileNavigationContent open={open} t={t} />}
    </Popover>
  )
}

function NavItem({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <li>
      <Link
        to={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400',
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: Readonly<React.ComponentPropsWithoutRef<'nav'>>) {
  const { t } = useTranslation()

  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/">{t('nav.home')}</NavItem>
        <NavItem href="/about">
          <span className="whitespace-nowrap">{t('nav.about')}</span>
        </NavItem>
        <NavItem href="/projects">{t('nav.projects')}</NavItem>
        <NavItem href="/contact">{t('nav.contact')}</NavItem>
      </ul>
    </nav>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored) {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const otherTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:block dark:fill-teal-50 dark:stroke-teal-500 dark:group-hover:fill-teal-50 dark:group-hover:stroke-teal-600" />
      <MoonIcon className="h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:hidden dark:fill-teal-400/10 dark:stroke-teal-500 dark:group-hover:stroke-zinc-400" />
    </button>
  )
}

export function Header() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-fit bg-white/80 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-md dark:bg-zinc-900/80 dark:ring-white/10">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Mobile: left spacer to keep center/right aligned */}
          <div className="flex flex-1 items-center md:hidden">
            {location.pathname !== '/' ? (
              <Link to="/" aria-label="Home" className="group">
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative h-10 w-10 select-none rounded-full bg-gradient-to-br from-teal-500/90 to-teal-600/90 text-white shadow ring-1 ring-white/40 dark:ring-white/20"
                >
                  <span className="absolute inset-0 grid place-items-center text-sm font-bold tracking-wide">
                    JP
                  </span>
                </motion.div>
              </Link>
            ) : (
              <div aria-hidden="true" className="h-10 w-10" />
            )}
          </div>
          <div className="flex flex-1 justify-end md:justify-center">
            <DesktopNavigation className="pointer-events-auto hidden md:block" />
          </div>
          <div className="flex justify-end md:flex-1">
            <div className="pointer-events-auto flex items-center gap-4">
              <LanguageSwitcher />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <MobileNavigation className="md:hidden" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}