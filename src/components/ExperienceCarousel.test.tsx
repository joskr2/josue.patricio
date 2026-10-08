import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ExperienceCarousel } from '@/components/ExperienceCarousel'
import type { Experience } from '@/lib/experience-data'

// Dictionary values are deliberately different from the old hardcoded English
// string so the accessible-name assertion proves the label comes from
// `t('carousel.goTo')` and not from a literal inside the component.
const dictionary: Record<string, string> = {
  'carousel.goTo': 'Dictionary goTo',
  'about.viewDetail': 'View detail',
}

vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    locale: 'en',
    t: (key: string) => dictionary[key] ?? key,
  }),
}))

// motion/react's viewport feature needs IntersectionObserver, which jsdom does
// not implement; the mock renders plain divs so the refs still attach.
vi.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      initial: _initial,
      whileInView: _whileInView,
      whileHover: _whileHover,
      transition: _transition,
      viewport: _viewport,
      ...props
    }: Record<string, unknown>) => (
      <div {...props}>{children as ReactNode}</div>
    ),
  },
}))

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image is mocked here so the test does not run the real image optimizer; the assertion only needs src and alt.
    <img src={src} alt={alt} />
  ),
}))

const items: Experience[] = Array.from({ length: 8 }, (_, i) => ({
  company: `Company ${i + 1}`,
  position: { en: `Position ${i + 1}`, es: `Puesto ${i + 1}` },
  duration: { en: '2020 - 2021', es: '2020 - 2021' },
  start: `2020-0${i + 1}`,
  description: { en: ['Description'], es: ['Descripción'] },
  technologies: ['React', 'TypeScript'],
}))

// jsdom implements no Element.prototype.scrollTo, so the spy stands in for it.
const originalScrollTo = Element.prototype.scrollTo

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
})

afterEach(() => {
  cleanup()
  Element.prototype.scrollTo = originalScrollTo
})

describe('ExperienceCarousel dots', () => {
  it('renders one touch target per slide that is at least 44px tall', () => {
    render(<ExperienceCarousel items={items} />)

    const dots = screen.getAllByRole('button')
    expect(dots).toHaveLength(8)
    for (const dot of dots) {
      // h-11 is 2.75rem = 44px; jsdom cannot resolve Tailwind CSS, so the class
      // contract is the assertable proxy for the touch-target size.
      expect(dot.className).toContain('h-11')
    }
  })

  it('names every dot from the dictionary instead of a hardcoded string', () => {
    render(<ExperienceCarousel items={items} />)

    expect(
      screen.getByRole('button', { name: 'Dictionary goTo 1' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'Dictionary goTo 8' }),
    ).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Go to slide 1' })).toBeNull()
  })

  it('requests a scroll to the clicked slide', () => {
    render(<ExperienceCarousel items={items} />)

    fireEvent.click(screen.getByRole('button', { name: 'Dictionary goTo 3' }))

    expect(Element.prototype.scrollTo).toHaveBeenCalled()
  })
})
