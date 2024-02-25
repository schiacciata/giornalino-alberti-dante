'use server'

import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { getI18n } from "@/lib/i18n/server";

export async function deleteAccountByProviderID(provider: string) {
    const t = await getI18n();

    const user = await getCurrentUser();
    if (!user) return Promise.reject(t('errors.unauthenticated'));

    const account = await db.account.findFirst({
      where: {
        userId: user.id,
        provider: provider,
      },
      select: {
        id: true,
      }
    });
  
    if (!account) {
      return Promise.reject(t('accounts.delete.notFound'));
    }
  
    await db.account.delete({
      where: {
        id: account.id,
      },
    });

    return { message: t('accounts.delete.success') };
}