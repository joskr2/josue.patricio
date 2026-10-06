import type { Metadata } from "next";

import { Providers } from "@/app/providers";
import { Layout } from "@/components/Layout";
import { siteUrl } from "@/lib/personal-data";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		template: "%s - Josue Retamozo",
		default: "Josue Retamozo - Software Engineer | React, .NET, Java",
	},
	description:
		"Software Engineer with 5+ years of experience building React.js and React Native frontends, with a full-stack foundation in C# (.NET), Java, and microservices. Experienced with GeneXus, SQL Server, and IBM AS/400 on banking applications.",
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: siteUrl,
		siteName: "Josue Retamozo",
		title: "Josue Retamozo - Software Engineer | React, .NET, Java",
		description:
			"Software Engineer with 5+ years of experience building React.js and React Native frontends, with a full-stack foundation in C# (.NET), Java, and microservices. Experienced with GeneXus, SQL Server, and IBM AS/400 on banking applications.",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Josue Retamozo - Software Engineer | React, .NET, Java",
		description:
			"Software Engineer with 5+ years of experience building React.js and React Native frontends, with a full-stack foundation in C# (.NET), Java, and microservices. Experienced with GeneXus, SQL Server, and IBM AS/400 on banking applications.",
	},
	robots: { index: true, follow: true },
	keywords: [
		"React",
		"React Native",
		"Next.js",
		"TypeScript",
		".NET",
		"C#",
		"Java",
		"GeneXus",
		"SQL Server",
		"Microservices",
		"Frontend",
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
