import { type FC, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Page } from "@/generated/prisma/client";
import EditorContentRender from "../editor/editor-content-render";
import { Icon } from "../icons";
import { PageSwitcher } from "../page/page-switcher";

interface PostContentRendererProps {
	pages: Pick<Page, "number" | "content">[];
}

export const PostContentRenderer: FC<PostContentRendererProps> = ({
	pages,
}) => {
	const [pageIndex, setPageIndex] = useState<number>(0);
	if (pages.length === 0) return null;

	const numPages = pages.length;

	const handlePageChange = (increment: number) => {
		const newPageIndex = pageIndex + increment;
		if (newPageIndex >= 0 && newPageIndex < numPages) {
			setPageIndex(newPageIndex);
		}
	};

	const getOperations = (pageIndex: number): any[] => {
		const { content } = pages[pageIndex] as Page & { content: any };
		return content?.ops ?? [];
	};

	return (
		<>
			<Progress value={((pageIndex + 1) / numPages) * 100} />
			<PageSwitcher
				pageIndex={pageIndex}
				pageCount={numPages}
				onPageChange={handlePageChange}
			/>
			<EditorContentRender operations={getOperations(pageIndex)} />
			<PageSwitcher
				pageIndex={pageIndex}
				pageCount={numPages}
				onPageChange={handlePageChange}
			/>
		</>
	);
};
