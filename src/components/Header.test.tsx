import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/Header'

// The header sits behind the app shell, so every ambient dependency is mocked
// rather than mounted through its provider.
vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: () => {} }),
}))
vi.mock('@/contexts/BlurContext', () => ({
  useBlur: () => ({ isBlurred: false, setBlur: () => {} }),
}))
vi.mock('@/contexts/LocaleContext', () => ({
  useLocale: () => ({ locale: 'en', setLocale: () => {} }),
}))
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({ locale: 'en', t: (key: string) => key }),
}))

afterEach(cleanup)

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
})
