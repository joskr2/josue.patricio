import { TechBadge } from "@/components/TechBadge";

interface SkillCategoryProps {
	title: string;
	skills: string[];
	variant?: "default" | "primary" | "secondary";
}

export function SkillCategory({
	title,
	skills,
	variant = "default",
}: SkillCategoryProps) {
	return (
		<div>
			<h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
				{title}
			</h3>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<TechBadge key={skill} variant={variant} size="md">
						{skill}
					</TechBadge>
				))}
			</div>
		</div>
	);
}
