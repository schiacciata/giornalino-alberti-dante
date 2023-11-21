import { User } from "next-auth";

export const isAdmin = (user: User) => user.role === "ADMIN";
export const isEditor = (user: User) => isAdmin(user) || user.role === "EDITOR";