"use client";

import type { Account } from "@prisma/client";
import type { FC } from "react";
import { Icon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { cn, toPascalCase } from "@/lib/utils";

interface SocialProps {
	linkedAccounts?: Pick<Account, "provider" | "providerAccountId">[];
	className?: string;
}

const Social: FC<SocialProps> = ({ linkedAccounts, className }) => {
	const socialsProviders = ["google", "spotify", "discord"] as const;
	const filteredProviders = socialsProviders.filter(
		(p) => !linkedAccounts?.find((l) => l.provider === p),
	);

	return (
		<>
			{filteredProviders.map((provider) => (
				<button
					type="button"
					className={cn(
						buttonVariants({ variant: "outline", className: className }),
					)}
					onClick={() => {
						authClient.signIn.social({
							provider,
						});
					}}
					key={provider}
				>
					<Icon icon={provider} />
					{toPascalCase(provider)}
				</button>
			))}
		</>
	);
};

export default Social;
