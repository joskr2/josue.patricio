"use client";

import Link from "next/link";

import { ContainerInner, ContainerOuter } from "@/components/Container";
import { useTranslation } from "@/hooks/useTranslation";
import { personalInfo } from "@/lib/personal-data";

function NavLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="transition hover:text-teal-500 dark:hover:text-teal-400"
		>
			{children}
		</Link>
	);
}

export function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="mt-16 flex-none">
			<ContainerOuter>
				<div className="border-t border-zinc-100 pt-6 pb-8 dark:border-zinc-700/40">
					<ContainerInner>
						<div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
							<div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
								<NavLink href="/about">{t("nav.about")}</NavLink>
								<NavLink href="/projects">{t("nav.projects")}</NavLink>
								<NavLink href="/contact">{t("nav.contact")}</NavLink>
							</div>
							<p className="text-sm text-zinc-400 dark:text-zinc-500">
								&copy; {new Date().getFullYear()} {personalInfo.name}.{" "}
								{t("footer.allRightsReserved")}
							</p>
						</div>
					</ContainerInner>
				</div>
			</ContainerOuter>
		</footer>
	);
}
