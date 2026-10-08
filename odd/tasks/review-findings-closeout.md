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

## Native review attempt — blocked on scope, then waived by the user

RDD is on for this clone. The candidate offered by the native preflight is the whole
branch against base `529c486` (`68` files, `16038` changed lines). The attempt did not
create review authority, and the retry needs one host change.

### Attempts and their exact outcomes

| Attempt | Route | Outcome |
| --- | --- | --- |
| Facade `START` ×3 | `gentle_review start` with `{"mode":"ordinary"}` | `consent-binding-stale` → `consent-binding-expired` after ~10 min each; `lineage_created: false`, `mutation_outcome: none` |
| Provider relay envelope | `gentle-ai review start … --consent=relay` | returned the typed `gentle-ai.review-integration.consent/v3` question |
| Granted invocation | the envelope's `granted` invocation, verbatim | `guarded-ai.review-integration.failure/v2` → code `lens_context_budget_exceeded`, phase `preflight`, `mutation_outcome: not_started`, `authority_applicability: not_evaluated`, `next_action: stop` |
| Earlier session, same repo | lineage `review-04133d1c96a0ed49` over `dc3370a` → HEAD (`15` paths, `4986` changed lines) | lens `review-reliability` killed: `relay_transport_bound_exceeded`, `killed after 1415576ms against a 932766ms relay bound` |

The `lens_context_budget_exceeded` failure is terminal for this candidate and creates
nothing to repair: the immutable evidence is never truncated, so retrying the same
scope cannot succeed. The earlier lineage proves the complementary point — a slice
small enough to pass preflight still needs a host relay bound large enough to let the
reviewer finish.

### The host knob

`GENTLE_PI_REVIEW_RELAY_PI_TIMEOUT_MS` replaces the derived relay bound (15-minute
floor + 15 minutes per mebibyte of reviewer prompt, 2-hour ceiling). It must be set in
the Pi host process, so it survives only a restart:

```sh
export GENTLE_PI_REVIEW_RELAY_PI_TIMEOUT_MS=7200000
pi
```

### Retry recipe

The facade consent relay does not resolve in this host (three blocking expiries above),
so `START` is driven through the provider's own relay envelope and the verbatim
invocation it prints for the chosen answer. Everything after `START` stays on the
facade (`status`, `gentle_review_capture`) because the lineage is workspace-scoped.

1. Reduced scope first — this slice already passes preflight:

   ```sh
   gentle-ai review start --contract gentle-ai.review-integration/v2 --cwd /Users/josue/Documents/josue.patricio \
     --base-ref dc3370afbe845867d0d5db2e81d09a9c6042860d --committed-only --agent pi --consent=relay
   ```

2. Relay the printed envelope to the user, then run the invocation printed for the
   chosen answer, verbatim.
3. `gentle_review` `status` with the returned `lineageId`, then collect exactly the
   returned slots with `gentle_review_capture` / `gentle_review_capture_group`.

`--base-ref` rejects abbreviated commit ids, so the full 40-character id is required.

### Slice sizes for the remaining scope

The whole branch does not fit; these are the work-unit boundaries already in history
(`insertions + deletions`, which is the unit the native `changed_lines` reports):

| Slice | Range | Files | Lines |
| --- | --- | --- | --- |
| S4 (retry first) | `dc3370a` → HEAD | 15 | 4986 |
| S3 | `053035d` → `dc3370a` | 48 | 8571 |
| S2 | `1d1ac6d` → `053035d` | 26 | 5826 |
| S1 | `529c486` → `1d1ac6d` | 13 | 13383 |

S1 is dominated by the regenerated `package-lock.json` and is the most likely to fail
preflight again; if it does, the delivery candidate has to be reduced rather than
retried.

## Decision — the candidate is delivered without native review

The user explicitly left **this** candidate unreviewed after seeing the blocker above
and the two available routes (restart the Pi host with
`GENTLE_PI_REVIEW_RELAY_PI_TIMEOUT_MS` and retry slice S4, or attempt S4 against the
unchanged derived relay bound). No review lineage was created for this candidate, so
there is no authority to acknowledge, reuse, or burn.

Scope of the waiver: it covers the current branch tip only. A later candidate (a new
work unit, or the same content re-submitted) starts from a fresh preflight, and the
retry recipe above stays valid for it.

### Residual risk accepted with the waiver

- No native review ran against any slice of this branch.
- No browser or device verification of the mobile home layout or either carousel;
  both rest on construction and a passing production build.
- The negative branches of `npm run verify:cv` (missing file, undersized file, absent
  marker, byte-identical pair) were never executed.
- `vitest.config.ts` is still loaded as CommonJS and prints a Vite deprecation
  warning; it will break when Vite flips `configLoader` to native.

Everything else in this document was verified by executed commands, listed under
*Gates*.

## Commits

| Commit | What |
| --- | --- |
| `7d5a814` | F1, F2 |
| `619f0d7` | F3, F4, F5 |
| `820837e` | Blocked-review record and retry recipe |
