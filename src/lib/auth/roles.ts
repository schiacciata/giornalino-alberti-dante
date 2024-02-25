import { Role } from "@prisma/client";

export const isAdmin = (user: { role: Role }) => user.role === "ADMIN";
export const isEditor = (user: { role: Role }) => isAdmin(user) || user.role === "EDITOR";