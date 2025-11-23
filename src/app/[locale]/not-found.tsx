import { Link } from "next-view-transitions";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { getScopedI18n } from "@/lib/i18n/server";

export default async function NotFound() {
	const scopedT = await getScopedI18n("notFound");
	return (
		<EmptyPlaceholder className="mx-auto max-w-[800px]">
			<EmptyPlaceholder.Icon name="warning" />
			<EmptyPlaceholder.Title>{scopedT("title")}</EmptyPlaceholder.Title>
			<EmptyPlaceholder.Description>
				{scopedT("description")}
			</EmptyPlaceholder.Description>
			<Link href="/" className={buttonVariants({ variant: "ghost" })}>
				{scopedT("action")}
			</Link>
		</EmptyPlaceholder>
	);
}
