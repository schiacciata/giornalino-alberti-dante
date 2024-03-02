import { SearchParams } from "@/types";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { searchParamsSchema } from "@/lib/validations/params";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getCountInYear = async (currentYear: number = new Date().getFullYear()) => {
  const userData = await db.user.findMany({
    where: {
      AND: [
        { createdAt: { gte: new Date(currentYear, 0, 1) } },
        { createdAt: { lt: new Date(currentYear + 1, 0, 1) } },
      ],
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      createdAt: true,
    }
  });

  const userCountByMonth = Array(12).fill(0);
  userData.forEach((user) => {
    const month = user.createdAt.getMonth();
    userCountByMonth[month]++;
  });

  const formattedData = userCountByMonth.map((count, index) => ({
    date: new Date(currentYear, index),
    usersCreated: count,
  }));

  return formattedData;
}

export async function getUsers(searchParams: SearchParams) {
    noStore();
    try {
        const { page, per_page, sort, name } = searchParamsSchema.parse(searchParams)

        const pageAsNumber = Number(page)
        const fallbackPage =
            isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
        const perPageAsNumber = Number(per_page)
        const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
        const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
        
        const [column, order] = (sort?.split(".") as [
            keyof User | undefined,
            "asc" | "desc" | undefined,
        ]) ?? ["createdAt", "desc"]

        const orderBy = (column && order) ? { [column]: order } as Record<keyof User, 'asc' | 'desc'> : null;

        const options = {
            where: {
                name: {
                    contains: name,
                },
            },
            orderBy: orderBy ? [orderBy] : [
                { createdAt: "desc" as const },
            ],
        };

        const data = await db.user.findMany({
            take: limit,
            skip: offset,
            ...options,
        });

        const count = await db.user.count(options);

        const pageCount = Math.ceil(count / limit);

        return { data, pageCount };
    } catch (err) {
        console.error(err);
        return { data: [], pageCount: 0 };
    }
}