import clsx from "clsx";

interface TechBadgeProps {
	children: React.ReactNode;
	variant?: "default" | "primary" | "secondary";
	size?: "sm" | "md";
}

export function TechBadge({
	children,
	variant = "default",
	size = "sm",
}: Readonly<TechBadgeProps>) {
	return (
		<span
			className={clsx(
				"inline-flex items-center rounded-full font-medium",
				{
					"px-2 py-1 text-xs": size === "sm",
					"px-3 py-1.5 text-sm": size === "md",
				},
				{
					"bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200":
						variant === "default",
					"bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300":
						variant === "primary",
					"bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300":
						variant === "secondary",
				},
			)}
		>
			{children}
		</span>
	);
}
