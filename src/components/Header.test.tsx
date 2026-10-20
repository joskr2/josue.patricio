import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/Header'

// The header sits behind the app shell, so every ambient dependency is mocked
// rather than mounted through its provider.
const route = vi.hoisted(() => ({ path: '/' }))
vi.mock('next/navigation', () => ({ usePathname: () => route.path }))
vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: () => {} }),
}))
vi.mock('@/contexts/BlurContext', () => ({
  useBlur: () => ({ isBlurred: false, setBlur: () => {} }),
}))
vi.mock('@/contexts/LocaleContext', () => ({
  useLocale: () => ({ locale: 'en', setLocale: () => {}, isPending: false }),
}))
// Resolve real copy instead of echoing the key: a missing translation then
// fails the label assertions instead of leaking `a11y.openMenu` to a user.
vi.mock('@/hooks/useTranslation', async () => {
  const { getTranslation } = await import('@/lib/i18n')
  return {
    useTranslation: () => ({
      locale: 'en',
      t: (key: string) => getTranslation('en', key),
    }),
  }
})

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
  route.path = '/'
})

function menuButton() {
  return screen.getByRole('button', { name: 'Open menu' })
}

describe('Header touch controls', () => {
  it('names the mobile menu button for assistive technology', () => {
    render(<Header />)

    expect(menuButton()).toBeTruthy()
  })

  it('gives the mobile menu button a 44px touch target', () => {
    render(<Header />)

    const className = menuButton().className
    expect(className).toContain('h-11')
    expect(className).toContain('w-11')
  })

  it('gives the language buttons 44px touch targets', () => {
    render(<Header />)

    for (const name of ['Switch to English', 'Switch to Spanish']) {
      const className = screen.getByRole('button', { name }).className
      expect(className).toContain('min-h-11')
      expect(className).toContain('min-w-11')
    }
  })

  it('gives the theme toggle a 44px touch target', () => {
    render(<Header />)

    const className = screen.getByRole('button', { name: /theme/i }).className
    expect(className).toContain('h-11')
    expect(className).toContain('w-11')
  })
})

describe('Header mobile menu scroll lock', () => {
  it('locks the real scroll container while open and restores it on close', async () => {
    document.body.style.overflow = 'scroll'
    document.documentElement.style.overflow = 'auto'
    render(<Header />)

    fireEvent.click(menuButton())

    const close = await screen.findByRole('button', { name: 'Close menu' })
    // `body` alone does not hold: the document scroller is the html element, so
    // the page still moved behind the open menu until this was locked too.
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.documentElement.style.overflow).toBe('hidden')
    expect(close.className).toContain('h-11')
    expect(close.className).toContain('w-11')

    fireEvent.click(close)
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('scroll')
      expect(document.documentElement.style.overflow).toBe('auto')
    })
  })
})

describe('Header active item', () => {
  const activeLabels = () =>
    [...document.querySelectorAll('header nav a[aria-current="page"]')].map(
      (a) => a.textContent?.trim(),
    )

  it('marks only the current section, not every section under the locale', () => {
    // Regression: hrefs are locale-prefixed ("/en"), so a raw prefix test made
    // "Home" match "/en/about" and every other route beneath it.
    route.path = '/en/about'
    render(<Header />)

    expect(activeLabels()).toEqual(['About'])
  })

  it('keeps the parent section marked on a detail route', () => {
    route.path = '/en/experiences/auna'
    render(<Header />)

    expect(activeLabels()).toEqual(['Experience'])
  })

  it('marks home only on the locale root', () => {
    route.path = '/en'
    render(<Header />)

    expect(activeLabels()).toEqual(['Home'])
  })
})
