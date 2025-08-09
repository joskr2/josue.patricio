"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useBlur } from "@/contexts/BlurContext";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { personalInfo } from "@/lib/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { isBlurred } = useBlur();
	const { t } = useTranslation();
	const pathname = usePathname();
	
	return (
		<>
			<div className="fixed inset-0 flex justify-center sm:px-8">
				<div className="flex w-full max-w-7xl lg:px-8">
					<div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
				</div>
			</div>
			<div className="relative flex w-full flex-col">
				<Header />
				<main className={`flex-auto pt-20 transition-all duration-300 ${isBlurred ? 'blur-sm opacity-80' : ''}`}>
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={pathname}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.25, ease: "easeOut" }}
						>
							{children}
						</motion.div>
					</AnimatePresence>
				</main>
				<Footer />
				<ScrollToTop />
				{/* Floating WhatsApp Button */}
				<FloatingWhatsAppButton
					phone={personalInfo.phone}
					message={t("contact.whatsappPrefill")}
					tooltip={t("contact.whatsappTooltip")}
				/>
			</div>
		</>
	);
}
