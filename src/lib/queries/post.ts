import { SearchParams } from "@/types";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { searchParamsSchema } from "@/lib/validations/params";
import { Post } from "@prisma/client";

export async function getPosts(searchParams: SearchParams) {
    noStore();
    try {
        const { page, per_page, sort, title, pdfPath, published, operator } = searchParamsSchema.parse(searchParams)

        // Fallback page for invalid page numbers
        const pageAsNumber = Number(page)
        const fallbackPage =
            isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
        // Number of items per page
        const perPageAsNumber = Number(per_page)
        const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
        // Number of items to skip
        const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
        
        const [column, order] = (sort?.split(".") as [
            keyof Post | undefined,
            "asc" | "desc" | undefined,
        ]) ?? ["createdAt", "desc"]

        const orderBy = (column && order) ? { [column]: order } as Record<keyof Post, 'asc' | 'desc'> : null;

        const options = {
            where: {
                title: {
                    contains: title,
                },
            },
            orderBy: orderBy ? [orderBy] : [
                { createdAt: "desc" as const },
            ],
        };

        const data = await db.post.findMany({
            take: limit,
            skip: offset,
            ...options,
        });

        const count = await db.post.count(options);

        const pageCount = Math.ceil(count / limit);

        return { data, pageCount };
    } catch (err) {
        console.error(err);
        return { data: [], pageCount: 0 };
    }
}