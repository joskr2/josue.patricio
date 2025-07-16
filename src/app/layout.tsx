import type { Metadata } from "next";

import { Providers } from "@/app/providers";
import { Layout } from "@/components/Layout";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
	title: {
		template: "%s - Josue Retamozo",
		default: "Josue Retamozo - Software Engineer | React, Python, .NET",
	},
	description:
		"Software Engineer with 5+ years of experience in React, Angular, Python, FastAPI, .NET. Specialized in frontend development and microservices architecture.",
	keywords: [
		"Software Engineer",
		"React",
		"Python",
		".NET",
		"Frontend Developer",
		"Full Stack",
		"TypeScript",
		"JavaScript",
	],
	authors: [{ name: "Josue Patricio Retamozo Vargas" }],
	creator: "Josue Retamozo",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full antialiased" suppressHydrationWarning>
			<body className="flex h-full bg-zinc-50 dark:bg-black">
				<Providers>
					<div className="flex w-full">
						<Layout>{children}</Layout>
					</div>
				</Providers>
			</body>
		</html>
	);
}
