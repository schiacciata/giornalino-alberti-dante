import { Link } from "next-view-transitions";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { getScopedI18n } from "@/lib/i18n/server";

export default async function NotFound() {
	const scopedT = await getScopedI18n("notFound");
	return (
		<div className="flex min-h-screen items-center justify-center w-full mx-auto max-w-[800px]">
			<EmptyPlaceholder className="">
				<EmptyPlaceholder.Icon name="warning" />
				<EmptyPlaceholder.Title>{scopedT("title")}</EmptyPlaceholder.Title>
				<EmptyPlaceholder.Description>
					{scopedT("description")}
				</EmptyPlaceholder.Description>
				<Link href="/" className={buttonVariants({ variant: "ghost" })}>
					{scopedT("action")}
				</Link>
			</EmptyPlaceholder>
		</div>
	);
}
