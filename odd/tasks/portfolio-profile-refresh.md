# Feature: Portfolio profile refresh (2026 CV)

## Context

The portfolio content must match the latest CV. Changes:

- New current role: Banco GNB Perú — Digital Channels Analyst (Jun 2026 – Present).
- Softtek / RIMAC is now closed at May 2026 (was `Present`).
- Refreshed professional summary (adds Java, enterprise application development, AI adoption).
- Expanded skills: GeneXus, Java, Spring Boot, SQL Server, IBM AS/400.

Selected projects already covered by `src/lib/projects-data.ts` — no change needed.

## Tasks

- [x] T1 — Add Banco GNB Perú experience and close Softtek / RIMAC dates
- [x] T2 — Refresh professional summary and technical skills data
- [x] T3 — Refresh skill displays in the Home and About sections
- [x] T4 — Verify with the project build / type check

## Evidence

- Writer: `gentle-ai-worker`, 4 surfaces only, no other file touched, no commit.
- `git diff --stat` (scoped): `experience-data.ts +34 -6`, `personal-data.ts +9 -5`,
  `AboutClient.tsx +4 -12`, `HomeClient.tsx +2 -2`.
- T4: `npx -p typescript@5.3.3 tsc --noEmit --skipLibCheck src/lib/experience-data.ts
  src/lib/personal-data.ts` → exit 0. Both data files compile standalone, so the new
  `end: '2026-05'` string and the added skill arrays are type-valid.
- Full `next build` was NOT run: `node_modules` is absent in this clone and the install
  was not authorized. That check is pending.
- Slug check: `slugify('Banco GNB Perú')` → `banco-gnb-peru`, no collision with existing
  experience slugs.
- Engram mirror: observation 2161, topic `odd/portfolio-profile-refresh/tasks`.

## Open items

- HomeClient badge arrays were left on a single line (no formatter run in this clone).
- `.atl/skill-registry.md` was already modified before this work and is left uncommitted.

## Commits

- `feat(portfolio): refresh profile with latest CV` — single work unit on branch
  `feat/portfolio-profile-refresh` (hash recorded in the hand-off report, since
  amending this document rewrites it).
