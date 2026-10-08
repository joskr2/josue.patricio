import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ImageCarousel } from '@/components/ImageCarousel'

const dictionary: Record<string, string> = {
  'carousel.pause': 'Pause slideshow',
  'carousel.play': 'Play slideshow',
  'carousel.previous': 'Previous slide',
  'carousel.next': 'Next slide',
  'carousel.goTo': 'Go to slide',
}

vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => dictionary[key] ?? key,
  }),
}))

// AnimatePresence `mode="wait"` can defer the incoming child under jsdom, so the
// assertions below read state-driven attributes (aria-current, img alt) instead
// of relying on the animated DOM.
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children?: ReactNode }) => children ?? null,
  motion: {
    div: ({
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      ...props
    }: Record<string, unknown>) => <div {...props} />,
  },
}))

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image is mocked here so the test does not run the real image optimizer; the assertion only needs src and alt.
    <img src={src} alt={alt} />
  ),
}))

// jsdom implements no matchMedia; the carousel reads it for prefers-reduced-motion.
window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia

const items = [
  { src: '/one.jpg', alt: 'one' },
  { src: '/two.jpg', alt: 'two' },
  { src: '/three.jpg', alt: 'three' },
]

afterEach(cleanup)

function activeDot() {
  return screen
    .getAllByRole('button')
    .find((button) => button.getAttribute('aria-current') === 'true')
}

function swipe(element: Element, { dx, dy }: { dx: number; dy: number }) {
  // jsdom has no TouchEvent, and fireEvent cannot attach `touches` to a plain
  // Event, so the events are built by hand.
  const start = new Event('touchstart', { bubbles: true })
  Object.assign(start, { touches: [{ clientX: 100, clientY: 100 }] })
  const end = new Event('touchend', { bubbles: true })
  Object.assign(end, {
    changedTouches: [{ clientX: 100 + dx, clientY: 100 + dy }],
  })

  fireEvent(element, start)
  fireEvent(element, end)
}

describe('ImageCarousel', () => {
  it('exposes prev, next, dots and play/pause by accessible name', () => {
    render(<ImageCarousel items={items} />)

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Pause slideshow' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toBeTruthy()
  })

  it('gives every control a 44px touch target', () => {
    render(<ImageCarousel items={items} />)

    const controls = [
      screen.getByRole('button', { name: 'Previous slide' }),
      screen.getByRole('button', { name: 'Next slide' }),
      screen.getByRole('button', { name: 'Go to slide 1' }),
      screen.getByRole('button', { name: 'Go to slide 2' }),
      screen.getByRole('button', { name: 'Go to slide 3' }),
      screen.getByRole('button', { name: 'Pause slideshow' }),
    ]

    for (const control of controls) {
      expect(control.className).toContain('h-11 w-11')
    }
  })

  it('marks the active dot', () => {
    render(<ImageCarousel items={items} />)

    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 1')

    fireEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }))

    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 3')
    expect(screen.getByAltText('three')).toBeTruthy()
  })

  it('advances and wraps forward with next', () => {
    render(<ImageCarousel items={items} />)
    const next = screen.getByRole('button', { name: 'Next slide' })

    fireEvent.click(next)
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 2')

    fireEvent.click(next)
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 3')

    fireEvent.click(next)
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 1')
  })

  it('wraps backwards with previous', () => {
    render(<ImageCarousel items={items} />)

    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }))

    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 3')
  })

  it('navigates on horizontal swipe only', () => {
    const { container } = render(<ImageCarousel items={items} />)
    const surface = container.querySelector('.relative') as Element

    swipe(surface, { dx: -60, dy: 5 })
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 2')

    swipe(surface, { dx: 60, dy: 5 })
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 1')

    swipe(surface, { dx: 20, dy: 5 })
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 1')

    // A vertical scroll must not be hijacked into a slide change.
    swipe(surface, { dx: 60, dy: 120 })
    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 1')
  })

  it('ignores a swipe that starts on a control', () => {
    render(<ImageCarousel items={items} />)

    // A drag starting on a button can also emit that button's click in a real
    // browser, which would advance twice for one gesture.
    swipe(screen.getByRole('button', { name: 'Next slide' }), {
      dx: -60,
      dy: 5,
    })

    expect(activeDot()?.getAttribute('aria-label')).toBe('Go to slide 1')
  })
})
