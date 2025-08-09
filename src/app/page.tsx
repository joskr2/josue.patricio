"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { TechBadge } from "@/components/TechBadge";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ImageCarousel } from "@/components/ImageCarousel";
import image1 from "@/images/photos/image-1.webp";
import image2 from "@/images/photos/image-2.webp";
import image3 from "@/images/photos/image-3.webp";
import image4 from "@/images/photos/image-4.webp";
import portraitImage from "@/images/portrait.webp";
import { personalInfo } from "@/lib/personal-data";
import { projects } from "@/lib/projects-data";

function MailIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" />
			<path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" />
		</svg>
	);
}

function SocialLink({
	icon: Icon,
	href,
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<motion.div
			whileHover={{ y: -2 }}
			whileTap={{ scale: 0.95 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<Link className="group -m-1 p-1" href={href} {...props}>
				<Icon className="h-6 w-6 fill-zinc-500 transition-colors duration-300 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
				{children && (
					<span className="ml-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
						{children}
					</span>
				)}
			</Link>
		</motion.div>
	);
}

export default function Home() {
	const { t, locale } = useTranslation();
	const featuredProject = projects.find((p) => p.featured);
	const { displayText: typedName, isComplete } = useTypewriter({ 
		text: personalInfo.name, 
		speed: 100, 
		delay: 300 
	});

	// Variants para animaciones escalonadas
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring" as const,
				stiffness: 100
			}
		}
	};

	return (
		<>
			{/* Hero Section */}
			<Container className="mt-9">
				<motion.div 
					className="max-w-2xl"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.h1 
						className="text-5xl font-bold tracking-tight text-zinc-800 sm:text-6xl lg:text-7xl dark:text-zinc-100 min-h-[4rem] sm:min-h-[5rem] lg:min-h-[6rem]"
						variants={itemVariants}
					>
						{typedName}
						{!isComplete && (
							<motion.span 
								className="text-teal-600 dark:text-teal-400"
								animate={{ opacity: [1, 0, 1] }}
								transition={{ duration: 1, repeat: Infinity }}
							>
								|
							</motion.span>
						)}
					</motion.h1>
					<motion.p 
						className="mt-4 text-xl sm:text-2xl text-teal-600 dark:text-teal-400"
						variants={itemVariants}
					>
						{personalInfo.title[locale]}
					</motion.p>
					<motion.p 
						className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
						variants={itemVariants}
					>
						{personalInfo.summary[locale]}
					</motion.p>
					<motion.div 
						className="mt-6 flex gap-6"
						variants={itemVariants}
					>
						<SocialLink
							href={`mailto:${personalInfo.email}`}
							aria-label="Send email"
							icon={MailIcon}
						/>
						<SocialLink
							href={personalInfo.github}
							aria-label="Follow on GitHub"
							icon={GitHubIcon}
							target="_blank"
							rel="noopener noreferrer"
						/>
						<SocialLink
							href={personalInfo.linkedin}
							aria-label="Follow on LinkedIn"
							icon={LinkedInIcon}
							target="_blank"
							rel="noopener noreferrer"
						/>
					</motion.div>
				</motion.div>
			</Container>

			{/* Photo Gallery */}
			<Container className="mt-16 sm:mt-20">
				<motion.div 
					className="mx-auto grid max-w-xl grid-cols-1 gap-y-8 lg:max-w-none lg:grid-cols-2"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
				>
					<motion.div 
						className="flex justify-center lg:justify-end lg:pr-8"
						whileHover={{ scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<motion.div 
							className="relative aspect-square w-80 lg:w-96 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 rotate-2 lg:rotate-2"
							whileHover={{ rotate: 1 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							<Image
								src={portraitImage}
								alt={personalInfo.name}
								sizes="(min-width: 1024px) 24rem, 20rem"
								className="absolute inset-0 h-full w-full object-cover"
								priority
							/>
						</motion.div>
					</motion.div>
					
					<motion.div 
						className="lg:pl-8"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
					>
						<div className="mx-auto max-w-xs px-2.5 lg:max-w-none">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 }}
								viewport={{ once: true }}
								whileHover={{ rotate: 1 }}
							>
								<ImageCarousel
									className="w-full"
									items={[
										{ src: image1, alt: "image1" },
										{ src: image2, alt: "image2" },
										{ src: image3, alt: "image3" },
										{ src: image4, alt: "image4" },
									]}
									intervalMs={30000}
								/>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</Container>

			<Container className="mt-24 md:mt-28 mb-24 sm:mb-32">
				<motion.div 
					className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: true }}
				>
					{/* Featured Project */}
					<motion.div 
						className="flex flex-col gap-16"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
					>
						{featuredProject && (
							<>
								<motion.h2 
									className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.6 }}
									viewport={{ once: true }}
								>
									{t("home.featuredProject")}
								</motion.h2>
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.6, delay: 0.8 }}
									viewport={{ once: true }}
									whileHover={{ 
										scale: 1.02,
										transition: { type: "spring", stiffness: 300, damping: 30 }
									}}
								>
									<ProjectShowcase project={featuredProject} />
								</motion.div>
							</>
						)}
					</motion.div>

					{/* Skills and Contact */}
					<motion.div 
						className="space-y-10 lg:pl-16 xl:pl-24"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
					>
						{/* Skills Overview */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							viewport={{ once: true }}
						>
							<Card as="div">
							<Card.Title as="h2">{t("about.skills")}</Card.Title>
							<Card.Description>{t("home.subtitle")}</Card.Description>
							<div className="mt-6 space-y-4">
								<div>
									<h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
										Frontend
									</h4>
									<div className="flex flex-wrap gap-2">
										{["React.js", "Next.js", "TypeScript", "Tailwind CSS"].map(
											(tech) => (
												<TechBadge key={tech} variant="primary">
													{tech}
												</TechBadge>
											),
										)}
									</div>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
										Backend
									</h4>
									<div className="flex flex-wrap gap-2">
										{["Python", "FastAPI", ".NET", "Node.js"].map((tech) => (
											<TechBadge key={tech} variant="secondary">
												{tech}
											</TechBadge>
										))}
									</div>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
										Infrastructure
									</h4>
									<div className="flex flex-wrap gap-2">
										{["AWS", "Docker", "PostgreSQL", "Redis"].map((tech) => (
											<TechBadge key={tech}>{tech}</TechBadge>
										))}
									</div>
								</div>
							</div>
							<Card.Cta href="/about">{t("nav.about")}</Card.Cta>
						</Card>
						</motion.div>
					</motion.div>
				</motion.div>
			</Container>
		</>
	);
}
