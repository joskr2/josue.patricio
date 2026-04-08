---
name: portfolio-tanstack-start
description: Skills for the Josue Patricio portfolio built with TanStack Start (SSR hybrid, Vite + Nitro + TanStack Router)
type: core
requires:
  - "@tanstack/react-router"
  - "@tanstack/react-start"
  - nitro
---

## Overview

This portfolio is a personal website built with **TanStack Start** — a full-stack React framework combining Vite, Nitro, and TanStack Router for SSR hybrid rendering.

## Architecture

```
src/
├── routes/              # TanStack Start file-based routing
│   ├── __root.tsx      # Root layout with HeadContent, Scripts
│   ├── index.tsx       # Home page (/)
│   ├── about.tsx       # About page (/about)
│   ├── contact.tsx     # Contact page (/contact)
│   ├── projects.tsx    # Projects page (/projects)
│   ├── experiences.tsx # Experiences list (/experiences)
│   └── experiences/
│       └── $slug.tsx   # Dynamic experience detail (/experiences/:slug)
├── components/         # Shared React components (vanilla, no framework imports)
├── lib/               # Data, i18n, utilities
├── hooks/             # Custom hooks (useTranslation)
└── styles/            # Tailwind CSS (src/styles/tailwind.css)
```

## Key Patterns

### 1. File-Based Routes (TanStack Start)

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>Page content</div>
}
```

### 2. Dynamic Routes

```tsx
// src/routes/experiences/$slug.tsx
export const Route = createFileRoute('/experiences/$slug')({
  component: ExperienceDetail,
})

function ExperienceDetail() {
  const { slug } = Route.useParams()
  // ...
}
```

### 3. SSR + Client Hybrid (Loader Pattern)

```tsx
export const Route = createFileRoute('/projects')({
  component: Projects,
  loader: async () => {
    // Server-side data fetching
    const data = await fetchProjects()
    return { projects: data }
  },
})

function Projects() {
  const { data } = Route.useLoaderData()
  // ...
}
```

### 4. Cookie-Based i18n (SSR Compatible)

```tsx
// useTranslation hook reads locale from cookie
const { t, locale } = useTranslation()

// Change locale (sets cookie + reloads)
changeLocale('es')  // or 'en'
```

### 5. Image Handling (No next/image)

Use standard `<img>` with Vite's public folder for static assets:

```tsx
<img src="/portrait.webp" alt="Profile" />
```

For dynamic images, place in `/public` and reference by path.

### 6. External Links

Use `<a>` for external URLs, not TanStack Router's `<Link>`:

```tsx
// ✅ Correct
<a href="https://github.com/joskr2" target="_blank" rel="noopener noreferrer">

// ❌ Wrong — Link only works for internal routes
<Link href="https://github.com/joskr2">GitHub</Link>
```

### 7. CSS Imports with ?url

```tsx
import appCss from '../styles/tailwind.css?url'
```

## Build & Dev Commands

```bash
npm run dev      # Vite dev server (port 3000)
npm run build    # Vite + Nitro build
npm run start    # Start production server (.output/server/index.mjs)
```

## Vercel Deployment

Uses Nitro with Vercel preset:

```ts
// vite.config.ts
import { nitro } from 'nitro/vite'
export default defineConfig({
  plugins: [
    tanstackStart({ srcDirectory: 'src' }),
    nitro({ preset: 'vercel' }),
  ],
})
```

## Common Issues & Solutions

### "useLocale must be used within a LocaleProvider"

The old Next.js Context-based i18n is incompatible with SSR. Use cookie-based `useTranslation` instead:

```tsx
// src/hooks/useTranslation.ts (SSR-compatible version)
import { useCallback, useMemo, useEffect, useState } from 'react'
import { translations, type Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'

export function useTranslation(initialLocale?: Locale) {
  const [locale, setLocale] = useState<Locale>(initialLocale ?? defaultLocale)

  useEffect(() => {
    const match = document.cookie.match(/locale=(en|es)/)
    if (match) setLocale(match[1] as Locale)
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    window.location.reload()
  }

  return { t, tArray, locale, setLocale: changeLocale }
}
```

### Build Fails: "Cannot find module 'next'"

Next.js packages still imported somewhere. Clean up:
- Remove `src/app/` directory
- Remove `src/proxy.ts`
- Replace `next/image` with `<img>`
- Replace `next/link` with `<a>` for external, `<Link to="/route">` for internal

### routesDirectory Error: "src/src/routes"

In vite.config.ts, don't use `./src/routes` as routesDirectory. Use `routes` (relative to srcDirectory) or `'./routes'` relative to project root.

### PostCSS Config Error

Don't use `postcss.config.*` with Vite + TanStack Start. Use only `@tailwindcss/vite` plugin:

```ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss(), tanstackStart(), viteReact(), nitro()],
})
```