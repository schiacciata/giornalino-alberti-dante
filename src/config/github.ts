import { env } from "@/lib/env/client";

const githubConfig = {
	repo: "schiacciata/next-blog",
	token: env.NEXT_PUBLIC_GITHUB_REPO_TOKEN,
	email: "62028267+47PADO47@users.noreply.github.com",
} as const;

export default githubConfig;
