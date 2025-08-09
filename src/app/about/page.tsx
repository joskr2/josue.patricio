"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { Accordion } from "@/components/Accordion";
import { Container } from "@/components/Container";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SkillCategory } from "@/components/SkillCategory";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypewriter } from "@/hooks/useTypewriter";
import portraitImage from "@/images/portrait.webp";
import { experiences } from "@/lib/experience-data";
import {
	certifications,
	education,
	personalInfo,
	skills,
} from "@/lib/personal-data";

function SocialLink({
	className,
	href,
	children,
	icon: Icon,
}: Readonly<{
	className?: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}>) {
	return (
		<li className={clsx(className, "flex")}>
			<Link
				href={href}
				className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
				<span className="ml-4">{children}</span>
			</Link>
		</li>
	);
}

function MailIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
			/>
		</svg>
	);
}

export default function About() {
	const { t, locale } = useTranslation();
	const { displayText: typedName, isComplete } = useTypewriter({ 
		text: personalInfo.name, 
		speed: 100, 
		delay: 300 
	});

	return (
		<Container className="mt-16 sm:mt-32">
			{/* Mobile Layout: Name first, then image */}
			<div className="block lg:hidden">
				<div className="text-center sm:text-left">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 min-h-[3rem]">
						{typedName}
						{!isComplete && (
							<span className="animate-pulse text-teal-600 dark:text-teal-400">|</span>
						)}
					</h1>
					<p className="mt-2 text-xl text-teal-600 dark:text-teal-400">
						{personalInfo.title[locale]}
					</p>
				</div>
				
				<div className="mt-8 flex justify-center">
					<div className="max-w-xs px-2.5">
						<Image
							src={portraitImage}
							alt={personalInfo.name}
							sizes="20rem"
							className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
						/>
					</div>
				</div>

				<div className="mt-8 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
					<p>{personalInfo.summary[locale]}</p>
					<p>{t("about.intro")}</p>
				</div>

				<div className="mt-8">
					<ul className="space-y-4">
						<SocialLink href={`mailto:${personalInfo.email}`} icon={MailIcon}>
							{personalInfo.email}
						</SocialLink>
						<SocialLink href={personalInfo.linkedin} icon={LinkedInIcon}>
							LinkedIn
						</SocialLink>
						<SocialLink href={personalInfo.github} icon={GitHubIcon}>
							GitHub
						</SocialLink>
					</ul>
				</div>
			</div>

			{/* Desktop Layout: Original grid layout with typewriter effect */}
			<div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
				<div className="lg:pl-20">
					<div className="max-w-xs px-2.5 lg:max-w-none">
						<Image
							src={portraitImage}
							alt={personalInfo.name}
							sizes="(min-width: 1024px) 32rem, 20rem"
							className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
						/>
					</div>
				</div>
				<div className="lg:order-first lg:row-span-2">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 min-h-[4rem]">
						{typedName}
						{!isComplete && (
							<span className="animate-pulse text-teal-600 dark:text-teal-400">|</span>
						)}
					</h1>
					<p className="mt-2 text-xl text-teal-600 dark:text-teal-400">
						{personalInfo.title[locale]}
					</p>
					<div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
						<p>{personalInfo.summary[locale]}</p>
						<p>{t("about.intro")}</p>
					</div>
				</div>
				<div className="lg:pl-20">
					<ul>
						<SocialLink href={`mailto:${personalInfo.email}`} icon={MailIcon}>
							{personalInfo.email}
						</SocialLink>
						<SocialLink href={personalInfo.linkedin} icon={LinkedInIcon}>
							LinkedIn
						</SocialLink>
						<SocialLink href={personalInfo.github} icon={GitHubIcon}>
							GitHub
						</SocialLink>
					</ul>
				</div>
			</div>

			{/* Experience Section */}
			<div className="mt-16 sm:mt-24">
				<div className="mx-auto max-w-7xl">
					{/* Mobile Accordion View */}
					<div className="block md:hidden">
						<Accordion title={t("about.experience")}>
							<div className="mt-4 space-y-4">
								{experiences.map((exp, index) => (
									<Accordion 
										key={`${exp.company}-${index}`}
										title={`${exp.position[locale]} - ${exp.company}`}
										defaultOpen={index === 0}
									>
										<div className="space-y-4">
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
												<time className="text-sm text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
													{exp.duration[locale]}
												</time>
											</div>
											
											<div className="space-y-3">
												{exp.description[locale].map((paragraph, paragraphIndex) => (
													<p key={`${exp.company}-${index}-p-${paragraphIndex}`} className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
														{paragraph}
													</p>
												))}
												
												{exp.technologies && exp.technologies.length > 0 && (
													<div>
														<h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
															Technologies:
														</h4>
														<div className="flex flex-wrap gap-2">
															{exp.technologies.map((tech) => (
																<span
																	key={tech}
																	className="px-2 py-1 text-xs font-medium bg-zinc-100 text-zinc-800 rounded-md dark:bg-zinc-800 dark:text-zinc-300"
																>
																	{tech}
																</span>
															))}
														</div>
													</div>
												)}
											</div>
										</div>
									</Accordion>
								))}
							</div>
						</Accordion>
					</div>
					
					{/* Desktop View */}
					<div className="hidden md:block">
						<h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
							{t("about.experience")}
						</h2>
						<div className="mt-8">
							<ol className="space-y-8">
								{experiences.map((exp, index) => (
									<ExperienceItem
										key={`${exp.company}-${index}`}
										experience={exp}
									/>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>

			{/* Skills Section */}
			<div className="mt-16 sm:mt-24">
				<div className="mx-auto max-w-7xl">
					{/* Mobile Accordion View */}
					<div className="block md:hidden space-y-4">
						<Accordion title={t("about.skills")}>
							<div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
								<SkillCategory
									title="Programming Languages"
									skills={skills.programmingLanguages}
									variant="primary"
								/>
								<SkillCategory
									title="Frameworks & Tools"
									skills={skills.frameworks}
									variant="secondary"
								/>
								<SkillCategory title="Databases" skills={skills.databases} />
								<SkillCategory title="DevOps & Tools" skills={skills.tools} />
								<SkillCategory
									title="Methodologies"
									skills={skills.methodologies}
								/>
								<div>
									<h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
										Languages
									</h3>
									<div className="space-y-2">
										{skills.languages.map((lang) => (
											<div key={lang.name} className="flex justify-between">
												<span className="text-sm text-zinc-600 dark:text-zinc-400">
													{lang.name}
												</span>
												<span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
													{lang.level}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</Accordion>
					</div>
					
					{/* Desktop View */}
					<div className="hidden md:block">
						<h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-8">
							{t("about.skills")}
						</h2>
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
							<SkillCategory
								title="Programming Languages"
								skills={skills.programmingLanguages}
								variant="primary"
							/>
							<SkillCategory
								title="Frameworks & Tools"
								skills={skills.frameworks}
								variant="secondary"
							/>
							<SkillCategory title="Databases" skills={skills.databases} />
							<SkillCategory title="DevOps & Tools" skills={skills.tools} />
						</div>
						<div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
							<SkillCategory
								title="Methodologies"
								skills={skills.methodologies}
							/>
							<div>
								<h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
									Languages
								</h3>
								<div className="space-y-2">
									{skills.languages.map((lang) => (
										<div key={lang.name} className="flex justify-between">
											<span className="text-sm text-zinc-600 dark:text-zinc-400">
												{lang.name}
											</span>
											<span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
												{lang.level}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Education & Certifications */}
			<div className="mt-16 sm:mt-24">
				<div className="mx-auto max-w-7xl">
					{/* Mobile Accordion View */}
					<div className="block md:hidden space-y-4">
						<Accordion title={t("about.education")}>
							<div className="mt-4">
								<div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
									<h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
										{education.degree}
									</h3>
									<p className="text-zinc-600 dark:text-zinc-400">
										{education.institution} - {education.location}
									</p>
									<p className="text-sm text-zinc-500 dark:text-zinc-500">
										{education.year}
									</p>
								</div>
							</div>
						</Accordion>
						
						<Accordion title={t("about.certifications")}>
							<div className="mt-4 space-y-4">
								{certifications.map((cert) => (
									<div
										key={cert.name.en}
										className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
									>
										<h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
											{cert.name[locale]}
										</h3>
										<p className="text-sm text-zinc-600 dark:text-zinc-400">
											{cert.issuer}
										</p>
										<p className="text-xs text-zinc-500 dark:text-zinc-500">
											{cert.year}
										</p>
									</div>
								))}
							</div>
						</Accordion>
					</div>
					
					{/* Desktop View */}
					<div className="hidden md:block">
						<div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
							{/* Education */}
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
									{t("about.education")}
								</h2>
								<div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
									<h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
										{education.degree}
									</h3>
									<p className="text-zinc-600 dark:text-zinc-400">
										{education.institution} - {education.location}
									</p>
									<p className="text-sm text-zinc-500 dark:text-zinc-500">
										{education.year}
									</p>
								</div>
							</div>

							{/* Certifications */}
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
									{t("about.certifications")}
								</h2>
								<div className="space-y-4">
									{certifications.map((cert) => (
										<div
											key={cert.name.en}
											className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
										>
											<h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
												{cert.name[locale]}
											</h3>
											<p className="text-sm text-zinc-600 dark:text-zinc-400">
												{cert.issuer}
											</p>
											<p className="text-xs text-zinc-500 dark:text-zinc-500">
												{cert.year}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Contact Section */}
			<div className="mt-24 sm:mt-32 mb-16">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
						{t("contact.title")}
					</h2>
					<p className="mt-4 text-zinc-600 dark:text-zinc-400">
						{t("contact.subtitle")}
					</p>
					<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Link
							href={`mailto:${personalInfo.email}`}
							className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
						>
							{t("contact.email")}
						</Link>
						<Link
							href={personalInfo.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
						>
							{t("contact.linkedin")}
						</Link>
					</div>
				</div>
			</div>
		</Container>
	);
}
