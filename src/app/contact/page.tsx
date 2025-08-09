"use client";

import Link from "next/link";

import { SimpleLayout } from "@/components/SimpleLayout";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/SocialIcons";
import { useTranslation } from "@/hooks/useTranslation";
import { personalInfo } from "@/lib/personal-data";
import { motion } from "motion/react";

// Motion variants for staggered entrances
const listVariants = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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

function PhoneIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
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

function LocationIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
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
}: Readonly<{
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	href?: string;
	description?: string;
}>) {
	const content = (
		<motion.div
			variants={itemVariants}
			whileHover={{ scale: 1.02, y: -2 }}
			transition={{ type: "spring", stiffness: 260, damping: 22 }}
			className="group relative h-full rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700/40 dark:bg-zinc-800"
		>
			<div className="flex h-full items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
					<Icon className="h-6 w-6 text-teal-600 dark:text-teal-400 flex-shrink-0" />
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
						{title}
					</h3>
					<p className="text-zinc-600 dark:text-zinc-400 truncate">{value}</p>
					{description && (
						<p className="text-sm text-zinc-500 dark:text-zinc-500">
							{description}
						</p>
					)}
				</div>
			</div>
		</motion.div>
	);

	if (href) {
		const isPhoneLink = href.startsWith('tel:');
		const shouldOpenNewTab = !isPhoneLink;
		
		return (
			<Link 
				href={href} 
				{...(shouldOpenNewTab && { target: "_blank", rel: "noopener noreferrer" })}
				className="block h-full"
			>
				{content}
			</Link>
		);
	}

	return content;
}

export default function Contact() {
	const { t, locale } = useTranslation();
	const whatsappHref = (() => {
		const phoneSanitized = personalInfo.phone.replace(/\D/g, "");
		const base = `https://wa.me/${phoneSanitized}`;
		const msg = t("contact.whatsappPrefill");
		return `${base}?text=${encodeURIComponent(msg)}`;
	})();

	return (
		<SimpleLayout title={t("contact.title")} intro={t("contact.subtitle")}>
			<div className="mx-auto max-w-4xl">
				{/* Contact Information */}
				<motion.div
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
					variants={listVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
				>
					<ContactCard
						icon={WhatsAppIcon}
						title={t("contact.whatsapp")}
						value={personalInfo.phone}
						href={whatsappHref}
						description={t("contact.whatsappTooltip")}
					/>

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
						href={`tel:${personalInfo.phone}`}
						description={t("contact.callDuringHours")}
					/>

					<ContactCard
						icon={LocationIcon}
						title={t("contact.location")}
						value={personalInfo.location[locale]}
						href="https://maps.google.com/?q=Arequipa,Peru"
						description={t("contact.currentlyBased")}
					/>
				</motion.div>

				{/* Social Links */}
				<div className="mt-16">
					<h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-8">
						{t("contact.connectWithMe")}
					</h2>
					<motion.div
						className="grid grid-cols-1 gap-6 sm:grid-cols-2"
						variants={listVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
					>
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
					</motion.div>
				</div>

				{/* Call to Action */}
				<motion.div
					className="mt-16 rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 p-8 text-center dark:from-teal-900/20 dark:to-blue-900/20"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						{t("contact.letsWorkTogether")}
					</h2>
					<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
						{t("contact.alwaysInterested")}
					</p>
					<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Link
							href={`mailto:${personalInfo.email}`}
							className="rounded-full bg-teal-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
						>
							{t("contact.sendEmail")}
						</Link>
						<Link
							href={personalInfo.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
						>
							{t("contact.connectOnLinkedIn")}
						</Link>
					</div>
				</motion.div>

				{/* Additional Information */}
				<motion.div
					className="mt-16 border-t border-zinc-200 pt-16 dark:border-zinc-700"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div
						className="grid grid-cols-1 gap-8 sm:grid-cols-2"
						variants={listVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
					>
						<motion.div variants={itemVariants}>
							<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
								{t("contact.availability")}
							</h3>
							<p className="text-zinc-600 dark:text-zinc-400">
								{t("contact.availabilityText")}
							</p>
						</motion.div>
						<motion.div variants={itemVariants}>
							<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
								{t("contact.expertise")}
							</h3>
							<p className="text-zinc-600 dark:text-zinc-400">
								{t("contact.expertiseText")}
							</p>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</SimpleLayout>
	);
}
