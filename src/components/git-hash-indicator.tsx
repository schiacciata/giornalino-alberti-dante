import "server-only";

import Link from "next/link";
import type { FC } from "react";
import { buttonVariants } from "@/components/ui/button";
import github from "@/config/github";
import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { env } from "@/lib/env/server";
import { Icon } from "./icons";

type GitHashIndicatorProps = {};

const GitHashIndicator: FC<GitHashIndicatorProps> = async ({}) => {
	const user = await getCurrentUser();
	if (!user || !isAdmin(user)) return;

	const hash = env.VERCEL_GIT_COMMIT_SHA;

	return (
		<center>
			<Link
				href={`https://github.com/${github.repo}/commit/${hash}`}
				className={buttonVariants({ variant: "link", className: "italic" })}
			>
				<Icon icon="github" />
				<kbd>{hash}</kbd>
			</Link>
		</center>
	);
};

export default GitHashIndicator;
