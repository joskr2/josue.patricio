"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

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
			<path d="m9 12 2 2 4-4" />
		</svg>
	);
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
			<path d="m6 9 6 6 6-6" />
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
	
	// Sort projects: featured first, then non-featured
	const sortedProjects = [...projects].sort((a, b) => {
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		return 0;
	});

	return (
		<SimpleLayout title={t("projects.title")} intro={t("projects.subtitle")}>
			<div className="space-y-20">
				{sortedProjects.map((project, projectIndex) => (
					<div key={project.id} className="group relative">
						{/* Project Header */}
						<div className="mb-8">
							<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
								{project.title[locale]}
							</h2>
							<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
								{project.description[locale]}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="mb-8 flex flex-wrap gap-4">
							{project.links.live && (
								<Link
									href={project.links.live}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 transition-colors"
								>
									<ExternalLinkIcon className="h-4 w-4 transition group-hover:scale-110" />
									View Live
								</Link>
							)}
							{project.links.backend && (
								<Link
									href={project.links.backend}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
								>
									<GitHubIcon className="h-4 w-4 transition group-hover:scale-110" />
									Backend
								</Link>
							)}
							{project.links.frontend && (
								<Link
									href={project.links.frontend}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 transition-colors dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
								>
									<GitHubIcon className="h-4 w-4 transition group-hover:scale-110" />
									Frontend
								</Link>
							)}
							{project.links.bff && (
								<Link
									href={project.links.bff}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 transition-colors dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
								>
									<GitHubIcon className="h-4 w-4 transition group-hover:scale-110" />
									BFF Service
								</Link>
							)}
						</div>

						{/* Health Check Links - solo para el proyecto featured */}
						{project.featured && (project.links.apiHealth || project.links.bffHealth) && (
							<div className="mb-8">
								<h3 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
									Live Services
								</h3>
								<div className="flex flex-wrap gap-3">
									{project.links.apiHealth && (
										<Link
											href={project.links.apiHealth}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
										>
											<div className="h-2 w-2 rounded-full bg-green-500" />
											API Health Check
										</Link>
									)}
									{project.links.bffHealth && (
										<Link
											href={project.links.bffHealth}
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

						{/* Technologies */}
						<div className="mb-8">
							<h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
								Technologies
							</h3>
							<div className="flex flex-wrap gap-2">
								{project.technologies.map((tech) => (
									<TechBadge key={tech}>{tech}</TechBadge>
								))}
							</div>
						</div>

						{/* Key Features Accordion */}
						<Disclosure>
							{({ open }) => (
								<>
									<DisclosureButton className="flex w-full justify-between rounded-lg bg-zinc-50 px-4 py-3 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-100 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden">
										<span>Key Features</span>
										<ChevronDownIcon
											className={`${
												open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-zinc-500`}
										/>
									</DisclosureButton>
									<div className="hidden md:block mb-8">
										<h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
											Key Features
										</h3>
										<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
											{project.features[locale].map((feature) => (
												<div key={feature} className="flex items-start gap-3">
													<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
													<span className="text-sm text-zinc-600 dark:text-zinc-400">
														{feature}
													</span>
												</div>
											))}
										</div>
									</div>
									<DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-zinc-600 dark:text-zinc-400 md:hidden">
										<div className="grid grid-cols-1 gap-3">
											{project.features[locale].map((feature) => (
												<div key={feature} className="flex items-start gap-3">
													<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
													<span>{feature}</span>
												</div>
											))}
										</div>
									</DisclosurePanel>
								</>
							)}
						</Disclosure>

						{/* Architecture Accordion */}
						<Disclosure>
							{({ open }) => (
								<>
									<DisclosureButton className="flex w-full justify-between rounded-lg bg-zinc-50 px-4 py-3 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-100 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden mt-3">
										<span>Architecture</span>
										<ChevronDownIcon
											className={`${
												open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-zinc-500`}
										/>
									</DisclosureButton>
									<div className="hidden md:block mb-8">
										<h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
											Architecture
										</h3>
										<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
											{project.architecture[locale].map((item) => (
												<div key={item} className="flex items-start gap-3">
													<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
													<span className="text-sm text-zinc-600 dark:text-zinc-400">
														{item}
													</span>
												</div>
											))}
										</div>
									</div>
									<DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-zinc-600 dark:text-zinc-400 md:hidden">
										<div className="grid grid-cols-1 gap-3">
											{project.architecture[locale].map((item) => (
												<div key={item} className="flex items-start gap-3">
													<CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
													<span>{item}</span>
												</div>
											))}
										</div>
									</DisclosurePanel>
								</>
							)}
						</Disclosure>

						{/* Performance Metrics Accordion */}
						<Disclosure>
							{({ open }) => (
								<>
									<DisclosureButton className="flex w-full justify-between rounded-lg bg-zinc-50 px-4 py-3 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-100 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden mt-3">
										<span>Performance</span>
										<ChevronDownIcon
											className={`${
												open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-zinc-500`}
										/>
									</DisclosureButton>
									<div className="hidden md:block mb-8">
										<h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
											Performance
										</h3>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
											<MetricsCard title="Uptime" value={project.metrics.uptime} />
											<MetricsCard title="Load Time" value={project.metrics.loadTime} />
											<MetricsCard title="API Response" value={project.metrics.apiResponse} />
										</div>
									</div>
									<DisclosurePanel className="px-4 pt-4 pb-2 text-sm md:hidden">
										<div className="grid grid-cols-1 gap-4">
											<MetricsCard title="Uptime" value={project.metrics.uptime} />
											<MetricsCard title="Load Time" value={project.metrics.loadTime} />
											<MetricsCard title="API Response" value={project.metrics.apiResponse} />
										</div>
									</DisclosurePanel>
								</>
							)}
						</Disclosure>

						{/* Separator line between projects */}
						{projectIndex < sortedProjects.length - 1 && (
							<div className="mt-16 border-t border-zinc-200 dark:border-zinc-700"></div>
						)}
					</div>
				))}
			</div>
		</SimpleLayout>
	);
}
