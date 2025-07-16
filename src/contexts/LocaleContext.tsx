"use client";

import { type Locale, defaultLocale, detectLocale } from "@/lib/i18n";
import { createContext, useContext, useEffect, useState } from "react";

interface LocaleContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(defaultLocale);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Only run on client side
		const detectedLocale = detectLocale();
		setLocaleState(detectedLocale);
		setIsInitialized(true);
	}, []);

	const setLocale = (newLocale: Locale) => {
		setLocaleState(newLocale);
		if (typeof window !== "undefined") {
			localStorage.setItem("locale", newLocale);
		}
	};

	// Don't render children until locale is initialized to prevent hydration mismatch
	if (!isInitialized) {
		return null;
	}

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			{children}
		</LocaleContext.Provider>
	);
}

export function useLocale() {
	const context = useContext(LocaleContext);
	if (context === undefined) {
		throw new Error("useLocale must be used within a LocaleProvider");
	}
	return context;
}
