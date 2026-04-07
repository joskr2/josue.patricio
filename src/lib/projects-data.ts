export interface Project {
  id: string
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  longDescription: {
    en: string
    es: string
  }
  features: {
    en: string[]
    es: string[]
  }
  technologies: string[]
  links: {
    live?: string
    apiHealth?: string
    bffHealth?: string
    frontend?: string
    backend?: string
    bff?: string
  }
  architecture: {
    en: string[]
    es: string[]
  }
  metrics: {
    uptime: string
    loadTime: string
    bundleSize: string
    apiResponse: string
    coldStart: string
    cacheReduction: string
  }
  image?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'sports-betting-platform',
    title: {
      en: 'Sports Betting Platform',
      es: 'Plataforma de Apuestas Deportivas',
    },
    description: {
      en: 'Comprehensive sports betting platform using microservices architecture. Open-source project with complete frontend, API, and BFF implementations available on GitHub',
      es: 'Plataforma integral de apuestas deportivas usando arquitectura de microservicios. Proyecto open-source con implementaciones completas de frontend, API y BFF disponibles en GitHub',
    },
    longDescription: {
      en: 'A complete enterprise-grade sports betting ecosystem built with modern microservices architecture. The system consists of three interconnected components: a high-performance Next.js frontend, a FastAPI BFF service optimized for AWS Lambda, and a robust .NET Core API with PostgreSQL database. All components are available as open-source on GitHub. The platform demonstrates advanced concepts like serverless computing, intelligent caching, JWT authentication, and atomic transactions.',
      es: 'Un ecosistema completo de apuestas deportivas de nivel empresarial construido con arquitectura moderna de microservicios. El sistema consta de tres componentes interconectados: un frontend de alto rendimiento en Next.js, un servicio BFF FastAPI optimizado para AWS Lambda, y una API robusta en .NET Core con base de datos PostgreSQL. Todos los componentes están disponibles como open-source en GitHub. La plataforma demuestra conceptos avanzados como computación serverless, caché inteligente, autenticación JWT y transacciones atómicas.',
    },
    features: {
      en: [
        'Microservices architecture with 3 interconnected components',
        'High-performance frontend with Next.js 15 and TypeScript',
        'Robust .NET 9 API with PostgreSQL and Redis caching',
        'FastAPI BFF service optimized for AWS Lambda',
        'JWT authentication and atomic transactions',
        'Intelligent caching with TTL strategies',
        'Real-time event popularity algorithm',
        'Responsive PWA with offline capabilities',
      ],
      es: [
        'Arquitectura de microservicios con 3 componentes interconectados',
        'Frontend de alto rendimiento con Next.js 15 y TypeScript',
        'API robusta en .NET 9 con PostgreSQL y caché Redis',
        'Servicio BFF FastAPI optimizado para AWS Lambda',
        'Autenticación JWT y transacciones atómicas',
        'Caché inteligente con estrategias TTL',
        'Algoritmo de popularidad de eventos en tiempo real',
        'PWA responsivo con capacidades offline',
      ],
    },
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'shadcn/ui',
      'Tailwind CSS',
      'React Query 5.0',
      '.NET 9',
      'C#',
      'Entity Framework Core',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Redis',
      'AWS Lambda',
      'AWS EC2',
      'Vercel',
      'Docker',
      'Cloudflare',
    ],
    links: {
      frontend: 'https://github.com/joskr2/betting-app-frontend',
      backend: 'https://github.com/joskr2/sports-betting-api',
      bff: 'https://github.com/joskr2/sport-betting-bff',
    },
    architecture: {
      en: [
        'Frontend: Next.js 15 with React Query and shadcn/ui components',
        'BFF: FastAPI service optimized for AWS Lambda',
        'Backend: .NET 9 API with Entity Framework Core and PostgreSQL',
        'Database: PostgreSQL with Redis caching layer',
        'Security: JWT authentication with secure token handling',
      ],
      es: [
        'Frontend: Next.js 15 con React Query y componentes shadcn/ui',
        'BFF: Servicio FastAPI optimizado para AWS Lambda',
        'Backend: API .NET 9 con Entity Framework Core y PostgreSQL',
        'Base de datos: PostgreSQL con capa de caché Redis',
        'Seguridad: Autenticación JWT con manejo seguro de tokens',
      ],
    },
    metrics: {
      uptime: 'N/A (local dev)',
      loadTime: '<3s on 3G, <1s on WiFi',
      bundleSize: '<500KB initial, <2MB total',
      apiResponse: '<200ms average',
      coldStart: '500ms Lambda, 50ms warm',
      cacheReduction: '60% database queries reduced',
    },
    featured: true,
  },
  {
    id: 'csv-microservice',
    title: {
      en: 'CSV Data Processing Microservice',
      es: 'Microservicio de Procesamiento de Datos CSV',
    },
    description: {
      en: 'High-performance Java Spring Boot microservice for CSV file processing with advanced data validation',
      es: 'Microservicio Java Spring Boot de alto rendimiento para procesamiento de archivos CSV con validación avanzada de datos',
    },
    longDescription: {
      en: 'A production-ready microservice built with Java and Spring Boot that processes large CSV files efficiently. Features include comprehensive data validation, error handling, batch processing capabilities, and RESTful API endpoints. The service is designed to handle high-volume data processing tasks with robust error recovery and detailed logging.',
      es: 'Un microservicio listo para producción construido con Java y Spring Boot que procesa archivos CSV grandes de manera eficiente. Las características incluyen validación integral de datos, manejo de errores, capacidades de procesamiento por lotes y endpoints de API RESTful. El servicio está diseñado para manejar tareas de procesamiento de datos de alto volumen con recuperación robusta de errores y logging detallado.',
    },
    features: {
      en: [
        'High-performance CSV file processing with streaming',
        'Comprehensive data validation and sanitization',
        'Batch processing with configurable chunk sizes',
        'RESTful API with OpenAPI 3.0 documentation',
        'Advanced error handling and recovery mechanisms',
        'Detailed logging and monitoring capabilities',
        'Memory-efficient processing for large files',
        'Support for multiple CSV formats and encodings',
        'Asynchronous processing with status tracking',
        'Docker containerization for easy deployment',
      ],
      es: [
        'Procesamiento de archivos CSV de alto rendimiento con streaming',
        'Validación y sanitización integral de datos',
        'Procesamiento por lotes con tamaños de chunk configurables',
        'API RESTful con documentación OpenAPI 3.0',
        'Mecanismos avanzados de manejo y recuperación de errores',
        'Capacidades detalladas de logging y monitoreo',
        'Procesamiento eficiente en memoria para archivos grandes',
        'Soporte para múltiples formatos CSV y codificaciones',
        'Procesamiento asíncrono con seguimiento de estado',
        'Contenerización Docker para despliegue fácil',
      ],
    },
    technologies: [
      'Java 17',
      'Spring Boot 3.2',
      'Spring Data JPA',
      'Spring Validation',
      'OpenAPI 3.0',
      'Maven',
      'JUnit 5',
      'Mockito',
      'Docker',
      'PostgreSQL',
      'H2 Database',
      'Logback',
      'Jackson',
    ],
    links: {
      backend: 'https://github.com/joskr2/csv-microservice',
    },
    architecture: {
      en: [
        'Spring Boot application with layered architecture',
        'Service layer with business logic separation',
        'Repository pattern for data access abstraction',
        'Custom validation annotations for data integrity',
        'Exception handling with global error responses',
        'Configuration management with Spring profiles',
      ],
      es: [
        'Aplicación Spring Boot con arquitectura en capas',
        'Capa de servicio con separación de lógica de negocio',
        'Patrón Repository para abstracción de acceso a datos',
        'Anotaciones de validación personalizadas para integridad de datos',
        'Manejo de excepciones con respuestas de error globales',
        'Gestión de configuración con perfiles de Spring',
      ],
    },
    metrics: {
      uptime: '99.8%',
      loadTime: '<2s startup time',
      bundleSize: '45MB JAR file',
      apiResponse: '<150ms average',
      coldStart: '1.2s initial startup',
      cacheReduction: '40% processing time reduced with caching',
    },
    featured: false,
  },
]
