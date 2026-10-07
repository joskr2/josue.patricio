# Feature: Home mobile reading experience

## Context

On mobile the home page was hard to read and wasted vertical space:

- the `h1` used a fixed `text-5xl` (48px) at every small viewport, so the
  31-character name wrapped into oversized lines;
- the ~700-character hero summary was shown in full, pushing everything below
  the fold;
- the portrait photo and the four gallery photos stacked vertically, so the
  gallery occupied a whole extra screen.

Scope was mobile only; the desktop layout is unchanged.

## Tasks

- [x] M1 — Fluid, viewport-adaptive type scale for the hero name, title, and summary
- [x] M2 — Collapse the summary behind a "Ver más" / "Ver menos" toggle on mobile
- [x] M3 — Merge the portrait and the gallery photos into one carousel on mobile

## Evidence

### Commit

- `2069f70` — `feat(home): improve the mobile reading experience`
- Files: `src/components/HomeClient.tsx`, `src/components/ImageCarousel.tsx`,
  `src/lib/i18n.ts` (new `home.readMore` / `home.readLess` in both locales)

### Type scale

| Element | Before | After |
| --- | --- | --- |
| Hero name | `text-5xl sm:text-6xl lg:text-7xl` (48px fixed at 360px) | `text-[clamp(1.875rem,6.5vw,4.5rem)]` (30px → 72px) |
| Job title | `text-xl sm:text-2xl` | `text-[clamp(1.0625rem,3.2vw,1.5rem)]` |
| Summary | `text-base sm:text-lg` | `text-[clamp(1rem,3.4vw,1.125rem)]`, floored at 16px |

The `h1`'s layout reservation moved from fixed `rem` steps to
`min-h-[3.4em] sm:min-h-[2.4em] lg:min-h-[1.4em]` so it scales with the fluid
font instead of lagging behind it.

### Mobile carousel

The portrait is the first slide of a single five-item carousel shown below `lg`;
from `lg` upward the original two-column layout (rotated portrait card plus the
gallery-only carousel) is rendered unchanged.

### Gates

- `npm run lint` → exit 0, 0 errors, 0 warnings.
- `npm run typecheck` → exit 0.
- `npm run build` → exit 0, route table unchanged.
- Prerendered `.next/server/app/index.html` contains the toggle markup
  (`line-clamp-3`, `aria-expanded`, `aria-controls="hero-summary"`,
  `id="hero-summary"`, "Read more"), both carousel roots, and **exactly two
  image preloads** — one per distinct image.

### Defect found and fixed during review of the work

The first implementation left the hidden desktop portrait card with a different
`sizes` value than the mobile carousel, so on a phone the same portrait resolved
to two different candidates and was preloaded twice. Aligning both to
`(min-width: 1024px) 24rem, 100vw` collapses it to a single preload, confirmed in
the built HTML (3 preloads → 2).

### Open items

- **No browser verification.** The layout was validated structurally (classes and
  prerendered HTML) and by a passing production build. Actual rendering at phone
  widths has not been eyeballed; that needs a real device or browser.
- Both carousels stay mounted (one hidden by `lg:hidden` / `hidden lg:grid`), so
  the hidden one keeps its 30s interval alive. Removing that would need
  conditional rendering behind a media query, which was judged more machinery
  than the cost warrants.
