export type Locale = 'en' | 'es'

export const defaultLocale: Locale = 'en'

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
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
    // Projects page
    projects: {
      title: 'Projects',
      subtitle:
        'Showcasing my technical expertise and problem-solving abilities',
      viewLive: 'View Live',
      viewCode: 'View Code',
      technologies: 'Technologies',
      features: 'Key Features',
    },
    // Contact page
    contact: {
      title: 'Contact',
      subtitle: "Let's work together",
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      sendEmail: 'Send me an email',
      callDuringHours: 'Feel free to call during business hours',
      currentlyBased: 'Currently based in Peru',
      professionalNetwork: 'Professional network and career updates',
      openSourceProjects: 'Open source projects and code repositories',
      letsWorkTogether: "Let's work together",
      alwaysInterested:
        "I'm always interested in new opportunities and exciting projects. Whether you have a project in mind or just want to chat about technology, feel free to reach out!",
      connectWithMe: 'Connect with me',
      availability: 'Availability',
      availabilityText:
        "I'm currently available for freelance work and new opportunities. My timezone is GMT-5 (Peru), and I typically respond to emails within 24 hours.",
      expertise: 'Expertise',
      expertiseText:
        'Specializing in React, Next.js, TypeScript, C# (.NET), and Microservices. I have experience both in frontend development and backend microservices architecture.',
      connectOnLinkedIn: 'Connect on LinkedIn',
      whatsapp: 'WhatsApp',
      whatsappTooltip: 'Chat on WhatsApp',
      whatsappPrefill: "Hi! I saw your website and I'd like more information.",
      downloadCV: 'Download my CV',
    },
    // Footer
    footer: {
      allRightsReserved: 'All rights reserved.',
    },
    // Sports Betting Project
    sportsBetting: {
      title: 'Sports Betting Platform',
      description:
        'Comprehensive sports betting platform using microservices architecture with frontend, API, and BFF components available on GitHub',
      features: [
        'Microservices architecture with 3 interconnected components',
        'High-performance frontend with Next.js 15 and TypeScript',
        'Robust .NET 9 API with PostgreSQL and Redis caching',
        'FastAPI BFF service optimized for AWS Lambda',
        'JWT authentication and atomic transactions',
      ],
    },
  },
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      projects: 'Proyectos',
      contact: 'Contacto',
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
    // Projects page
    projects: {
      title: 'Proyectos',
      subtitle:
        'Demostrando mi experiencia técnica y habilidades de resolución de problemas',
      viewLive: 'Ver Demo',
      viewCode: 'Ver Código',
      technologies: 'Tecnologías',
      features: 'Características Principales',
    },
    // Contact page
    contact: {
      title: 'Contacto',
      subtitle: 'Trabajemos juntos',
      email: 'Correo',
      phone: 'Teléfono',
      location: 'Ubicación',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      sendEmail: 'Envíame un correo',
      callDuringHours: 'Puedes llamar durante horario de oficina',
      currentlyBased: 'Actualmente ubicado en Perú',
      professionalNetwork: 'Red profesional y actualizaciones de carrera',
      openSourceProjects: 'Proyectos de código abierto y repositorios',
      letsWorkTogether: 'Trabajemos juntos',
      alwaysInterested:
        'Siempre estoy interesado en nuevas oportunidades y proyectos emocionantes. Ya sea que tengas un proyecto en mente o solo quieras charlar sobre tecnología, ¡no dudes en contactarme!',
      connectWithMe: 'Conecta conmigo',
      availability: 'Disponibilidad',
      availabilityText:
        'Actualmente estoy disponible para trabajo freelance y nuevas oportunidades. Mi zona horaria es GMT-5 (Perú), y típicamente respondo correos dentro de 24 horas.',
      expertise: 'Experiencia',
      expertiseText:
        'Especializado en React, Next.js, TypeScript, C# (.NET) y Microservicios. Tengo experiencia tanto en desarrollo frontend como en arquitectura de microservicios backend.',
      connectOnLinkedIn: 'Conectar en LinkedIn',
      whatsapp: 'WhatsApp',
      whatsappTooltip: 'Chatear por WhatsApp',
      whatsappPrefill: '¡Hola! Vi tu web y me gustaría más información.',
      downloadCV: 'Descargar mi CV',
    },
    // Footer
    footer: {
      allRightsReserved: 'Todos los derechos reservados.',
    },
    // Sports Betting Project
    sportsBetting: {
      title: 'Plataforma de Apuestas Deportivas',
      description:
        'Plataforma integral de apuestas deportivas usando arquitectura de microservicios con frontend, API y BFF disponibles en GitHub',
      features: [
        'Arquitectura de microservicios con 3 componentes interconectados',
        'Frontend de alto rendimiento con Next.js 15 y TypeScript',
        'API robusta en .NET 9 con PostgreSQL y caché Redis',
        'Servicio BFF FastAPI optimizado para AWS Lambda',
        'Autenticación JWT y transacciones atómicas',
      ],
    },
  },
} as const

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  // biome-ignore lint/suspicious/noExplicitAny: required for dynamic property access
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

import { cache } from 'react'

export const cachedGetTranslation = cache(
  (locale: Locale, key: string): string => {
    const keys = key.split('.')
    // biome-ignore lint/suspicious/noExplicitAny: required for dynamic property access
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  },
)

export function detectLocale(): Locale {
  // 1. Check localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale') as Locale
    if (stored && (stored === 'en' || stored === 'es')) {
      return stored
    }

    // 2. Check browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('es')) {
      return 'es'
    }
  }

  // 3. Default fallback
  return defaultLocale
}
