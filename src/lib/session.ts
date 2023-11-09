import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { User } from "next-auth"
import config from "@/config";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user
}

export function isAdmin(user: User) {
  return true;
  if (!user.email) return false;
  return config.admins.includes(user.email)// || user.is_admin;
}