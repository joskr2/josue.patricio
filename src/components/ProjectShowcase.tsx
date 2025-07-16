import { Card } from "@/components/Card";
import { TechBadge } from "@/components/TechBadge";
import { useTranslation } from "@/hooks/useTranslation";
import type { Project } from "@/lib/projects-data";
import Link from "next/link";

interface ProjectShowcaseProps {
	project: Project;
}

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
			/>
		</svg>
	);
}

export function ProjectShowcase({ project }: ProjectShowcaseProps) {
	const { t, locale } = useTranslation();

	return (
		<Card as="article" className="md:col-span-3">
			<Card.Title href={`/projects#${project.id}`}>
				{project.title[locale]}
			</Card.Title>
			<Card.Description>{project.description[locale]}</Card.Description>
			<Card.Eyebrow as="time" decorate>
				{t("home.featuredProject")}
			</Card.Eyebrow>

			{/* Technologies */}
			<div className="relative z-10 mt-4 flex flex-wrap gap-2">
				{project.technologies.slice(0, 6).map((tech) => (
					<TechBadge key={tech} variant="primary">
						{tech}
					</TechBadge>
				))}
				{project.technologies.length > 6 && (
					<TechBadge variant="default">
						+{project.technologies.length - 6} more
					</TechBadge>
				)}
			</div>

			{/* Links */}
			<div className="relative z-10 mt-6 flex flex-wrap gap-4">
				{project.links.live && (
					<Link
						href={project.links.live}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-sm font-medium text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
					>
						<ExternalLinkIcon className="h-4 w-4 transition group-hover:scale-110" />
						{t("projects.viewLive")}
					</Link>
				)}
				{project.links.frontend && (
					<Link
						href={project.links.frontend}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
					>
						<GitHubIcon className="h-4 w-4 fill-current transition group-hover:scale-110" />
						Frontend
					</Link>
				)}
				{project.links.backend && (
					<Link
						href={project.links.backend}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
					>
						<GitHubIcon className="h-4 w-4 fill-current transition group-hover:scale-110" />
						Backend
					</Link>
				)}
			</div>

			<Card.Cta>{t("home.viewProject")}</Card.Cta>
		</Card>
	);
}
