import { AuthUser } from "@/types/next-auth";

export const isAdmin = (user: AuthUser) => user.role === "ADMIN";
export const isEditor = (user: AuthUser) => isAdmin(user) || user.role === "EDITOR";