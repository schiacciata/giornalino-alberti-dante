import { Link } from "next-view-transitions";
import { PageOperations } from "@/components/page/page-operations";
import { Skeleton } from "@/components/ui/skeleton";
import type { Page } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

interface PageItemProps {
	page: Pick<Page, "id" | "number" | "updatedAt" | "content">;
}

//const MAX_CHARS = 35;

export function PageItem({ page }: PageItemProps) {
	return (
		<div className="flex items-center justify-between p-4">
			<div className="grid gap-1">
				<Link
					href={`/editor/${page.id}`}
					className="font-semibold hover:underline"
				>
					<div>
						<p>Page {page.number}</p>
						{/*<p className={'text-sm text-muted-foreground italic'}>
              {page.content ? page.content.toString().slice(0, MAX_CHARS) : null}
            </p>*/}
					</div>
				</Link>
				<div>
					<p className="text-sm text-muted-foreground">
						Updated on {formatDate(page.updatedAt?.toDateString())}
					</p>
				</div>
			</div>
			<PageOperations page={{ id: page.id }} />
		</div>
	);
}

PageItem.Skeleton = function PageItemSkeleton() {
	return (
		<div className="p-4">
			<div className="space-y-3">
				<Skeleton className="h-5 w-2/5" />
				<Skeleton className="size-4/5" />
			</div>
		</div>
	);
};
