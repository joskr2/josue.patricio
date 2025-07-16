"use client";

import Link from "next/link";

import { SimpleLayout } from "@/components/SimpleLayout";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { useTranslation } from "@/hooks/useTranslation";
import { personalInfo } from "@/lib/personal-data";

function MailIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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

function PhoneIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

function LocationIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
			<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);
}

function ContactCard({
	icon: Icon,
	title,
	value,
	href,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	href?: string;
	description?: string;
}) {
	const content = (
		<div className="group relative h-full rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700/40 dark:bg-zinc-800">
			<div className="flex h-full items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
					<Icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
				</div>
				<div className="flex-1">
					<h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
						{title}
					</h3>
					<p className="text-zinc-600 dark:text-zinc-400">{value}</p>
					{description && (
						<p className="text-sm text-zinc-500 dark:text-zinc-500">
							{description}
						</p>
					)}
				</div>
			</div>
		</div>
	);

	if (href) {
		return (
			<Link href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
				{content}
			</Link>
		);
	}

	return content;
}

export default function Contact() {
	const { t, locale } = useTranslation();

	return (
		<SimpleLayout title={t("contact.title")} intro={t("contact.subtitle")}>
			<div className="mx-auto max-w-4xl">
				{/* Contact Information */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<ContactCard
						icon={MailIcon}
						title={t("contact.email")}
						value={personalInfo.email}
						href={`mailto:${personalInfo.email}`}
						description={t("contact.sendEmail")}
					/>

					<ContactCard
						icon={PhoneIcon}
						title={t("contact.phone")}
						value={personalInfo.phone}
						description={t("contact.callDuringHours")}
					/>

					<ContactCard
						icon={LocationIcon}
						title={t("contact.location")}
						value={personalInfo.location[locale]}
						description={t("contact.currentlyBased")}
					/>
				</div>

				{/* Social Links */}
				<div className="mt-16">
					<h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-8">
						{t("contact.connectWithMe")}
					</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<ContactCard
							icon={LinkedInIcon}
							title={t("contact.linkedin")}
							value="josue-retamozo"
							href={personalInfo.linkedin}
							description={t("contact.professionalNetwork")}
						/>

						<ContactCard
							icon={GitHubIcon}
							title={t("contact.github")}
							value="joskr2"
							href={personalInfo.github}
							description={t("contact.openSourceProjects")}
						/>
					</div>
				</div>

				{/* Call to Action */}
				<div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 p-8 text-center dark:from-teal-900/20 dark:to-blue-900/20">
					<h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						{t("contact.letsWorkTogether")}
					</h2>
					<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
						{t("contact.alwaysInterested")}
					</p>
					<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Link
							href={`mailto:${personalInfo.email}`}
							className="rounded-full bg-teal-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
						>
							{t("contact.sendEmail")}
						</Link>
						<Link
							href={personalInfo.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
						>
							{t("contact.connectOnLinkedIn")}
						</Link>
					</div>
				</div>

				{/* Additional Information */}
				<div className="mt-16 border-t border-zinc-200 pt-16 dark:border-zinc-700">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
						<div>
							<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
								{t("contact.availability")}
							</h3>
							<p className="text-zinc-600 dark:text-zinc-400">
								{t("contact.availabilityText")}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
								{t("contact.expertise")}
							</h3>
							<p className="text-zinc-600 dark:text-zinc-400">
								{t("contact.expertiseText")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</SimpleLayout>
	);
}
