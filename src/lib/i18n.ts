export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'es'
}

/** Prefix an app path with its locale: localizedPath('es', '/about') -> '/es/about' */
export function localizedPath(locale: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

/** Drop the locale prefix: '/es/about' -> '/about' */
export function unlocalizedPath(pathname: string): string {
  const match = pathname.match(/^\/(?:en|es)(\/.*)?$/)
  return match ? (match[1] ?? '/') : pathname
}

/** hreflang map for a locale-independent path, including x-default. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, localizedPath(locale, path)]),
    ),
    'x-default': localizedPath(defaultLocale, path),
  }
}

export function ogLocale(locale: Locale): string {
  return locale === 'es' ? 'es_PE' : 'en_US'
}

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      experiences: 'Experience',
      contact: 'Contact',
    },
    // Accessible names for controls that only show an icon or a symbol
    a11y: {
      skipToContent: 'Skip to content',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      home: 'Home',
      scrollToTop: 'Scroll to top',
      switchToEnglish: 'Switch to English',
      switchToSpanish: 'Switch to Spanish',
      sendEmail: 'Send email',
      followOnGitHub: 'Follow on GitHub',
      followOnLinkedIn: 'Connect on LinkedIn',
      switchToLightTheme: 'Switch to light theme',
      switchToDarkTheme: 'Switch to dark theme',
      toggleTheme: 'Toggle theme',
    },
    // Homepage
    home: {
      title: 'Software Engineer',
      subtitle: 'Specialized in React and .NET with 5+ years of experience',
      intro:
        'Software Engineer with over 5 years of experience developing solutions across education, finance, retail, and e-commerce sectors. My specialty and passion lies in Frontend development with React.js and React Native, building scalable, high-performance, and accessible interfaces. I complement my profile with a solid Full-Stack foundation in C# (.NET) and Microservices, allowing me to integrate and design end-to-end solutions seamlessly. Comfortable working with AWS Cloud environments and Docker deployments.',
      featuredProject: 'Featured Project',
      viewProject: 'View Project',
      getInTouch: 'Get in Touch',
      downloadCV: 'Download CV',
      readMore: 'Read more',
      readLess: 'Read less',
    },
    // About page
    about: {
      title: 'About Me',
      intro:
        'Passionate about web technologies and committed to accessibility and usability.',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      certifications: 'Certifications',
      location: 'Lima, Peru',
      viewDetail: 'View detail',
    },
    // Experiences detail page
    experiences: {
      technologies: 'Technologies',
      subtitle: 'My professional journey and work experience',
    },
    // Projects page
    projects: {
      title: 'Projects',
      subtitle:
        'Showcasing my technical expertise and problem-solving abilities',
      viewLive: 'View Live',
      viewCode: 'View Code',
      technologies: 'Technologies',
      features: 'Key Features',
      backend: 'Backend',
      frontend: 'Frontend',
      bffService: 'BFF Service',
      architecture: 'Architecture',
      performance: 'Performance',
      liveServices: 'Live Services',
      apiHealthCheck: 'API Health Check',
      bffHealthCheck: 'BFF Health Check',
      more: 'more',
    },
    // Contact page
    contact: {
      title: 'Contact',
      subtitle: "Let's work together",
      // Used by the floating WhatsApp button in Layout.tsx
      whatsappPrefill: "Hi! I saw your website and I'd like more information.",
      whatsappTooltip: 'Chat on WhatsApp',
      downloadCV: 'Download my CV',
      formTitle: 'Send me a message',
      formIntro:
        'Fill out the form below and I will get back to you within 24 hours.',
      formName: 'Your name',
      formNamePlaceholder: 'John Doe',
      formEmail: 'Your email',
      formEmailPlaceholder: 'john@example.com',
      formMessage: 'Your message',
      formMessagePlaceholder: 'Tell me about your project or idea...',
      formSend: 'Send message',
      formSending: 'Sending...',
      formSuccessTitle: 'Message sent!',
      formSuccessMessage:
        "Thanks for reaching out. I'll get back to you as soon as possible.",
      formSendAnother: 'Send another message',
      formError:
        'Something went wrong while sending your message. Please try again.',
    },
    // Footer
    footer: {
      allRightsReserved: 'All rights reserved.',
    },
    // Not found page
    notFound: {
      title: 'Page not found',
      description: 'Sorry, we couldn’t find the page you’re looking for.',
      backHome: 'Go back home',
    },
    // Image carousel
    carousel: {
      pause: 'Pause slideshow',
      play: 'Play slideshow',
      previous: 'Previous slide',
      next: 'Next slide',
      goTo: 'Go to slide',
    },
    // Photo gallery
    gallery: {
      alts: [
        'Stone monument topped by a winged statue, seen from below',
        'Machu Picchu ruins with the Huayna Picchu peak behind them',
        'Josue in a red jacket and helmet on a paragliding launch slope above the city',
        'Josue standing between the giant buttress roots of a jungle tree',
      ],
    },
    // Page metadata
    meta: {
      home: {
        title: 'Software Engineer',
        description:
          'Josue Retamozo - Software Engineer specializing in React.js and React Native frontend development, with a full-stack foundation in C# (.NET), Java, and microservices.',
      },
      about: {
        title: 'About',
        description:
          'Experience, skills, education and certifications: React and React Native frontend work across banking, insurance, retail and e-commerce products.',
      },
      projects: {
        title: 'Projects',
        description:
          'Selected frontend and full-stack projects, including a microservices sports betting platform with a Next.js frontend, a FastAPI BFF and a .NET API.',
      },
      experiences: {
        title: 'Experience',
        description:
          'Professional experience across banking, insurance, retail and e-commerce, from frontend development to enterprise application modernization.',
      },
      contact: {
        title: 'Contact',
        description:
          'Get in touch with Josue Retamozo for collaboration, roles and freelance work.',
      },
    },
  },
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      projects: 'Proyectos',
      experiences: 'Experiencia',
      contact: 'Contacto',
    },
    // Accessible names for controls that only show an icon or a symbol
    a11y: {
      skipToContent: 'Saltar al contenido',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      home: 'Inicio',
      scrollToTop: 'Volver arriba',
      switchToEnglish: 'Cambiar a inglés',
      switchToSpanish: 'Cambiar a español',
      sendEmail: 'Enviar correo',
      followOnGitHub: 'Seguir en GitHub',
      followOnLinkedIn: 'Conectar en LinkedIn',
      switchToLightTheme: 'Cambiar a tema claro',
      switchToDarkTheme: 'Cambiar a tema oscuro',
      toggleTheme: 'Cambiar tema',
    },
    // Homepage
    home: {
      title: 'Ingeniero de Software',
      subtitle:
        'Especializado en React y .NET con más de 5 años de experiencia',
      intro:
        'Ingeniero de Software con más de 5 años de experiencia desarrollando soluciones en los sectores de educación, finanzas, retail y comercio electrónico. Mi especialidad y pasión es el desarrollo Frontend con React.js y React Native, creando interfaces escalables, de alto rendimiento y accesibles. Complemento mi perfil con una sólida base Full-Stack en C# (.NET) y Microservicios, lo que me permite integrar y diseñar soluciones de extremo a extremo con total fluidez. Me desenvuelvo con soltura en entornos Cloud de AWS y despliegues con Docker.',
      featuredProject: 'Proyecto Destacado',
      viewProject: 'Ver Proyecto',
      getInTouch: 'Contacto',
      downloadCV: 'Descargar CV',
      readMore: 'Ver más',
      readLess: 'Ver menos',
    },
    // About page
    about: {
      title: 'Acerca de Mí',
      intro:
        'Apasionado por las tecnologías web y comprometido con la accesibilidad y usabilidad.',
      experience: 'Experiencia',
      skills: 'Habilidades',
      education: 'Educación',
      certifications: 'Certificaciones',
      location: 'Lima, Perú',
      viewDetail: 'Ver detalle',
    },
    // Experiences detail page
    experiences: {
      technologies: 'Tecnologías',
      subtitle: 'Mi trayectoria profesional y experiencia laboral',
    },
    // Projects page
    projects: {
      title: 'Proyectos',
      subtitle:
        'Demostrando mi experiencia técnica y habilidades de resolución de problemas',
      viewLive: 'Ver Demo',
      viewCode: 'Ver Código',
      technologies: 'Tecnologías',
      features: 'Características Principales',
      backend: 'Backend',
      frontend: 'Frontend',
      bffService: 'Servicio BFF',
      architecture: 'Arquitectura',
      performance: 'Rendimiento',
      liveServices: 'Servicios en Vivo',
      apiHealthCheck: 'Health Check de API',
      bffHealthCheck: 'Health Check de BFF',
      more: 'más',
    },
    // Contact page
    contact: {
      title: 'Contacto',
      subtitle: 'Trabajemos juntos',
      // Used by the floating WhatsApp button in Layout.tsx
      whatsappPrefill: '¡Hola! Vi tu web y me gustaría más información.',
      whatsappTooltip: 'Chatear por WhatsApp',
      downloadCV: 'Descargar mi CV',
      formTitle: 'Envíame un mensaje',
      formIntro: 'Completa el formulario y te responderé dentro de 24 horas.',
      formName: 'Tu nombre',
      formNamePlaceholder: 'Juan Pérez',
      formEmail: 'Tu correo',
      formEmailPlaceholder: 'juan@ejemplo.com',
      formMessage: 'Tu mensaje',
      formMessagePlaceholder: 'Cuéntame sobre tu proyecto o idea...',
      formSend: 'Enviar mensaje',
      formSending: 'Enviando...',
      formSuccessTitle: '¡Mensaje enviado!',
      formSuccessMessage:
        'Gracias por escribirme. Te responderé lo antes posible.',
      formSendAnother: 'Enviar otro mensaje',
      formError:
        'Algo salió mal al enviar tu mensaje. Por favor, inténtalo de nuevo.',
    },
    // Footer
    footer: {
      allRightsReserved: 'Todos los derechos reservados.',
    },
    // Not found page
    notFound: {
      title: 'Página no encontrada',
      description: 'Lo sentimos, no encontramos la página que buscas.',
      backHome: 'Volver al inicio',
    },
    // Image carousel
    carousel: {
      pause: 'Pausar presentación',
      play: 'Reproducir presentación',
      previous: 'Diapositiva anterior',
      next: 'Diapositiva siguiente',
      goTo: 'Ir a la diapositiva',
    },
    // Photo gallery
    gallery: {
      alts: [
        'Monumento de piedra coronado por una estatua alada, visto desde abajo',
        'Ruinas de Machu Picchu con el Huayna Picchu al fondo',
        'Josue con casco y chaqueta roja en la rampa de despegue de parapente sobre la ciudad',
        'Josue entre las raíces gigantes de un árbol de la selva',
      ],
    },
    // Page metadata
    meta: {
      home: {
        title: 'Ingeniero de Software',
        description:
          'Josue Retamozo - Ingeniero de Software especializado en desarrollo frontend con React.js y React Native, con base full-stack en C# (.NET), Java y microservicios.',
      },
      about: {
        title: 'Acerca de',
        description:
          'Experiencia, habilidades, educación y certificaciones: desarrollo frontend con React y React Native en productos bancarios, de seguros, retail y e-commerce.',
      },
      projects: {
        title: 'Proyectos',
        description:
          'Proyectos frontend y full-stack seleccionados, incluida una plataforma de apuestas deportivas con microservicios, frontend Next.js, BFF en FastAPI y API .NET.',
      },
      experiences: {
        title: 'Experiencia',
        description:
          'Experiencia profesional en banca, seguros, retail y comercio electrónico, desde el desarrollo frontend hasta la modernización de aplicaciones empresariales.',
      },
      contact: {
        title: 'Contacto',
        description:
          'Ponte en contacto con Josue Retamozo para colaboraciones, posiciones y trabajo freelance.',
      },
    },
  },
} as const

type TranslationNode =
  | string
  | readonly string[]
  | { readonly [key: string]: TranslationNode }

const translationTree: { readonly [key: string]: TranslationNode } =
  translations

function isPlainTranslationNode(
  node: TranslationNode | undefined,
): node is { readonly [key: string]: TranslationNode } {
  return typeof node === 'object' && node !== null && !Array.isArray(node)
}

export function lookupTranslation(
  locale: Locale,
  key: string,
): TranslationNode | undefined {
  let node: TranslationNode | undefined = translationTree[locale]

  for (const part of key.split('.')) {
    if (!isPlainTranslationNode(node)) {
      return undefined
    }
    node = node[part]
  }

  return node
}

export function getTranslation(locale: Locale, key: string): string {
  const value = lookupTranslation(locale, key)
  return typeof value === 'string' ? value : key
}
