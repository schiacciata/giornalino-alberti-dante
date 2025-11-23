"use client";

import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";
import { I18nProviderClient } from "@/lib/i18n/client";
import { ServiceWorkerProvider } from "@/lib/providers/sw";
import type { RootLayoutProps } from "@/types/layout";

export function Providers({ children, params }: RootLayoutProps) {
	return (
		<ViewTransitions>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<I18nProviderClient locale={params.locale}>
					<ServiceWorkerProvider>{children}</ServiceWorkerProvider>
				</I18nProviderClient>
			</ThemeProvider>
		</ViewTransitions>
	);
}
