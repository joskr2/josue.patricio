# Feature: Alcanzabilidad, acciones y nombres accesibles

## Context

El bloque anterior dejó el sitio indexable y liviano, pero la auditoría había
encontrado que buena parte del contenido era difícil de alcanzar y que varios
controles no tenían nombre en el idioma de la página:

- `/experiences` y sus siete detalles no estaban en el menú. La única ruta a una
  oferta de trabajo concreta era hacer scroll por `/about`. Además el item activo
  comparaba `pathname === href`, así que una página hija nunca iluminaba a su
  padre.
- El CV se descargaba sólo desde `/contact`. La traducción `home.downloadCV`
  existía en los dos diccionarios y no la usaba nadie.
- Los `mailto:` abrían sin asunto, y la tarjeta de contacto los abría en pestaña
  nueva porque todo lo que no fuera `tel:` se trataba como externo — dejando una
  pestaña vacía atrás.
- La grilla de contacto era de 3 columnas para 4 tarjetas: una huérfana en la
  segunda fila y un email que sólo entraba cortándose a mitad del dominio.
  `truncate` escondía la dirección en vez de envolverla.
- Los nombres accesibles estaban en inglés fijo ("Open menu", "Scroll to top",
  "Switch to English") aunque la página estuviera en español, y
  `prefers-reduced-motion` sólo se respetaba en dos lugares escritos a mano.

## Tasks

- [x] U1 — `Experiences` en el menú de escritorio, el móvil y el footer; item
  activo también para rutas hijas
- [x] U2 — CTA de CV y de contacto en el hero; CV en el footer
- [x] U3 — `mailto:` con asunto precargado y sin pestaña nueva
- [x] U4 — Grilla de contacto a 2 columnas, valores con wrap en vez de `truncate`
- [x] U5 — Bloque `a11y` en los dos diccionarios, `aria-pressed` en el selector
  de idioma, `MotionConfig reducedMotion="user"` global
- [x] U6 — Un solo candidato a LCP: `priority` pasa a ser prop opt-in del carrusel

## Evidence

### Commits

| Commit | What |
| --- | --- |
| `9290fae` | U1–U5 — navegación, CTAs, contacto, nombres accesibles, reduced motion |
| `25d389f` | U6 — preloads de imagen: 3 → 1 en la home, 1 en `/about` |

### Gates

- `npm run check` → exit 0: lint limpio, typecheck limpio, 5 archivos / 19
  tests, `verify:cv` ok.
- `npm run build` → exit 0, 18 rutas (7 SSG + share image).

### Probes

| Probe | Antes | Después |
| --- | --- | --- |
| Menú de escritorio | Home, About, Projects, Contact | + Experience, activo en `/experiences/*` |
| `curl /` → `<link rel="preload" as="image">` | 3 | 1 |
| `curl /about` → preloads | 1 | 1 |
| `mailto:` del CTA | sin asunto | `?subject=Contact%20from%20your%20portfolio` |
| Grilla de contacto (lg) | 3 columnas, 4 tarjetas | 2 × 2, email en una línea |
| `aria-label` del menú móvil | `Open menu` con UI en ES | `Abrir menú` |

Screenshots headless a 1280, 768 y 500 px confirman el menú de cinco items
(entra sin desbordar en 768), los CTAs del hero y la grilla de contacto.

El test del header mockeaba `t` como `(key) => key`, que es exactamente por qué
afirmaba el inglés hardcodeado; ahora resuelve el diccionario real, así que una
traducción faltante rompe la aserción en vez de filtrar `a11y.openMenu`.

### Lo que queda abierto (decisión de diseño)

La home sigue montando dos carruseles, uno por breakpoint: el de móvil incluye
el retrato como primera diapositiva y el de escritorio muestra el retrato como
tarjeta rotada aparte. Colapsarlos en una sola instancia obliga a decidir si la
tarjeta rotada sobrevive en escritorio, o si el retrato pasa a ser la primera
diapositiva del único carrusel. Es una decisión de diseño, no una limpieza.
