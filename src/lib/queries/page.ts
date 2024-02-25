import { SearchParams } from "@/types";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { searchParamsSchema } from "@/lib/validations/params";
import { Page, Prisma } from "@prisma/client";

export async function getPages(postId: string, searchParams: SearchParams) {
    noStore();
    try {
        const { page, per_page, sort, number, operator } =
        searchParamsSchema.parse(searchParams)

        // Fallback page for invalid page numbers
        const pageAsNumber = Number(page)
        const fallbackPage =
            isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
        // Number of items per page
        const perPageAsNumber = Number(per_page)
        const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
        // Number of items to skip
        const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
        // Column and order to sort by
        // Spliting the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]
        const [column, order] = (sort?.split(".") as [
            keyof Page | undefined,
            "asc" | "desc" | undefined,
        ]) ?? ["number", "desc"]

        const orderBy = (column && order) ? { [column]: order } as Record<keyof Page, 'asc' | 'desc'> : null;

        const options = {
            where: {
                postId: postId,
            },
            orderBy: orderBy ? [orderBy] : [
                { number: "desc" as const },
            ],
        } as any;

        const postPageNumber = Number(number);
        if (!isNaN(postPageNumber) && options.where) options.where.number = postPageNumber;

        const data = await db.page.findMany({
            take: limit,
            skip: offset,
            ...options,
        });

        const count = await db.page.count(options);

        const pageCount = Math.ceil(count / limit);

        return { data, pageCount };
    } catch (err) {
        console.error(err);
        return { data: [], pageCount: 0 };
    }
}