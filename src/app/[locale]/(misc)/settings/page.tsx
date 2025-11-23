import { redirect } from "next/navigation";
import AccountCard from "@/components/account/account-card";
import Social from "@/components/auth/social";
import { Header } from "@/components/header";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { UserUpdateForm } from "@/components/user/user-update-form";
import type { Account } from "@/generated/prisma/client";
import { authPages } from "@/lib/auth/config";
import { getCurrentUser } from "@/lib/auth/user";
import { getScopedI18n } from "@/lib/i18n/server";
import { getAccountsByUserId } from "@/lib/queries/account";
import { cn, wait } from "@/lib/utils";

export const metadata = {
	title: "Settings",
	description: "Manage account and website settings.",
};

export default async function SettingsPage() {
	const settingsT = await getScopedI18n("settings");
	const accountsT = await getScopedI18n("accounts");
	const user = await getCurrentUser();

	if (!user || !user.id) {
		redirect(authPages.signIn);
	}

	const accounts = await getAccountsByUserId(user.id);
	const formattedAccounts: Pick<Account, "provider" | "providerAccountId">[] = (
		accounts || []
	).map((account) => {
		return {
			provider: account.provider,
			providerAccountId: account.providerAccountId,
		};
	});

	const items = [
		{
			title: settingsT("userUpdate.heading"),
			description: settingsT("userUpdate.headingDescription"),
			header: <UserUpdateForm />,
			className: "md:col-span-2",
		},
		{
			title: accountsT("heading"),
			description: accountsT("headingDescription"),
			header: (
				<div className="grid justify-center grid-cols-auto gap-2 w-full">
					{formattedAccounts.map((account) => (
						<AccountCard account={account} key={account.provider} />
					))}
					<Social linkedAccounts={formattedAccounts} />
				</div>
			),
			className: "md:col-span-1",
		},
	];

	return (
		<div>
			<BentoGrid className="mx-auto md:auto-rows-auto h-max">
				{items.map((item, i) => (
					<BentoGridItem
						key={i}
						header={item.header}
						description={item.description}
						title={item.title}
						className={cn("py-4 h-fit", item.className)}
					/>
				))}
			</BentoGrid>
		</div>
	);
}
