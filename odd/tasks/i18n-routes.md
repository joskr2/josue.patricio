# Feature: i18n por ruta (dos idiomas prerenderizados)

## Context

El español existía sólo en `localStorage`. El servidor renderizaba siempre
inglés, `<html lang>` estaba fijo en `"en"` y se corregía después de hidratar, y
no había ninguna URL a la que un lector hispanohablante —o un crawler— pudiera
llegar: compartir el sitio siempre lo abría en inglés y la copia en español era
invisible para búsqueda. La auditoría inicial lo marcó como el bloqueo de SEO
más caro del proyecto.

## Tasks

- [x] I1 — Mover todas las rutas bajo `app/[locale]/` y hacer de ese layout el
  root layout (es el único que puede fijar `<html lang>`)
- [x] I2 — `generateStaticParams` con `en`/`es`: 24 páginas prerenderizadas
- [x] I3 — Metadata por página y por idioma (canonical, hreflang + x-default,
  `og:locale`/`alternateLocale`) desde un bloque `meta` en cada diccionario
- [x] I4 — `LocaleProvider` recibe el idioma del servidor y cambia navegando,
  no con estado de cliente
- [x] I5 — `proxy.ts`: "/" y las URLs previas al cambio (`/about`,
  `/experiences/auna`) redirigen 308 al idioma del visitante
- [x] I6 — Localizar todos los enlaces internos (menú, footer, tarjetas, CTAs)
- [x] I7 — sitemap con ambos idiomas y `alternates.languages`
- [x] I8 — Compartir la tarjeta social: de file convention a `○ /og` estático

## Evidence

### Commit

| Commit | What |
| --- | --- |
| `345299e` | I1–I8 — rutas por idioma, metadata bilingüe, redirects, sitemap, /og |

### Gates

- `npm run check` → exit 0: lint limpio, typecheck limpio, 5 archivos / 19
  tests, `verify:cv` ok.
- `npm run build` → exit 0. Antes: 12 rutas (5 estáticas + 7 SSG) y una imagen
  social heredada. Después: 24 páginas SSG (12 por idioma), `○ /og`,
  `ƒ Proxy` y ninguna advertencia de `metadataBase`.

### Probes (servidor de producción)

| Probe | Antes | Después |
| --- | --- | --- |
| `curl /` | 200 en inglés | 308 → `/en` (`/es` con `Accept-Language: es`) |
| `curl /about` (URL previa) | 200 en inglés | 308 → `/en/about` |
| `curl /es/about` → `<html lang>` | no existía | `es` |
| `curl /es/about` → `<title>` | no existía | `Acerca de - Josue Retamozo` |
| hreflang en `/es/about` | ausente | `en`, `es`, `x-default` |
| canonical `/en/about` vs `/es/about` | ambos `/about` | cada uno el suyo |
| `og:image` en páginas con metadata propia | ausente | `…/og` (1200×630) |
| `curl /og` | — | 200 `image/png`, 57KB, ruta `○` |
| sitemap | 12 URLs | 24 URLs con hreflang |
| `/es/no-existe` | — | 404 |
| JSON-LD en `/es` | `jobTitle` en inglés | `"jobTitle":"Ingeniero de Software"` |
| JS gzip (`/en`, `/es`) | 282KB | 282KB (sin cambio, ver abajo) |

### Lo que este work unit no resuelve

El peso de JavaScript no bajó: 282KB gzip por página. La causa es que el sitio
sigue siendo client components — `Layout` importa `motion` para la transición
de página, y de ahí lo hereda cada ruta. Bajar el JS exige sacar `motion` del
shell y del contenido (CSS en su lugar): son ~43KB gzip medidos en el chunk
propio de motion, más lo que arrastra. Es una decisión de diseño —las
animaciones son parte de la identidad actual— y por eso quedó fuera de este
commit.
