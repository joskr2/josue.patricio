# Feature: Portfolio hardening

## Context

Full read-only audit of the project surfaced bugs, duplication, i18n gaps, SEO gaps,
accessibility issues, and config drift. The user selected all four blocks for
implementation, delivered as four work units.

Reference: this document. Branch: `feat/portfolio-profile-refresh`.

## Tasks

### Work unit 1 — Correctness bugs

- [ ] H1 — Remove the LocaleContext mount gate that served empty HTML on every route, and sync `<html lang>`
- [ ] H2 — Regenerate `package-lock.json` (still pinned to Next 14 / React 18, missing `lucide-react`)
- [ ] H3 — Fix the contact map link (Arequipa → Lima)
- [ ] H4 — Return a real 404 for unknown experience slugs and translate the detail page
- [ ] H5 — Delete the dead `src/app/about/page-new.tsx` and the dead AboutClient imports

### Work unit 2 — i18n and SEO

- [ ] H6 — Complete i18n coverage (ProjectsClient, not-found, showcase, experiences list)
- [ ] H7 — SEO: per-route metadata, OpenGraph, canonical, sitemap, robots

### Work unit 3 — Single source of truth and hygiene

- [ ] H8 — Remove duplicated data (HomeClient skills, contact social handles, i18n sportsBetting)
- [ ] H9 — Repo hygiene (package name, scripts, README, unused deps, biome, formatting, gitignore)

### Work unit 4 — Accessibility and performance

- [ ] H10 — Accessibility (heading order, gallery alts, carousel pause control)
- [ ] H11 — Performance (hero carousel CLS, server/client split)

### Verification

- [ ] H12 — Install dependencies and run typecheck, lint, and build

## Evidence

Pending.
