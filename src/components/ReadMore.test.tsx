import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ReadMore } from '@/components/ReadMore'

// The real hook reads from LocaleContext, so mocking it keeps the dictionary
// deterministic and avoids mounting the whole app shell in the test.
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => (key === 'home.readMore' ? 'Read more' : 'Read less'),
  }),
}))

afterEach(cleanup)

describe('ReadMore', () => {
  it('renders the summary clamped behind a collapsed toggle', () => {
    render(<ReadMore>hero summary</ReadMore>)

    const summary = screen.getByText('hero summary')
    expect(summary.className).toContain('line-clamp-3')
    expect(summary.className).toContain('sm:line-clamp-none')

    const toggle = screen.getByRole('button', { name: 'Read more' })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(summary.id).not.toBe('')
    expect(toggle.getAttribute('aria-controls')).toBe(summary.id)
  })

  it('expands and collapses the summary on click', () => {
    render(<ReadMore>hero summary</ReadMore>)

    const toggle = screen.getByRole('button', { name: 'Read more' })
    fireEvent.click(toggle)

    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('button', { name: 'Read less' })).toBe(toggle)
    expect(screen.getByText('hero summary').className).not.toContain(
      'line-clamp-3',
    )

    fireEvent.click(toggle)

    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(screen.getByRole('button', { name: 'Read more' })).toBe(toggle)
    expect(screen.getByText('hero summary').className).toContain('line-clamp-3')
  })
})
