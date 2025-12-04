import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const getSession = async (h: Awaited<ReturnType<typeof headers>>) => {
	//"use cache";

	return await auth.api.getSession({
		headers: h,
	});
};

export const getCurrentSession = async () => {
	const h = await headers();
	const session = getSession(h);

	return session;
};

export async function getCurrentUser() {
	const session = await getCurrentSession();
	return session?.user;
}

export const getCurrentRole = async () => {
	const session = await getCurrentSession();

	return session?.user?.role;
};
