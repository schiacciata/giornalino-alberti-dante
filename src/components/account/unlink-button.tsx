"use client";

import type { FC } from "react";
import { toast } from "sonner";
import { deleteAccountByProviderID } from "@/actions/account";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Account } from "@/generated/prisma/client";

interface UnlinkButtonProps {
	account: Pick<Account, "providerId">;
}

const UnlinkButton: FC<UnlinkButtonProps> = ({ account }) => {
	const handleCommentDelete = async () => {
		toast.promise(deleteAccountByProviderID(account.providerId), {
			loading: "Loading...",
			success: (data) => {
				return data.message;
			},
			error: (error) => {
				return error.message;
			},
		});
	};

	return (
		<form action={handleCommentDelete}>
			<Button variant="destructive">
				<Icon icon="unlink" className="mr-0" />
			</Button>
		</form>
	);
};

export default UnlinkButton;
