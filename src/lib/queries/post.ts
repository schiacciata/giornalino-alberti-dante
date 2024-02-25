import { SearchParams } from "@/types";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { searchParamsSchema } from "@/lib/validations/params";

export async function getPosts(searchParams: SearchParams) {
    noStore();
    try {
        const { page, per_page, sort, title, status, priority, operator } =
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
        /*const [column, order] = (sort?.split(".") as [
            keyof Post | undefined,
            "asc" | "desc" | undefined,
        ]) ?? ["title", "desc"]

        const statuses = (status?.split(".") as Post["published"][]) ?? []
        const priorities = (priority?.split(".") as Post["pdfPath"][]) ?? []*/
        // Your existing logic for page, per_page, sort, etc.

        const data = await db.post.findMany({
            take: limit,
            skip: offset,
            where: {
                // Your existing logic for filtering
            },
            orderBy: {
              createdAt: "desc",
            },
        });

        const count = await db.post.count({
            where: {
                // Your existing logic for counting
            },
        });

        const pageCount = Math.ceil(count / limit);

        return { data, pageCount };
    } catch (err) {
        console.error(err);
        return { data: [], pageCount: 0 };
    }
}