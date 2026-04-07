export interface Experience {
  company: string
  position: {
    en: string
    es: string
  }
  duration: {
    en: string
    es: string
  }
  start: string
  end: string | { label: string; dateTime: string }
  description: {
    en: string[]
    es: string[]
  }
  technologies: string[]
  logo?: string
}

export const experiences: Experience[] = [
  {
    company: 'Softtek / RIMAC',
    position: {
      en: 'Software Engineer',
      es: 'Ingeniero de Software',
    },
    duration: {
      en: 'Oct 2025 - Present',
      es: 'Oct 2025 - Presente',
    },
    start: '2025-10',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear().toString(),
    },
    description: {
      en: [
        'Design System: Led the implementation of the corporate Design System using Next.js, TypeScript, and Storybook, achieving a 50%+ improvement in development velocity for the Frontend team.',
        'AI Innovation: Developed an MCP (Model Context Protocol) server in Golang to integrate the design system with GitHub Copilot, enabling autonomous component querying and creation. Winner of the Frontend Exchange 2025 - RIMAC Award.',
        'Product: Developed critical screens for the Insurance History module, collaborating with Backend teams to ensure high versatility and interface performance.',
      ],
      es: [
        'Sistema de Diseño: Lideré la implementación del Design System corporativo utilizando Next.js, TypeScript y Storybook, logrando una mejora del 50%+ en la velocidad de desarrollo del equipo Frontend.',
        'Innovación en IA: Desarrollé un servidor MCP (Model Context Protocol) en Golang para integrar el sistema de diseño con GitHub Copilot, permitiendo la consulta y creación autónoma de componentes. Proyecto ganador del premio Frontend Exchange 2025 - RIMAC.',
        'Producto: Desarrollo de pantallas críticas para el módulo de Historial de Seguros, colaborando con equipos de Backend para garantizar una alta versatilidad y rendimiento de la interfaz.',
      ],
    },
    technologies: [
      'Next.js',
      'TypeScript',
      'Storybook',
      'React',
      'GitHub Copilot',
      'MCP',
      'Golang',
      'C#',
      '.NET',
    ],
  },
  {
    company: 'CodiGo / Tecsup',
    position: {
      en: 'Software Engineer Instructor',
      es: 'Instructor de Ingeniería de Software',
    },
    duration: {
      en: 'Feb 2023 - Jun 2025',
      es: 'Feb 2023 - Jun 2025',
    },
    start: '2023-02',
    end: '2025-06',
    description: {
      en: [
        'Taught Frontend technologies (React, Next.js, JavaScript) to over 200 students in a Bootcamp format.',
        'Updated the academic curriculum to align with industry trends and guided capstone projects integrating Frontend with Backend using Docker and AWS.',
      ],
      es: [
        'Impartí clases de tecnologías Frontend (React, Next.js, JavaScript) a más de 200 estudiantes en modalidad Bootcamp.',
        'Actualicé el plan de estudios para alinearlo con las tendencias de la industria y guié proyectos integradores que conectaban Frontend con Backend usando Docker y AWS.',
      ],
    },
    technologies: [
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Docker',
      'AWS',
      'HTML',
      'CSS',
    ],
  },
  {
    company: 'Zoluxiones / Scotiabank',
    position: {
      en: 'Software Engineer',
      es: 'Ingeniero de Software',
    },
    duration: {
      en: 'Sep 2023 - Apr 2024',
      es: 'Sep 2023 - Abr 2024',
    },
    start: '2023-09',
    end: '2024-04',
    description: {
      en: [
        'Led the migration towards a modern architecture based on ReactJS with Micro Frontends.',
        'Increased internal efficiency by 70% by optimizing the user interface and backend communication via the BFF protocol.',
        'Developed backend services in C# and configured environments with Docker and basic AWS services (EC2, S3).',
      ],
      es: [
        'Lideré la migración hacia una arquitectura moderna basada en ReactJS con Micro Frontends.',
        'Incrementé la eficiencia interna en un 70% optimizando la interfaz de usuario y la comunicación con el backend mediante el protocolo BFF.',
        'Desarrollé servicios backend en C# y configuré entornos con Docker y servicios básicos de AWS (EC2, S3).',
      ],
    },
    technologies: [
      'ReactJS',
      'Micro Frontends',
      'BFF',
      'C#',
      '.NET',
      'Docker',
      'AWS EC2',
      'AWS S3',
    ],
  },
  {
    company: 'Globant / Belcorp',
    position: {
      en: 'Software Engineer',
      es: 'Ingeniero de Software',
    },
    duration: {
      en: 'Dec 2021 - Feb 2023',
      es: 'Dic 2021 - Feb 2023',
    },
    start: '2021-12',
    end: '2023-02',
    description: {
      en: [
        'Developed new features that improved project allocation by 15%.',
        'Implemented over 100 A/B experiments on the VWO platform for Belcorp, achieving a 30% increase in conversions.',
        'Collaborated with the data analysis team to identify and implement website performance improvements.',
      ],
      es: [
        'Desarrollé nuevas funcionalidades que mejoraron la asignación de proyectos en un 15%.',
        'Implementé más de 100 experimentos A/B en la plataforma VWO para Belcorp, logrando un incremento del 30% en conversiones.',
        'Colaboré con el equipo de análisis de datos para identificar e implementar mejoras en el rendimiento del sitio web.',
      ],
    },
    technologies: [
      'React.js',
      'Angular',
      'A/B Testing',
      'VWO',
      'ExpressJS',
      'FastAPI',
      'Docker',
      'PostgreSQL',
    ],
  },
  {
    company: 'Auna',
    position: {
      en: 'Software Engineer',
      es: 'Ingeniero de Software',
    },
    duration: {
      en: 'Dec 2020 - Dec 2021',
      es: 'Dic 2020 - Dic 2021',
    },
    start: '2020-12',
    end: '2021-12',
    description: {
      en: [
        'Participated in the tech stack migration to ReactJS and NextJS, improving site load speed by 15%.',
        'Implemented data analysis tools in the Farmauna web application, contributing to a 5% increase in daily revenue.',
        'Developed Backend services using FastAPI and managed deployments with Docker and AWS EC2/S3.',
      ],
      es: [
        'Participé en la migración del stack tecnológico a ReactJS y NextJS, mejorando la velocidad de carga del sitio en un 15%.',
        'Implementé herramientas de análisis de datos en la aplicación web Farmauna, contribuyendo a un aumento del 5% en los ingresos diarios.',
        'Desarrollé servicios Backend con FastAPI y gestioné despliegues con Docker y AWS EC2/S3.',
      ],
    },
    technologies: [
      'ReactJS',
      'NextJS',
      'FastAPI',
      'Docker',
      'AWS EC2',
      'AWS S3',
    ],
  },
  {
    company: 'Inka Labs',
    position: {
      en: 'Software Engineer',
      es: 'Ingeniero de Software',
    },
    duration: {
      en: 'May 2022 - Sep 2022 & Oct 2019 - Mar 2020',
      es: 'Mayo 2022 - Sep 2022 & Oct 2019 - Mar 2020',
    },
    start: '2019-10',
    end: '2022-09',
    description: {
      en: [
        'Collaborated on the development of a financial asset management application in React Native and Angular, improving user experience by 25%.',
        'Implemented real-time notification features and RESTful APIs using FastAPI and SQLite.',
      ],
      es: [
        'Colaboré en el desarrollo de una aplicación de gestión de activos financieros en React Native y Angular, mejorando la experiencia de usuario en un 25%.',
        'Implementé funcionalidades de notificaciones en tiempo real y APIs RESTful usando FastAPI y SQLite.',
      ],
    },
    technologies: [
      'React Native',
      'Angular',
      'FastAPI',
      'SQLite',
      'RESTful APIs',
    ],
  },
]
