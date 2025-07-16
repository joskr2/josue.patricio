"use client";

import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { TechBadge } from "@/components/TechBadge";
import { useTranslation } from "@/hooks/useTranslation";
import { projects } from "@/lib/projects-data";

function ExternalLinkIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15,3 21,3 21,9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	);
}

function GitHubIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function CheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
			<polyline points="20,6 9,17 4,12" />
		</svg>
	);
}

function MetricsCard({ title, value }: { title: string; value: string }) {
	return (
		<div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
			<div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
				{title}
			</div>
			<div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
				{value}
			</div>
		</div>
	);
}

export default function Projects() {
	const { t, locale } = useTranslation();
	const featuredProject = projects.find((p) => p.featured);

	if (!featuredProject) {
		return (
			<SimpleLayout title={t("projects.title")} intro={t("projects.subtitle")}>
				<div className="text-center text-zinc-600 dark:text-zinc-400">
					No projects available at the moment.
				</div>
			</SimpleLayout>
		);
	}

	return (
		<SimpleLayout title={t("projects.title")} intro={t("projects.subtitle")}>
			<div className="mx-auto max-w-6xl">
				{/* Project Hero */}
				<div id={featuredProject.id} className="mb-16">
					<div className="rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 p-8 dark:from-teal-900/20 dark:to-blue-900/20">
						<div className="mb-6">
							<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
								{featuredProject.title[locale]}
							</h2>
							<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
								{featuredProject.longDescription[locale]}
							</p>
						</div>

						{/* Links Section */}
						<div className="mb-8 flex flex-wrap gap-4">
							{featuredProject.links.live && (
								<Link
									href={featuredProject.links.live}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
								>
									<ExternalLinkIcon className="h-4 w-4 transition group-hover:scale-110" />
									{t("projects.viewLive")}
								</Link>
							)}
							{featuredProject.links.frontend && (
								<Link
									href={featuredProject.links.frontend}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
								>
									<GitHubIcon className="h-4 w-4 transition group-hover:scale-110" />
									Frontend
								</Link>
							)}
							{featuredProject.links.backend && (
								<Link
									href={featuredProject.links.backend}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
								>
									<GitHubIcon className="h-4 w-4 transition group-hover:scale-110" />
									Backend
								</Link>
							)}
							{featuredProject.links.bff && (
								<Link
									href={featuredProject.links.bff}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
								>
									<GitHubIcon className="h-4 w-4 transition group-hover:scale-110" />
									BFF Service
								</Link>
							)}
						</div>

						{/* Health Check Links */}
						{(featuredProject.links.apiHealth ||
							featuredProject.links.bffHealth) && (
							<div className="mb-8">
								<h3 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
									Live Services
								</h3>
								<div className="flex flex-wrap gap-3">
									{featuredProject.links.apiHealth && (
										<Link
											href={featuredProject.links.apiHealth}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
										>
											<div className="h-2 w-2 rounded-full bg-green-500" />
											API Health Check
										</Link>
									)}
									{featuredProject.links.bffHealth && (
										<Link
											href={featuredProject.links.bffHealth}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
										>
											<div className="h-2 w-2 rounded-full bg-green-500" />
											BFF Health Check
										</Link>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Architecture & Features Grid */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Architecture */}
					<Card as="div">
						<Card.Title as="h3">Architecture Overview</Card.Title>
						<Card.Description>
							Microservices architecture with modern cloud-native components
						</Card.Description>
						<div className="mt-6 space-y-3">
							{featuredProject.architecture[locale].map((item) => (
								<div
									key={item.substring(0, 50)}
									className="flex items-start gap-3"
								>
									<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
									<span className="text-sm text-zinc-600 dark:text-zinc-400">
										{item}
									</span>
								</div>
							))}
						</div>
					</Card>

					{/* Key Features */}
					<Card as="div">
						<Card.Title as="h3">{t("projects.features")}</Card.Title>
						<Card.Description>
							Advanced features demonstrating full-stack expertise
						</Card.Description>
						<div className="mt-6 space-y-3">
							{featuredProject.features[locale].slice(0, 6).map((feature) => (
								<div
									key={feature.substring(0, 50)}
									className="flex items-start gap-3"
								>
									<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
									<span className="text-sm text-zinc-600 dark:text-zinc-400">
										{feature}
									</span>
								</div>
							))}
						</div>
					</Card>
				</div>

				{/* Performance Metrics */}
				<div className="mt-12">
					<h3 className="mb-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						Performance Metrics
					</h3>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
						<MetricsCard
							title="Uptime"
							value={featuredProject.metrics.uptime}
						/>
						<MetricsCard title="Load Time" value="<3s" />
						<MetricsCard title="Bundle Size" value="<500KB" />
						<MetricsCard title="API Response" value="<200ms" />
						<MetricsCard title="Cold Start" value="500ms" />
						<MetricsCard title="Cache Hit" value="60%" />
					</div>
				</div>

				{/* Technologies Used */}
				<div className="mt-12">
					<h3 className="mb-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						{t("projects.technologies")}
					</h3>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
						<div>
							<h4 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
								Frontend
							</h4>
							<div className="flex flex-wrap gap-2">
								{[
									"Next.js 15",
									"React 19",
									"TypeScript",
									"shadcn/ui",
									"Tailwind CSS",
									"React Query 5.0",
								].map((tech) => (
									<TechBadge key={tech} variant="primary">
										{tech}
									</TechBadge>
								))}
							</div>
						</div>
						<div>
							<h4 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
								Backend
							</h4>
							<div className="flex flex-wrap gap-2">
								{[
									".NET 9",
									"C#",
									"Entity Framework",
									"FastAPI",
									"Python",
									"PostgreSQL 15",
								].map((tech) => (
									<TechBadge key={tech} variant="secondary">
										{tech}
									</TechBadge>
								))}
							</div>
						</div>
						<div>
							<h4 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
								Infrastructure
							</h4>
							<div className="flex flex-wrap gap-2">
								{[
									"AWS Lambda",
									"AWS EC2",
									"Vercel",
									"Docker",
									"Redis",
									"Cloudflare",
								].map((tech) => (
									<TechBadge key={tech}>{tech}</TechBadge>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Additional Features */}
				{featuredProject.features[locale].length > 6 && (
					<div className="mt-12">
						<h3 className="mb-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
							Additional Features
						</h3>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{featuredProject.features[locale].slice(6).map((feature) => (
								<div
									key={`additional-${feature.substring(0, 50)}`}
									className="flex items-start gap-3"
								>
									<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
									<span className="text-sm text-zinc-600 dark:text-zinc-400">
										{feature}
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</SimpleLayout>
	);
}
