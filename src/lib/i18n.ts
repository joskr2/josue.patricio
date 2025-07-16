export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";

export const translations = {
	en: {
		// Navigation
		nav: {
			about: "About",
			projects: "Projects",
			contact: "Contact",
		},
		// Homepage
		home: {
			title: "Software Engineer",
			subtitle:
				"Specialized in React, Python, and .NET with 5+ years of experience",
			intro:
				"Software Engineer with 5+ years of experience in various sectors such as education, finance, retail and e-commerce. Specialized in React, React Native, Angular and with solid backend experience using Python, FastAPI, NodeJS, .NET framework.",
			featuredProject: "Featured Project",
			viewProject: "View Project",
			getInTouch: "Get in Touch",
			downloadCV: "Download CV",
		},
		// About page
		about: {
			title: "About Me",
			intro:
				"Passionate about web technologies and committed to accessibility and usability.",
			experience: "Experience",
			skills: "Skills",
			education: "Education",
			certifications: "Certifications",
			location: "Arequipa, Peru",
		},
		// Projects page
		projects: {
			title: "Projects",
			subtitle:
				"Showcasing my technical expertise and problem-solving abilities",
			viewLive: "View Live",
			viewCode: "View Code",
			technologies: "Technologies",
			features: "Key Features",
		},
		// Contact page
		contact: {
			title: "Contact",
			subtitle: "Let's work together",
			email: "Email",
			phone: "Phone",
			location: "Location",
			linkedin: "LinkedIn",
			github: "GitHub",
			sendEmail: "Send me an email",
			callDuringHours: "Feel free to call during business hours",
			currentlyBased: "Currently based in Peru",
			professionalNetwork: "Professional network and career updates",
			openSourceProjects: "Open source projects and code repositories",
			letsWorkTogether: "Let's work together",
			alwaysInterested:
				"I'm always interested in new opportunities and exciting projects. Whether you have a project in mind or just want to chat about technology, feel free to reach out!",
			connectWithMe: "Connect with me",
			availability: "Availability",
			availabilityText:
				"I'm currently available for freelance work and new opportunities. My timezone is GMT-5 (Peru), and I typically respond to emails within 24 hours.",
			expertise: "Expertise",
			expertiseText:
				"Specializing in React, Next.js, TypeScript, Python, FastAPI, and .NET. I have experience with both frontend development and backend microservices architecture.",
			connectOnLinkedIn: "Connect on LinkedIn",
		},
		// Footer
		footer: {
			allRightsReserved: "All rights reserved.",
		},
		// Sports Betting Project
		sportsBetting: {
			title: "Sports Betting Platform",
			description:
				"Comprehensive sports betting platform using microservices architecture and serverless computing",
			features: [
				"Microservices architecture with 3 interconnected components",
				"High-performance frontend with Next.js 15 and TypeScript",
				"Robust .NET 9 API with PostgreSQL and Redis caching",
				"FastAPI BFF service optimized for AWS Lambda",
				"99.9% uptime with comprehensive security measures",
				"JWT authentication and atomic transactions",
			],
		},
	},
	es: {
		// Navigation
		nav: {
			about: "Acerca de",
			projects: "Proyectos",
			contact: "Contacto",
		},
		// Homepage
		home: {
			title: "Ingeniero de Software",
			subtitle:
				"Especializado en React, Python y .NET con más de 5 años de experiencia",
			intro:
				"Ingeniero de Software con más de 5 años de experiencia en diversos sectores como educación, finanzas, retail y comercio electrónico. Especializado en React, React Native, Angular y con experiencia sólida en backend usando Python, FastAPI, NodeJS, framework .NET.",
			featuredProject: "Proyecto Destacado",
			viewProject: "Ver Proyecto",
			getInTouch: "Contacto",
			downloadCV: "Descargar CV",
		},
		// About page
		about: {
			title: "Acerca de Mí",
			intro:
				"Apasionado por las tecnologías web y comprometido con la accesibilidad y usabilidad.",
			experience: "Experiencia",
			skills: "Habilidades",
			education: "Educación",
			certifications: "Certificaciones",
			location: "Arequipa, Perú",
		},
		// Projects page
		projects: {
			title: "Proyectos",
			subtitle:
				"Demostrando mi experiencia técnica y habilidades de resolución de problemas",
			viewLive: "Ver Demo",
			viewCode: "Ver Código",
			technologies: "Tecnologías",
			features: "Características Principales",
		},
		// Contact page
		contact: {
			title: "Contacto",
			subtitle: "Trabajemos juntos",
			email: "Correo",
			phone: "Teléfono",
			location: "Ubicación",
			linkedin: "LinkedIn",
			github: "GitHub",
			sendEmail: "Envíame un correo",
			callDuringHours: "Puedes llamar durante horario de oficina",
			currentlyBased: "Actualmente ubicado en Perú",
			professionalNetwork: "Red profesional y actualizaciones de carrera",
			openSourceProjects: "Proyectos de código abierto y repositorios",
			letsWorkTogether: "Trabajemos juntos",
			alwaysInterested:
				"Siempre estoy interesado en nuevas oportunidades y proyectos emocionantes. Ya sea que tengas un proyecto en mente o solo quieras charlar sobre tecnología, ¡no dudes en contactarme!",
			connectWithMe: "Conecta conmigo",
			availability: "Disponibilidad",
			availabilityText:
				"Actualmente estoy disponible para trabajo freelance y nuevas oportunidades. Mi zona horaria es GMT-5 (Perú), y típicamente respondo correos dentro de 24 horas.",
			expertise: "Experiencia",
			expertiseText:
				"Especializado en React, Next.js, TypeScript, Python, FastAPI y .NET. Tengo experiencia tanto en desarrollo frontend como en arquitectura de microservicios backend.",
			connectOnLinkedIn: "Conectar en LinkedIn",
		},
		// Footer
		footer: {
			allRightsReserved: "Todos los derechos reservados.",
		},
		// Sports Betting Project
		sportsBetting: {
			title: "Plataforma de Apuestas Deportivas",
			description:
				"Plataforma integral de apuestas deportivas usando arquitectura de microservicios y computación serverless",
			features: [
				"Arquitectura de microservicios con 3 componentes interconectados",
				"Frontend de alto rendimiento con Next.js 15 y TypeScript",
				"API robusta en .NET 9 con PostgreSQL y caché Redis",
				"Servicio BFF FastAPI optimizado para AWS Lambda",
				"99.9% de tiempo de actividad con medidas de seguridad integrales",
				"Autenticación JWT y transacciones atómicas",
			],
		},
	},
} as const;

export function getTranslation(locale: Locale, key: string): string {
	const keys = key.split(".");
	// biome-ignore lint/suspicious/noExplicitAny: required for dynamic property access
	let value: any = translations[locale];

	for (const k of keys) {
		value = value?.[k];
	}

	return value || key;
}

export function detectLocale(): Locale {
	// 1. Check localStorage
	if (typeof window !== "undefined") {
		const stored = localStorage.getItem("locale") as Locale;
		if (stored && (stored === "en" || stored === "es")) {
			return stored;
		}

		// 2. Check browser language
		const browserLang = navigator.language.toLowerCase();
		if (browserLang.startsWith("es")) {
			return "es";
		}
	}

	// 3. Default fallback
	return defaultLocale;
}
