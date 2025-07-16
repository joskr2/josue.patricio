import Image from "next/image";

import { TechBadge } from "@/components/TechBadge";
import { useTranslation } from "@/hooks/useTranslation";
import type { Experience } from "@/lib/experience-data";

interface ExperienceItemProps {
	experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
	const { locale } = useTranslation();

	return (
		<li className="flex gap-4">
			<div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
				{experience.logo ? (
					<Image
						src={experience.logo}
						alt={experience.company}
						width={28}
						height={28}
						className="h-7 w-7 object-contain"
					/>
				) : (
					<div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
						<span className="text-xs font-bold text-white">
							{experience.company.charAt(0)}
						</span>
					</div>
				)}
			</div>
			<dl className="flex flex-auto flex-wrap gap-x-2">
				<dt className="sr-only">Company</dt>
				<dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
					{experience.position[locale]}
				</dd>
				<dt className="sr-only">Company</dt>
				<dd className="text-xs text-zinc-500 dark:text-zinc-400">
					{experience.company}
				</dd>
				<dt className="sr-only">Date</dt>
				<dd
					className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
					aria-label={experience.duration[locale]}
				>
					{experience.duration[locale]}
				</dd>
				<dt className="sr-only">Description</dt>
				<dd className="mt-2 w-full text-sm text-zinc-600 dark:text-zinc-400">
					<ul className="list-disc list-inside space-y-1">
						{experience.description[locale].map((item) => (
							<li key={item.substring(0, 50)}>{item}</li>
						))}
					</ul>
				</dd>
				{experience.technologies.length > 0 && (
					<>
						<dt className="sr-only">Technologies</dt>
						<dd className="mt-3 w-full">
							<div className="flex flex-wrap gap-2">
								{experience.technologies.map((tech) => (
									<TechBadge key={tech} size="sm">
										{tech}
									</TechBadge>
								))}
							</div>
						</dd>
					</>
				)}
			</dl>
		</li>
	);
}
