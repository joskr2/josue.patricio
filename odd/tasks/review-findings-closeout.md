# Feature: Close the review findings

## Context

The four native review slices produced 17 non-blocking findings. The user asked for
six of them to be closed automatically.

## Tasks

- [x] F1 — Raise the two React Compiler rules back to `error` and resolve every site
- [x] F2 — Make the carousel autoplay stop while it is not on screen
- [x] F3 — Add a test runner, a `test` script, and prove the toggle behaviour
- [x] F4 — Assert experience slug uniqueness
- [x] F5 — Add an automated check for the downloadable CV PDFs
- [x] F6 — Verify: lint, typecheck, test, build

## Evidence

### Commits

| Commit | What |
| --- | --- |
| `7d5a814` | F1, F2 — lint coverage restored, off-screen carousel stopped, dead `AppContext` removed |
| `619f0d7` | F3, F4, F5 — test runner, toggle proof, slug guard, CV PDF check |

### F1 — the finding's premise was false, its substance was real

`biome.json` never had a `reactCompilerMigration` block: that block lived in the
**ESLint** config that the Biome migration deleted. So the two checks were not
downgraded, they were dropped outright, and Biome 2.5.15 does not expose them as
separate rules — the only carrier is `nursery/useReactCompiler`. Enabled at `error`
level; six sites suppressed with a concrete reason each (mount-time reconciliation
from `localStorage`, reduced-motion preference read, typewriter timer state,
cross-component state propagation), and one site genuinely fixed.

The fix exposed a trap: restructuring `usePrevious` to satisfy the rule silently
changed its semantics from "value at the previous render" to "last distinct value".
Since `AppContext` and `previousPathname` have **zero readers** in the tree, the hook
was deleted rather than shipped with changed semantics.

### F2 — off-screen carousel

`ImageCarousel` now observes its own root and runs the interval only while
intersecting and unpaused. A `display: none` element never intersects, so the branch
hidden by the breakpoint switch stops on its own; the gallery carousel also stops
while scrolled off screen.

### Gates (all re-run after regenerating the lock)

- `npm ci` → exit 0 (proves the lock installs, not just a dry run).
- `npm run lint` → exit 0, 0 errors, 0 warnings, 56 files.
- `npm run typecheck` → exit 0.
- `npm test` → exit 0, 2 files, 4 tests.
- `npm run verify:cv` → exit 0; both PDFs found, markers `GNB` and `GeneXus` present
  in each, files not byte-identical.
- `npm run build` → exit 0, 10 static pages.

### Deliberate deviations and residual risk

- **Test-first was observed for F3 only.** The test failed on the missing import
  (RED), then passed after the component landed. F4 is a regression guard and passed
  on its first run — it never went red, and that is reported as such.
- **The toggle test mocks `useTranslation`** rather than mounting `LocaleProvider`,
  because the real locale is reconciled from `localStorage`/`navigator` after mount
  and would make the rendered label environment-dependent.
- **Vitest is pinned to `^4.1.11`**, not 5, because Vitest 5 requires
  `@types/node` ^22 while the project declares ^20.
- **`vitest.config.ts` is loaded as CommonJS** and Vite prints a deprecation warning.
  Cosmetic today; it will break when Vite flips `configLoader` to native. The fix is
  renaming it to `.mts`.
- **`verify:cv` failure branches were not executed** (a missing file, a too-small
  file, an absent marker, a byte-identical pair). The search was probed read-only to
  confirm it discriminates, but the negative paths are unproven.
- **`biome.json` cannot carry a comment**: Biome parses it as strict JSON, so the
  rationale for `useReactCompiler` lives in the in-source suppression reasons.
- **No browser verification** of the mobile home layout or the carousel behaviour;
  both are established by construction and by the build, not by an executed render.
