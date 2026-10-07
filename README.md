# 🚀 Spotlight Portfolio

Un portafolio moderno y responsivo construido con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS 4**, diseñado para mostrar experiencia profesional en desarrollo de software.

![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.7-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

- **🎨 Diseño Moderno**: Interfaz elegante con modo oscuro/claro
- **📱 Completamente Responsivo**: Optimizado para desktop, tablet y móvil
- **⚡ Rendimiento Optimizado**: Build optimizado con Next.js 16
- **🌐 Multiidioma**: Soporte para inglés y español
- **🎯 SEO Optimizado**: Meta tags y Open Graph configurados
- **♿ Accesible**: Cumple con estándares WCAG 2.1
- **🔧 TypeScript**: Completamente tipado para mejor developer experience

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitario
- **Headless UI** - Componentes accesibles sin estilos

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Sharp** - Optimización de imágenes

## 📁 Estructura del Proyecto

```
josue.patricio/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── about/             # Página de información personal
│   │   ├── contact/           # Página de contacto
│   │   ├── experiences/       # Experiencia laboral (lista + detalle [slug])
│   │   ├── projects/          # Portafolio de proyectos
│   │   ├── layout.tsx         # Layout principal
│   │   ├── not-found.tsx      # Página 404
│   │   ├── page.tsx           # Página de inicio
│   │   ├── providers.tsx      # Providers globales
│   │   ├── robots.ts          # Metadatos para robots
│   │   └── sitemap.ts         # Sitemap del sitio
│   ├── components/            # Componentes reutilizables
│   │   ├── Button.tsx         # Botón base
│   │   ├── Card.tsx           # Componente de tarjeta
│   │   ├── Container.tsx      # Contenedor responsivo
│   │   ├── Footer.tsx         # Footer del sitio
│   │   ├── Header.tsx         # Header con navegación
│   │   └── ...
│   ├── hooks/                 # Custom hooks
│   │   ├── useTranslation.ts  # Hook para internacionalización
│   │   └── useTypewriter.ts   # Hook de efecto máquina de escribir
│   ├── images/                # Recursos de imagen
│   ├── lib/                   # Utilidades y datos
│   │   ├── experience-data.ts # Datos de experiencia laboral
│   │   ├── personal-data.ts   # Información personal
│   │   ├── projects-data.ts   # Datos de proyectos
│   │   └── i18n.ts           # Configuración de idiomas
│   └── styles/
│       └── tailwind.css       # Estilos globales
├── public/                    # Archivos estáticos
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/joskr2/josue.patricio.git
   cd josue.patricio
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar datos personales**

   Edita los archivos en `src/lib/`:

   - `personal-data.ts` - Información personal
   - `experience-data.ts` - Experiencia laboral
   - `projects-data.ts` - Portafolio de proyectos

4. **Agregar imágenes**

   Coloca tus imágenes en `src/images/`:

   - `avatar.webp` - Avatar para el header
   - `portrait.webp` - Foto principal
   - `photos/` - Galería de fotos

## 🎯 Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint

# Chequeo de tipos
npm run typecheck

# Formateo
npm run format
npm run format:check
```

## 📝 Personalización

### 1. Información Personal

Edita `src/lib/personal-data.ts`:

```typescript
export const personalInfo = {
  name: 'Tu Nombre',
  title: {
    en: 'Software Engineer',
    es: 'Ingeniero de Software',
  },
  email: 'tu@email.com',
  // ...
}
```

### 2. Experiencia Laboral

Actualiza `src/lib/experience-data.ts`:

```typescript
export const experiences = [
  {
    company: 'Tu Empresa',
    position: { en: 'Senior Developer', es: 'Desarrollador Senior' },
    duration: { en: '2023 - Present', es: '2023 - Presente' },
    // ...
  },
]
```

### 3. Proyectos

Modifica `src/lib/projects-data.ts`:

```typescript
export const projects = [
  {
    id: 'project-1',
    title: { en: 'Project Title', es: 'Título del Proyecto' },
    description: { en: 'Description', es: 'Descripción' },
    // ...
  },
]
```

### 4. Traducciones

Actualiza `src/lib/i18n.ts` para agregar o modificar traducciones.

## 🎨 Componentes Principales

### Card

Componente versátil para mostrar contenido:

```tsx
<Card>
  <Card.Title>Título</Card.Title>
  <Card.Description>Descripción</Card.Description>
  <Card.Cta>Acción</Card.Cta>
</Card>
```

### Container

Contenedor responsivo con máximo ancho:

```tsx
<Container className="mt-16">{/* Contenido */}</Container>
```

### Button

Botón con múltiples variantes:

```tsx
<Button variant="primary" href="/contact">
  Contactar
</Button>
```

## 🌐 Funcionalidades

### ✅ Implementadas

- [x] Diseño responsivo completo
- [x] Modo oscuro/claro
- [x] Navegación fluida
- [x] Galería de fotos
- [x] Portafolio de proyectos
- [x] Información de contacto
- [x] Soporte multiidioma
- [x] SEO optimizado
- [x] Accesibilidad

### 🎯 Próximas Mejoras

- [ ] Blog/Artículos
- [ ] Formulario de contacto funcional
- [ ] Animaciones avanzadas
- [ ] PWA (Progressive Web App)
- [ ] Analytics integrado

## 📊 Rendimiento

- **Lighthouse Score**: 95+ en todas las métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Bundle Size**: ~110KB inicial

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Josue Patricio Retamozo Vargas**

- GitHub: [@joskr2](https://github.com/joskr2)
- LinkedIn: [josue-retamozo](https://linkedin.com/in/josue-retamozo)
- Email: josuepatricio.rt@gmail.com

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) por el framework CSS
- [Next.js](https://nextjs.org/) por el framework React
- [Headless UI](https://headlessui.dev/) por los componentes accesibles
- [Vercel](https://vercel.com/) por la plataforma de deployment

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella!
