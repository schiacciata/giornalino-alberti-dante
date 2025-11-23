import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { clientEnv } from "./client";

export const serverEnv = createEnv({
	extends: [vercel(), clientEnv],
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		SMTP_FROM: z.string().min(1),
		SMTP_SERVER: z.string().min(1),
		SPOTIFY_CLIENT_ID: z.string().min(1),
		SPOTIFY_CLIENT_SECRET: z.string().min(1),
		VAPID_MAILTO: z.string().min(1),
		VAPID_PRIVKEY: z.string().min(1),
		VERCEL_GIT_COMMIT_SHA: z.string().optional(),
		DISCORD_CLIENT_ID: z.string().min(1),
		DISCORD_CLIENT_SECRET: z.string().min(1),
		ADMIN_EMAIL: z.email().optional(),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().min(1),
	},
	experimental__runtimeEnv: process.env,
});

export const env = serverEnv;
