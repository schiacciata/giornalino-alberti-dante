"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

function buildPagination(page: number, totalPages: number) {
	const pages: (number | "...")[] = [];

	const show = (p: number) => pages.push(p);
	const dot = () => pages.push("...");

	if (totalPages <= 7) {
		// Small page count → show all
		for (let i = 1; i <= totalPages; i++) show(i);
	} else {
		show(1);

		if (page > 3) dot();

		const start = Math.max(2, page - 1);
		const end = Math.min(totalPages - 1, page + 1);

		for (let i = start; i <= end; i++) show(i);

		if (page < totalPages - 2) dot();

		show(totalPages);
	}

	return pages;
}

interface PaginationControlsProps {
	page: number;
	totalPages: number;
}

export function PaginationControls({
	page,
	totalPages,
}: PaginationControlsProps) {
	if (totalPages <= 1) return null;

	const prev = page > 1 ? page - 1 : 1;
	const next = page < totalPages ? page + 1 : totalPages;

	const pagination = buildPagination(page, totalPages);

	return (
		<Pagination className="py-4">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`?page=${prev}`}
						aria-disabled={page <= 1}
						className={page <= 1 ? "opacity-50 pointer-events-none" : ""}
					/>
				</PaginationItem>

				{pagination.map((p, idx) => (
					<PaginationItem key={idx.toString()}>
						{p === "..." ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink href={`?page=${p}`} isActive={p === page}>
								{p}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href={`?page=${next}`}
						aria-disabled={page >= totalPages}
						className={
							page >= totalPages ? "opacity-50 pointer-events-none" : ""
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
