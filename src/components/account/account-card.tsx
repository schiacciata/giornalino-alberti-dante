import type { FC } from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Account } from "@/generated/prisma/client";
import { toPascalCase } from "@/lib/utils";
import { Icon } from "../icons";
import UnlinkButton from "./unlink-button";

interface AccountCardProps {
	account: Pick<Account, "providerId" | "accountId">;
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
	return (
		<Card className="w-fit">
			<CardHeader>
				<div className="flex items-center justify-between mb-2 mr-2">
					<CardTitle className="space-between">
						<Icon className="inline-flex" icon={account.providerId} />
						{toPascalCase(account.providerId)}
					</CardTitle>
					<UnlinkButton account={{ provider: account.providerId }} />
				</div>
				<CardDescription>{account.accountId}</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default AccountCard;
