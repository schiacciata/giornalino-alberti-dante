import { Header } from "@/components/header";
import { getScopedI18n } from "@/lib/i18n/server";

export default async function DashboardSettingsLayout({
	children,
}: LayoutProps<"/[locale]/settings">) {
	const scopedT = await getScopedI18n("settings");

	return (
		<div className="container grid items-center gap-6 pb-8 pt-4">
			<Header
				heading={scopedT("heading")}
				text={scopedT("headingDescription")}
			/>
			{children}
		</div>
	);
}
