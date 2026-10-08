# Feature: Mobile UI/UX parity across the portfolio

## Context

The home page was optimized for mobile in `2069f70`: a fluid `clamp()` type
scale, the hero summary collapsed behind a "Ver más" toggle, and the portrait
plus gallery merged into one carousel. Every other route still uses the
pre-optimization patterns.

A read-only audit of the remaining routes (shared shell, `/about`, `/projects`,
`/experiences`, `/experiences/[slug]`, `/contact`, `/404`) produced this plan.
Severity: P0 blocks mobile use, P1 breaks or degrades the experience, P2 polish.
Every finding is a static read of the source; no browser or device check has
been performed yet, so device-dependent items are listed under "Open items".

Scope: mobile viewports 320-430px, with tablet 640-1024px checked alongside.
The desktop layout stays unchanged unless a task says otherwise.

## Tasks

### P0 - cannot be navigated on a touch screen

- [x] P0-1 `ImageCarousel` (home only, `HomeClient.tsx:177,227`): add prev/next
      buttons and accessible dots. `ImageCarousel.tsx:72-95` currently has no
      swipe, no arrows and no dots; the only control is a 32px play/pause button,
      so the carousel merged by `2069f70` is un-navigable for 30s at a time.
- [x] P0-2 `ExperienceCarousel` (`/about` only, `AboutClient.tsx:273`): the page
      dots at `ExperienceCarousel.tsx:238-247` are `h-2 w-2` (8px) with no
      padding and are the sole control. Give each dot a real touch target.
- [x] P0-3 `Header.tsx:125`: the hamburger `PopoverButton` has no accessible
      name (its icons are `aria-hidden` at `:29` and `:45`), so the mobile menu
      is an unnamed button on every route.

### P1 - broken or degraded on a phone

- [ ] P1-1 Fluid type scale for every non-home heading. `AboutClient.tsx:84,199`,
      `SimpleLayout.tsx:15`, `ExperiencesClient.tsx:16`, `ProjectsClient.tsx:154`,
      `experiences/[slug]/page.tsx:51` and `not-found.tsx:16` use a fixed
      `text-4xl` (32px) or `text-3xl`; the home uses `clamp()`.
- [ ] P1-2 Touch targets >=44px: `AboutClient.tsx:44-50` (the only links on the
      page), `ExperiencesClient.tsx:70-73`, `ProjectsClient.tsx:210-235`,
      `ProjectShowcase.tsx:72-102`, `Card.tsx:139-146`,
      `LanguageSwitcher.tsx:20,33`, `Footer.tsx` links, `Button.tsx:24`,
      `Header.tsx:231`.
- [ ] P1-3 Floating controls: `FloatingWhatsAppButton.tsx:34` and
      `ScrollToTop.tsx:43` both use `z-[1000]`, above the open menu panel
      (`z-40`) and its backdrop (`z-30`), so they paint over the menu. Both also
      need `env(safe-area-inset-bottom)`, which requires a `viewportFit: 'cover'`
      export in `app/layout.tsx`.
- [ ] P1-4 `Header.tsx:117-121,128-152`: no body scroll lock while the mobile
      menu is open; the backdrop is visual only and the page scrolls behind it.
- [ ] P1-5 `styles/tailwind.css`: add `scroll-padding-top` for the fixed header,
      plus `-webkit-tap-highlight-color`, `overscroll-behavior-y` and
      `text-size-adjust`.
- [ ] P1-6 `Layout.tsx`: `min-h-dvh` for short pages, `prefers-reduced-motion`
      for the page transition, and a skip link to `#main`.
- [ ] P1-7 `ContactClient.tsx:267` (and `:147,:178,:210`): the stacked
      `mt-16 border-t pt-16` leaves ~128px of dead space; several wasted phone
      screens before "Additional Information".
- [ ] P1-8 `AboutClient.tsx:84,199`: two `<h1>` in the DOM with two typewriters
      animating concurrently, so the name is announced twice and pays double
      animation cost on mobile.
- [ ] P1-9 `focus:outline-none` without a `focus-visible` replacement:
      `ExperienceCarousel.tsx:124`, `ScrollToTop.tsx:43`,
      `FloatingWhatsAppButton.tsx:34`.
- [ ] P1-10 `ProjectsClient.tsx:163-166`: the project description is always
      expanded, unlike the home which collapses it behind `ReadMore`.
- [ ] P1-11 `ContactClient.tsx:57` vs `:149`: card titles are `h3` before any
      `h2`, so the heading outline jumps h1 to h3.
- [ ] P1-12 `ExperiencesClient.tsx:43-46`: `whitespace-nowrap` duration inside a
      header whose left child cannot shrink risks overflow at 320px with the
      Spanish role string. Borderline; verify on a device before changing.

### P2 - polish

- [ ] P2-1 Semantics: `ul`/`li` for the experience list
      (`ExperiencesClient.tsx:29-33`) and a visually hidden `h3` for the mobile
      section labels (`ProjectsClient.tsx:243,316,387`).
- [ ] P2-2 `theme-color` meta, and the SSR `lang="en"` mismatch with the
      client-side `LocaleContext.tsx:24` switch that makes Spanish content crawl
      as English.
- [ ] P2-3 `next/image` `sizes`: `experiences/[slug]/page.tsx:44` and
      `ExperienceCarousel.tsx:178`.
- [ ] P2-4 Delete the dead `ExperienceItem.tsx` (imported nowhere).
- [ ] P2-5 `Accordion.tsx:73-88`: a `static` panel with animated `height: 0`
      keeps collapsed content in the tab order.
- [ ] P2-6 Vertical rhythm: `space-y-20` in `ProjectsClient.tsx:137`.
- [ ] P2-7 Hover-only affordances without a focus equivalent:
      `AboutClient.tsx:44-50`, `ContactClient.tsx:44-50`.
- [ ] P2-8 `experiences/[slug]/page.tsx:44`: the company logo is
      `hidden md:block`, so the mobile header loses its visual anchor.
- [ ] P2-9 `not-found.tsx:16`: `clamp()` for consistency.

## Work unit 1 (this PR) - complete

P0-1, P0-2 and P0-3, one commit each. Nothing else moved.

## Evidence

### Commits (branch `feat/portfolio-profile-refresh`, base `3c805df`)

- `fbaa166` - `feat(carousel): make the carousel navigable on touch`
  (`ImageCarousel.tsx`, `ImageCarousel.test.tsx`, `i18n.ts`)
- `15688cc` - `fix(a11y): give the mobile dots a real tap target`
  (`ExperienceCarousel.tsx`, `ExperienceCarousel.test.tsx`)
- `1a9e6e1` - `fix(a11y): name the mobile menu button and enlarge it`
  (`Header.tsx`, `Header.test.tsx`)

Range `3c805df..HEAD`: 7 files, 421 insertions, 11 deletions.

### What changed

| Control | Before | After |
| --- | --- | --- |
| Home carousel navigation | none; 30s autoplay only | prev/next buttons, one dot per slide, 40px horizontal swipe threshold |
| Home carousel play/pause | 32px | 44px, moved to the top-right to clear the dot row |
| `/about` experience dots | 8x8px, untappable, hardcoded English label | 44px-tall x 32px-wide buttons, `carousel.goTo` label |
| Mobile menu button | unnamed, 40px tall | `aria-label="Open menu"`, 44px square |

### Test-first evidence, per task

The test file was written first and its failure recorded, then the
implementation made it pass.

- RED `ImageCarousel.test.tsx`: `Unable to find an accessible element with the
  role "button" and name "Previous slide"`. Two further cases were added before
  the commit and also observed red: `expected 'h-11' ... Received 'h-2 w-2 ...'`
  (play/pause) and `expected 'Go to slide 2' to be 'Go to slide 1'` (a swipe that
  starts on a control advanced the carousel).
- RED `ExperienceCarousel.test.tsx`: 3 failed - the `h-11` class was absent and
  no `Dictionary goTo N` accessible name existed.
- RED `Header.test.tsx`: `Unable to find an accessible element with the role
  "button" and name "Open menu"`, so the defect itself was proved by the harness
  rather than asserted by reading.
- GREEN: 16 tests across 5 files.

### Corrections made during the work

- The audit claimed `/about` renders 8 experiences. `experience-data.ts` defines
  **7**; the `company: string` line of the `Experience` type was counted too. The
  dot row math is therefore 7 x 32px + 6 x 4px = 248px, inside the 288px a
  320px viewport leaves after `px-4`. Seven 44px buttons would need 332px and
  would overflow, so the compromise stands; `w-8` still fits up to 8 items.
- The first `ImageCarousel` implementation left play/pause at 32px and let a
  swipe starting on a control advance twice. Both were caught by the new tests
  before the commit.

## Gates

Last run on `1a9e6e1`:

- `npm run lint` -> exit 0, `Checked 59 files. No fixes applied.`
- `npm run typecheck` -> exit 0.
- `npm test` -> exit 0, 16 tests in 5 files.
- `npm run build` -> exit 0, route table unchanged (`/`, `/_not-found`,
  `/about`, `/contact`, `/experiences`, `/experiences/[slug]`, `/projects`,
  `/robots.txt`, `/sitemap.xml`).

Independent verification of the built output:

- The M3 single-preload invariant holds: the prerendered home HTML still
  contains exactly **2** image preloads (the portrait and one gallery image), and
  both portrait instances resolve to the same URL.
- The built home HTML carries the new controls (`Previous slide`, `Next slide`,
  `Pause slideshow`, and a dot row of 5 for the mobile carousel and 4 for the
  desktop gallery, matching the rendered item counts).
- `about.html` carries 7 dot buttons, each with `flex h-11 w-8 items-center
  justify-center`.
- `aria-label="Open menu"` appears once in both `index.html` and `about.html`.
- `git diff 3c805df..HEAD -- package.json` is empty: no new dependency.

## Native review

Candidate: `3c805df..HEAD` (the work unit above). Inspected once, then scoped
with an explicit `baseRef` so the earlier candidate that the user already waived
is not re-reviewed.

- Lineage `review-90d7c06acf2856b0`, risk tier `medium`, lens `review-reliability`.
- Outcome: **approved**. Authority burned (`gentle-ai.review-acknowledged/v1`).
- Delivery follows ordinary repository policy: commit, push and PR stay the
  user's decision.

### Advisory findings (non-blocking)

The review approved the candidate and offered no correction transition. These
were returned as informational only, and are separate later work rather than a
reason to re-run review on this candidate.

| id | lens | location | severity |
| --- | --- | --- | --- |
| R3-001 | reliability | `src/components/Header.tsx:126` | WARNING |
| R3-002 | reliability | `src/components/ImageCarousel.tsx:136-170` | WARNING |
| R3-003 | reliability | `src/components/ImageCarousel.tsx:76-104` | SUGGESTION |
| R3-004 | reliability | `src/components/ImageCarousel.tsx:155` | SUGGESTION |
| R3-005 | reliability | `src/components/ExperienceCarousel.test.tsx:99` | SUGGESTION |
| R3-006 | reliability | `src/components/Header.tsx:126` | SUGGESTION |

The envelope exposes ids, locations and severities but not the finding text, so
the descriptions are not reproduced here; read them from the native record
before acting on them.

## Open items

- No browser or device verification yet. The audit's findings are static reads.
- Device-dependent risks carried forward: whether 44px targets change carousel
  card height (CLS); whether `ExperiencesClient.tsx:43` actually overflows at
  320px; iOS scroll behaviour on the new carousel; the ~1-2px header/`pt-20`
  overlap; iOS `backdrop-blur` repaint cost; dark-mode flash on cold load.
