import { db } from "@/lib/db";

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