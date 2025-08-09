"use client";

import { useEffect, useState } from "react";

function ChevronUpIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="m18 15-6-6-6 6" />
		</svg>
	);
}

export function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	// Mostrar el botón cuando el usuario ha scrolleado hacia abajo
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	// Función para hacer scroll hacia arriba
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!isVisible) return null;

	return (
		<button
			onClick={scrollToTop}
			className="fixed bottom-24 right-4 z-50 rounded-full bg-teal-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-600"
			aria-label="Scroll to top"
		>
			<ChevronUpIcon className="h-6 w-6" />
		</button>
	);
}
