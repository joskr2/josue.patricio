"use client";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef } from "react";

function usePrevious<T>(value: T) {
	const ref = useRef<T>();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

function ThemeWatcher() {
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		function onMediaChange() {
			const systemTheme = media.matches ? "dark" : "light";
			if (resolvedTheme === systemTheme) {
				setTheme("system");
			}
		}

		onMediaChange();
		media.addEventListener("change", onMediaChange);

		return () => {
			media.removeEventListener("change", onMediaChange);
		};
	}, [resolvedTheme, setTheme]);

	return null;
}

export const AppContext = createContext<{ previousPathname?: string }>({});

export function Providers({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const previousPathname = usePrevious(pathname);

	return (
		<AppContext.Provider value={{ previousPathname }}>
			<ThemeProvider attribute="class" disableTransitionOnChange>
				<LocaleProvider>
					<ThemeWatcher />
					{children}
				</LocaleProvider>
			</ThemeProvider>
		</AppContext.Provider>
	);
}
