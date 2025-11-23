import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
	client: {
		NEXT_PUBLIC_APP_URL: z.string().min(1),
		NEXT_PUBLIC_GITHUB_REPO_TOKEN: z.string().min(1),
		NEXT_PUBLIC_VAPID_PUBKEY: z.string().min(1),
	},
	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_GITHUB_REPO_TOKEN: process.env.NEXT_PUBLIC_GITHUB_REPO_TOKEN,
		NEXT_PUBLIC_VAPID_PUBKEY: process.env.NEXT_PUBLIC_VAPID_PUBKEY,
	},
});

export const env = clientEnv;
