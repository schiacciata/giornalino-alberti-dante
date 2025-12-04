import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "@/styles/scrollbar.css";

import { Suspense } from "react";
import { Toaster } from "sonner";
import GitHashIndicator from "@/components/git-hash-indicator";
import { Spinner } from "@/components/ui/spinner";
import siteConfig from "@/config/site";
import { locales } from "@/lib/i18n";
import { Providers } from "@/lib/providers";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
	metadataBase: new URL(absoluteUrl("")),
	title: {
		default: siteConfig.title,
		template: `${siteConfig.title} | %s`,
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		startupImage: ["/favicon.ico"],
	},
	description: siteConfig.description,
	applicationName: siteConfig.title,
	authors: [...siteConfig.authors],
	keywords: ["todo"],
	openGraph: {
		description: siteConfig.description,
		type: "website",
		images: [
			{
				url: "/images/icon-192x192.png",
				width: 192,
				height: 192,
			},
			{
				url: "/images/icon-256x256.png",
				width: 256,
				height: 256,
			},
			{
				url: "/images/icon-384x384.png",
				width: 384,
				height: 384,
			},
			{
				url: "/images/icon-512x512.png",
				width: 512,
				height: 512,
			},
		],
	},
	manifest: "/manifest.webmanifest",
	twitter: {
		card: "summary",
		description: siteConfig.description,
		...siteConfig.twitter,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/favicon.ico",
	},
};

export function generateViewport(): Viewport {
	return {
		themeColor: siteConfig.themeColor,
	};
}

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: LayoutProps<"/[locale]">) {
	const params = await props.params;

	const { children } = props;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					crossOrigin="anonymous"
					src="//unpkg.com/react-scan/dist/auto.global.js"
				/>
			</head>
			<body className="min-h-screen bg-background font-sans antialiased relative flex flex-col">
				<div className="min-h-screen h-full w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
					<div className="absolute inset-0 z-[-1] flex items-center justify-center dark:bg-black bg-white mask-[radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>

					<Toaster richColors={true} />
					<Suspense fallback={<Spinner />}>
						<Providers params={params}>{children}</Providers>
						<GitHashIndicator />
					</Suspense>
				</div>
			</body>
		</html>
	);
}
