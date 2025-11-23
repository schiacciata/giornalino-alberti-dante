import type { auth } from "../auth";

export const isAdmin = (user: Pick<typeof auth.$Infer.Session.user, "role">) =>
	user.role === "ADMIN";
export const isEditor = (user: Pick<typeof auth.$Infer.Session.user, "role">) =>
	isAdmin(user) || user.role === "EDITOR";
