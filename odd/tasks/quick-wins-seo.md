# Feature: Quick wins — SEO, prerendering y peso de assets

## Context

Una auditoría del sitio (código, HTML servido con `next start`, bundles, assets)
encontró que la base estaba sana — lint, typecheck, 19 tests y build en verde —
pero que cuatro defectos concretos costaban visibilidad y peso reales:

1. `src/app/experiences/[slug]/page.tsx` era client component, así que no podía
   exportar `generateStaticParams` ni `generateMetadata`. Las siete páginas
   servían el título y la descripción del root, y heredaban el canonical del
   root layout (`/`): el sitio le declaraba a Google que toda la sección de
   experiencia era un duplicado de la home, y re-renderizaba cada página on
   demand.
2. El `prose` del detalle de experiencia no existía: Tailwind 4 no incluye el
   plugin de tipografía, `.prose` compilaba a cero reglas y el preflight
   (`ul { list-style: none }`) dejaba cada descripción como párrafos planos.
3. El h1 de la home era la salida del typewriter, que arranca vacío: el HTML
   servido era `<h1><span>|</span></h1>`. El nombre, el texto más importante de
   la página y candidato a LCP, aparecía sólo después de ~3.7s de hidratación.
   En `/about`, el hero móvil y el de escritorio convivían montados: dos `h1`,
   dos retratos con `priority`, biografía y links duplicados en el DOM.
4. No había `og:image` pese a declarar `twitter:card=summary_large_image`, y
   `public/images` era una copia byte a byte de `src/images` (3.2MB) sin un solo
   lector.

## Tasks

- [x] Q1 — Instalar `@tailwindcss/typography` y registrar el plugin en el CSS
- [x] Q2 — Partir `[slug]` en server component + `ExperienceDetail` cliente, con
  `generateStaticParams` y `generateMetadata` por página
- [x] Q3 — Servir el nombre en el `h1` de la home; un solo `h1` en `/about`
  fusionando los dos layouts duplicados en un grid con placement explícito
- [x] Q4 — Generar `opengraph-image` estática 1200×630 y añadir JSON-LD `Person`
- [x] Q5 — `siteUrl` desde `NEXT_PUBLIC_SITE_URL` con fallback al deploy actual
- [x] Q6 — Borrar `public/images/`, `image-5.webp`, `avatar.webp` y reescalar
  las fotos de la galería a 1200px de lado mayor
- [x] Q7 — Borrar el middleware que escribía una cookie de locale que nadie lee
- [x] Q8 — Actualizar `sharp` a 0.35.5 (cuatro advisories de npm audit)

## Evidence

### Commits

| Commit | What |
| --- | --- |
| `176f101` | Q1, Q8 — tipografía + sharp 0.35.5 |
| `0003b7c` | Q2 — siete rutas pasan de dinámicas a SSG, con metadata propia |
| `2d68e5c` | Q3 — un `h1` por página, nombre en el HTML, typewriter eliminado |
| `f588f76` | Q4 — share image + JSON-LD |
| `0859044` | Q5 — origen canónico desde el entorno |
| `a14d20d` | Q6 — −3.2MB de assets duplicados, fotos 3.0MB → 878KB |
| `9cf2d82` | Q7 — middleware eliminado |

### Gates

- `npm run check` → exit 0 antes y después: lint limpio, typecheck limpio,
  5 archivos / 19 tests, `verify:cv` ok.
- `npm run build` → exit 0. Antes: `ƒ /experiences/[slug]` + `ƒ Proxy`.
  Después: siete rutas `●` (SSG), `○ /opengraph-image`, sin middleware.

### Probes (servidor de producción real, `next start`)

| Probe | Antes | Después |
| --- | --- | --- |
| `curl /experiences/auna` → `<title>` | el default del root | `Software Engineer at Auna - Josue Retamozo` |
| `curl /experiences/auna` → canonical | `https://…/` | `https://…/experiences/auna` |
| `curl /` → `<h1>` | `<h1><span>|</span></h1>` | `Josue Patricio Retamozo Vargas` |
| `curl /about` → número de `<h1>` | 2 | 1 |
| `curl /` → `og:image` / `twitter:image` | ausentes | 1200×630 PNG, 200 `image/png` |
| `curl /` → `"@type":"Person"` | ausente | presente |
| `curl -I /` → `set-cookie` | `locale=en` en HTML cacheado | ninguno |
| `curl /experiences/no-existe` | 404 | 404 (sigue en el servidor) |
| CSS compilado → `.prose` | 0 reglas | `.prose :where(ul){list-style:disc}` |
| Fotos de galería | 4032×3024, ~880KB c/u | 1200 lado mayor, 231KB máx |
| JS gzip (home) | 287KB | 280KB |

Screenshots headless (desktop 1280, móvil 500 — Chrome headless clampa el
viewport a 500px, verificado con una página que imprime `innerWidth`) confirman
el hero, el layout único de `/about` y las viñetas del detalle renderizando.

### Lo que este work unit no toca

Los carruseles duplicados de la home y los ~280KB de JS siguen ahí: el sitio es
100% client components, y bajarlo de verdad exige mover i18n a rutas por idioma
con server components. Ese es el siguiente bloque.
