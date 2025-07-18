export interface Project {
	id: string;
	title: {
		en: string;
		es: string;
	};
	description: {
		en: string;
		es: string;
	};
	longDescription: {
		en: string;
		es: string;
	};
	features: {
		en: string[];
		es: string[];
	};
	technologies: string[];
	links: {
		live?: string;
		apiHealth?: string;
		bffHealth?: string;
		frontend?: string;
		backend?: string;
		bff?: string;
	};
	architecture: {
		en: string[];
		es: string[];
	};
	metrics: {
		uptime: string;
		loadTime: string;
		bundleSize: string;
		apiResponse: string;
		coldStart: string;
		cacheReduction: string;
	};
	image?: string;
	featured: boolean;
}

export const projects: Project[] = [
	{
		id: "sports-betting-platform",
		title: {
			en: "Sports Betting Platform",
			es: "Plataforma de Apuestas Deportivas",
		},
		description: {
			en: "Comprehensive sports betting platform using microservices architecture and serverless computing",
			es: "Plataforma integral de apuestas deportivas usando arquitectura de microservicios y computación serverless",
		},
		longDescription: {
			en: "A complete enterprise-grade sports betting ecosystem built with modern microservices architecture. The system consists of three interconnected components: a high-performance Next.js frontend, a FastAPI BFF service optimized for AWS Lambda, and a robust .NET Core API with PostgreSQL database. The platform demonstrates advanced concepts like serverless computing, intelligent caching, JWT authentication, and atomic transactions.",
			es: "Un ecosistema completo de apuestas deportivas de nivel empresarial construido con arquitectura moderna de microservicios. El sistema consta de tres componentes interconectados: un frontend de alto rendimiento en Next.js, un servicio BFF FastAPI optimizado para AWS Lambda, y una API robusta en .NET Core con base de datos PostgreSQL. La plataforma demuestra conceptos avanzados como computación serverless, caché inteligente, autenticación JWT y transacciones atómicas.",
		},
		features: {
			en: [
				"Microservices architecture with 3 interconnected components",
				"High-performance frontend with Next.js 15 and TypeScript",
				"Robust .NET 9 API with PostgreSQL and Redis caching",
				"FastAPI BFF service optimized for AWS Lambda",
				"99.9% uptime with comprehensive security measures",
				"JWT authentication and atomic transactions",
				"Intelligent caching with TTL strategies",
				"Multi-cloud deployment (Vercel, AWS Lambda, AWS EC2)",
				"Real-time event popularity algorithm",
				"Responsive PWA with offline capabilities",
			],
			es: [
				"Arquitectura de microservicios con 3 componentes interconectados",
				"Frontend de alto rendimiento con Next.js 15 y TypeScript",
				"API robusta en .NET 9 con PostgreSQL y caché Redis",
				"Servicio BFF FastAPI optimizado para AWS Lambda",
				"99.9% de tiempo de actividad con medidas de seguridad integrales",
				"Autenticación JWT y transacciones atómicas",
				"Caché inteligente con estrategias TTL",
				"Despliegue multi-nube (Vercel, AWS Lambda, AWS EC2)",
				"Algoritmo de popularidad de eventos en tiempo real",
				"PWA responsivo con capacidades offline",
			],
		},
		technologies: [
			"Next.js 15",
			"React 19",
			"TypeScript",
			"shadcn/ui",
			"Tailwind CSS",
			"React Query 5.0",
			".NET 9",
			"C#",
			"Entity Framework Core",
			"FastAPI",
			"Python",
			"PostgreSQL 15",
			"Redis",
			"AWS Lambda",
			"AWS EC2",
			"Vercel",
			"Docker",
			"Nginx",
			"Cloudflare",
		],
		links: {
			live: "https://betting-app-frontend-six.vercel.app",
			apiHealth: "https://api-kurax-demo-jos.uk/health",
			bffHealth:
				"https://hf3bbankw5wc2uovwju4m6zvku4m6zvku0zuozj.lambda-url.us-east-2.on.aws/health",
			frontend: "https://github.com/joskr2/betting-app-frontend",
			backend: "https://github.com/joskr2/sports-betting-api",
			bff: "https://github.com/joskr2/sport-betting-bff",
		},
		architecture: {
			en: [
				"Frontend: Next.js 15 deployed on Vercel with global CDN",
				"BFF: FastAPI service on AWS Lambda with 3.5MB package",
				"Backend: .NET 9 API on AWS EC2 with Docker",
				"Database: PostgreSQL 15 with Redis caching layer",
				"Security: Cloudflare SSL with JWT authentication",
			],
			es: [
				"Frontend: Next.js 15 desplegado en Vercel con CDN global",
				"BFF: Servicio FastAPI en AWS Lambda con paquete de 3.5MB",
				"Backend: API .NET 9 en AWS EC2 con Docker",
				"Base de datos: PostgreSQL 15 con capa de caché Redis",
				"Seguridad: SSL Cloudflare con autenticación JWT",
			],
		},
		metrics: {
			uptime: "99.9%",
			loadTime: "<3s on 3G, <1s on WiFi",
			bundleSize: "<500KB initial, <2MB total",
			apiResponse: "<200ms average",
			coldStart: "500ms Lambda, 50ms warm",
			cacheReduction: "60% database queries reduced",
		},
		featured: true,
	},
];
