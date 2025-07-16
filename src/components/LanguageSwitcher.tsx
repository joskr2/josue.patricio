"use client";

import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/i18n";
import clsx from "clsx";

export function LanguageSwitcher() {
	const { locale, setLocale } = useLocale();

	const handleLocaleChange = (newLocale: Locale) => {
		setLocale(newLocale);
	};

	return (
		<div className="flex items-center space-x-1 rounded-lg bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
			<button
				type="button"
				onClick={() => handleLocaleChange("en")}
				className={clsx(
					"rounded px-2 py-1 text-sm font-medium transition-colors",
					locale === "en"
						? "bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
						: "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
				)}
				aria-label="Switch to English"
			>
				EN
			</button>
			<button
				type="button"
				onClick={() => handleLocaleChange("es")}
				className={clsx(
					"rounded px-2 py-1 text-sm font-medium transition-colors",
					locale === "es"
						? "bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
						: "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
				)}
				aria-label="Cambiar a Español"
			>
				ES
			</button>
		</div>
	);
}
