import { env } from "@/lib/env/server";

const config = {
	debug: env.NODE_ENV !== "production",
	admin: env.ADMIN_EMAIL,
} as const;

export default config;
