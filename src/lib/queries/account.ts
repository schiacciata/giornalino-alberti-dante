import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId }
    });

    return account;
  } catch {
    return null;
  }
};

export const getAccountsByUserId = async (userId: string) => {
  try {
    const account = await db.account.findMany({
      where: { userId }
    });

    return account;
  } catch {
    return null;
  }
};