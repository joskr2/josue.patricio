export interface Experience {
	company: string;
	position: {
		en: string;
		es: string;
	};
	duration: {
		en: string;
		es: string;
	};
	start: string;
	end: string | { label: string; dateTime: string };
	description: {
		en: string[];
		es: string[];
	};
	technologies: string[];
	logo?: string;
}

export const experiences: Experience[] = [
	{
		company: "Independent Software Architect",
		position: {
			en: "Independent Software Architect, Personal Projects",
			es: "Arquitecto de Software Independiente, Proyectos Personales",
		},
		duration: {
			en: "May 2024 - Present",
			es: "Mayo 2024 - Presente",
		},
		start: "2024-05",
		end: {
			label: "Present",
			dateTime: new Date().getFullYear().toString(),
		},
		description: {
			en: [
				"Designed and implemented a comprehensive sports betting platform using microservices architecture and serverless computing.",
				"Built a high-performance frontend with Next.js 15, TypeScript, React Query 5.0, shadcn/ui and Tailwind CSS for optimal user experience.",
				"Developed a robust .NET 9 API with Entity Framework Core and PostgreSQL, implementing JWT authentication and atomic transactions.",
				"Created a FastAPI BFF service optimized for AWS Lambda with 3.5MB deployment package and sub-500ms cold start times.",
				"Achieved 99.9% uptime with Redis caching, reducing database queries by 60% and implementing comprehensive security measures.",
			],
			es: [
				"Diseñé e implementé una plataforma integral de apuestas deportivas usando arquitectura de microservicios y computación serverless.",
				"Construí un frontend de alto rendimiento con Next.js 15, TypeScript, React Query 5.0, shadcn/ui y Tailwind CSS para experiencia de usuario óptima.",
				"Desarrollé una API robusta en .NET 9 con Entity Framework Core y PostgreSQL, implementando autenticación JWT y transacciones atómicas.",
				"Creé un servicio BFF FastAPI optimizado para AWS Lambda con paquete de 3.5MB y tiempos de arranque bajo 500ms.",
				"Logré 99.9% de tiempo de actividad con caching Redis, reduciendo consultas de base de datos en 60% e implementando medidas de seguridad integrales.",
			],
		},
		technologies: [
			"Next.js 15",
			"React",
			"TypeScript",
			".NET 9",
			"C#",
			"FastAPI",
			"Python",
			"PostgreSQL",
			"Redis",
			"AWS Lambda",
			"AWS EC2",
			"Docker",
			"Nginx",
			"Cloudflare",
		],
	},
	{
		company: "TECSUP",
		position: {
			en: "Software Engineer",
			es: "Ingeniero de Software",
		},
		duration: {
			en: "February 2023 - July 2025",
			es: "Febrero 2023 - Julio 2025",
		},
		start: "2023-02",
		end: "2025-07",
		description: {
			en: [
				"I teach classes to more than 200 students in web and backend technologies such as JavaScript, HTML, CSS, React, NextJS, Angular, Python, FastAPI at the Tecsup CodiGo bootcamp.",
				"Updated the curriculum to include the latest trends in web and mobile development with TypeScript adoption improving code quality by 40%.",
				"I emphasize the importance of agile methodologies and industry best practices.",
				"I guide students in projects that integrate frontend with backend, using deployments with Docker and AWS services.",
			],
			es: [
				"Enseño clases a más de 200 estudiantes en tecnologías web y backend como JavaScript, HTML, CSS, React, NextJS, Angular, Python, FastAPI en el bootcamp CodiGo de Tecsup.",
				"Actualicé el currículum para incluir las últimas tendencias en desarrollo web y móvil con adopción de TypeScript mejorando la calidad del código en 40%.",
				"Enfatizo la importancia de metodologías ágiles y mejores prácticas de la industria.",
				"Guío a estudiantes en proyectos que integran frontend y backend, usando despliegues con Docker y servicios AWS.",
			],
		},
		technologies: [
			"HTML",
			"CSS",
			"JavaScript",
			"TypeScript",
			"Angular",
			"React.js",
			"TailwindCSS",
			"React Native",
			"Next.js",
			"Python",
			"FastAPI",
			"SQLite",
			"Docker",
			"AWS EC2",
			"AWS S3",
		],
	},
	{
		company: "ZOLUXIONES",
		position: {
			en: "Software Engineer",
			es: "Ingeniero de Software",
		},
		duration: {
			en: "September 2023 - April 2024",
			es: "Septiembre 2023 - Abril 2024",
		},
		start: "2023-09",
		end: "2024-04",
		description: {
			en: [
				"Implemented custom style libraries in React and Angular for Scotiabank application development.",
				"I led the migration towards a modern application based on React with micro frontends.",
				"Increased internal efficiency by 70% by focusing the implementation on the user interface and connecting to the backend using the BFF protocol at Scotiabank.",
				"Developed and optimized backend services with FastAPI to improve communication between microservices.",
			],
			es: [
				"Implementé librerías de estilos personalizadas en React y Angular para el desarrollo de aplicaciones de Scotiabank.",
				"Lideré la migración hacia una aplicación moderna basada en React con micro frontends.",
				"Aumenté la eficiencia interna en 70% enfocando la implementación en la interfaz de usuario y conectando al backend usando el protocolo BFF en Scotiabank.",
				"Desarrollé y optimicé servicios backend con FastAPI para mejorar la comunicación entre microservicios.",
			],
		},
		technologies: [
			"HTML",
			"CSS",
			"JavaScript",
			"TypeScript",
			"React.js",
			"React Native",
			"Python",
			"FastAPI",
			"SQL",
			"Docker",
		],
	},
	{
		company: "GLOBANT",
		position: {
			en: "Software Engineer",
			es: "Ingeniero de Software",
		},
		duration: {
			en: "December 2021 - February 2023",
			es: "Diciembre 2021 - Febrero 2023",
		},
		start: "2021-12",
		end: "2023-02",
		description: {
			en: [
				"Developed new features and improvements for Globant clients, improving project allocation by 15%.",
				"Implemented and executed more than +100 A/B experiments on the VWO platform for international client Belcorp, achieving a 30% increase in conversions.",
				"Collaborated with the data analysis department to identify opportunities for improvement in the performance of the Belcorp website.",
				"I developed endpoints with ExpressJS and migrated services to FastAPI for the consumption of analytics from the main website.",
				"I worked with Docker for containerizing applications and simplifying deployments.",
			],
			es: [
				"Desarrollé nuevas características y mejoras para clientes de Globant, mejorando la asignación de proyectos en 15%.",
				"Implementé y ejecuté más de 100 experimentos A/B en la plataforma VWO para el cliente internacional Belcorp, logrando un aumento del 30% en conversiones.",
				"Colaboré con el departamento de análisis de datos para identificar oportunidades de mejora en el rendimiento del sitio web de Belcorp.",
				"Desarrollé endpoints con ExpressJS y migré servicios a FastAPI para el consumo de analytics del sitio web principal.",
				"Trabajé con Docker para contenerizar aplicaciones y simplificar despliegues.",
			],
		},
		technologies: [
			"Angular",
			"React.js",
			"React Native",
			"JavaScript",
			"HTML",
			"CSS",
			"Node.js",
			"ExpressJS",
			"Python",
			"FastAPI",
			"Docker",
			"PostgreSQL",
		],
	},
	{
		company: "INKALABS",
		position: {
			en: "Software Engineer",
			es: "Ingeniero de Software",
		},
		duration: {
			en: "October 2019 - March 2020, May 2022 - September 2022",
			es: "Octubre 2019 - Marzo 2020, Mayo 2022 - Septiembre 2022",
		},
		start: "2019-10",
		end: "2022-09",
		description: {
			en: [
				"I collaborated in the development of a financial asset management application in React Native and Angular, improving the user experience by 25%.",
				"Implemented new real-time notification features, improving team efficiency by 15%.",
				"Developed and maintained RESTful APIs using FastAPI to manage financial operations.",
				"I worked with SQLite for local storage and Docker to create consistent development environments.",
			],
			es: [
				"Colaboré en el desarrollo de una aplicación de gestión de activos financieros en React Native y Angular, mejorando la experiencia de usuario en 25%.",
				"Implementé nuevas características de notificación en tiempo real, mejorando la eficiencia del equipo en 15%.",
				"Desarrollé y mantuve APIs RESTful usando FastAPI para gestionar operaciones financieras.",
				"Trabajé con SQLite para almacenamiento local y Docker para crear entornos de desarrollo consistentes.",
			],
		},
		technologies: [
			"HTML",
			"CSS",
			"JavaScript",
			"Angular",
			"React.js",
			"TailwindCSS",
			"React Native",
			"Python",
			"FastAPI",
			"SQLite",
			"Docker",
		],
	},
	{
		company: "AUNA",
		position: {
			en: "Software Engineer",
			es: "Ingeniero de Software",
		},
		duration: {
			en: "December 2020 - December 2021",
			es: "Diciembre 2020 - Diciembre 2021",
		},
		start: "2020-12",
		end: "2021-12",
		description: {
			en: [
				"Implemented data analysis tools in the Farmauna web application, resulting in a 5% increase in daily revenue.",
				"I participated in the migration of the team ReactJS and NextJS, improving site loading speed by 15%.",
				"Developed backend services using FastAPI to improve application efficiency and scalability.",
				"I used Docker for containerization and to simplify the deployment process. I worked with AWS EC2 and S3 for deployments and storage.",
			],
			es: [
				"Implementé herramientas de análisis de datos en la aplicación web Farmauna, resultando en un aumento del 5% en ingresos diarios.",
				"Participé en la migración del equipo a ReactJS y NextJS, mejorando la velocidad de carga del sitio en 15%.",
				"Desarrollé servicios backend usando FastAPI para mejorar la eficiencia y escalabilidad de la aplicación.",
				"Usé Docker para contenerización y simplificar el proceso de despliegue. Trabajé con AWS EC2 y S3 para despliegues y almacenamiento.",
			],
		},
		technologies: [
			"JavaScript",
			"Angular",
			"React.js",
			"TailwindCSS",
			"TypeScript",
			"Next.js",
			"Python",
			"FastAPI",
			"Docker",
			"AWS EC2",
			"AWS S3",
			"PostgreSQL",
		],
	},
];
