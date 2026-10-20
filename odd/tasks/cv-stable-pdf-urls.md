# Feature: Stable CV PDF URLs

## Context

Publishing the current CV export took three commits (`d3c44e3`, `638560d`,
`bcd7c7b`) and grew `scripts/verify-cv-pdfs.mjs` into a 280-line hand-written PDF
parser: object indexing, FlateDecode inflation, ToUnicode CMap decoding, and
content-stream font tracking. The parser had already broken once when the
exporter changed (pdfTeX → xdvipdfmx), checked content markers (`GNB`,
`GeneXus`) that couple the site to what the CV says, and was not wired into any
gate — `check`, `build`, or CI. Renaming the PDFs on every update also forced
edits in `ContactClient.tsx`, the verify script, and `next.config.ts`.

Tracked as issue #7 (approved by the user). The goal: updating a CV means
overwriting a file under `public/` and committing, with zero code changes.

## Tasks

- [x] C1 — Rename the PDFs to stable names (`cv-es.pdf`, `cv-en.pdf`); last rename ever
- [x] C2 — Move hrefs and friendly download names to `src/lib/personal-data.ts` (`cv` export)
- [x] C3 — Point every URL the site has ever served a CV from at the stable names
- [x] C4 — Shrink the verify script to the failure modes of the swap: missing file,
  non-PDF or truncated upload, same file twice (280 → 62 lines, no PDF parsing)
- [x] C5 — Wire `verify:cv` into `npm run check` so the gate actually runs
- [x] C6 — Probe the verify script's negative branches against fixtures
- [x] C7 — Document the update flow in the README

## Evidence

### Commits

| Commit | What |
| --- | --- |
| `8346007` | C1–C7 — stable filenames, single source of truth, lean verify, redirects, check hook, README |

### Gates (run after the change, bracketing both sides)

- `npm run check` → exit 0: lint clean, typecheck clean, 5 test files / 19 tests,
  `verify:cv` ok on both stable files.
- `npm run build` → exit 0, 10 static pages.
- Before the edits the same gates were green on the old layout, so no
  pre-existing failure leaks into this diff.

### Negative-branch probes (script copy against fixtures in /tmp, repo untouched)

| Fixture | Result |
| --- | --- |
| Both files missing | exit 1, "not found at public/…" ×2 |
| Random bytes (not a PDF) | exit 1, "no %PDF- header" ×2 |
| Header present, no `%%EOF` in tail | exit 1, "no %%EOF trailer… upload is truncated" |
| Same valid file as both PDFs | exit 1, "the two CV PDFs are byte-identical" |
| Two distinct valid PDFs | exit 0 |

This closes the residual risk recorded in `review-findings-closeout.md`, where
the old script's negative branches were never executed.

### Deliberate deviations and residual risk

- **Text-marker checking was dropped, not replaced.** What the CV says is
  verified when it is exported, not by the site that serves it. If content
  assertions are ever wanted again, the honest carrier is a PDF text library
  (`pdf-parse`), not an in-repo parser.
- **The four redirects are `permanent: true` (308).** Browsers cache them
  indefinitely, which is acceptable because the stable names are intended to be
  final; a future rename would still work server-side but stale client caches
  could linger.
- **The old `CV_Josue_Retamozo_*.pdf` names redirect too**, even though they
  only served for about a day — cheap insurance for any link grabbed in that
  window.
- **No browser verification of the download buttons**; the href change is
  covered by typecheck and the build, not by an executed click.

## Commits

- `8346007` refactor(cv): stable filenames, one source of truth, lean verify
