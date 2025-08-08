"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useBlur } from "@/contexts/BlurContext";

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { isBlurred } = useBlur();
	
	return (
		<>
			<div className="fixed inset-0 flex justify-center sm:px-8">
				<div className="flex w-full max-w-7xl lg:px-8">
					<div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
				</div>
			</div>
			<div className="relative flex w-full flex-col">
				<Header />
				<main className={`flex-auto pt-20 transition-all duration-300 ${
					isBlurred ? 'blur-sm opacity-80' : ''
				}`}>
					{children}
				</main>
				<Footer />
				<ScrollToTop />
			</div>
		</>
	);
}
