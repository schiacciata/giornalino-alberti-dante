import { setStaticParamsLocale } from "next-international/server";
import { getScopedI18n, getStaticParams } from "@/lib/i18n/server";

export function generateStaticParams() {
	return getStaticParams();
}

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setStaticParamsLocale(locale);

	const t = await getScopedI18n("offlinePage");

	return (
		<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			<div className="flex max-w-[980px] flex-col items-start gap-2">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
					{t("title")}
				</h1>
				<p className="max-w-[700px] text-lg text-muted-foreground">
					{t("description")}
				</p>
			</div>
		</section>
	);
}
