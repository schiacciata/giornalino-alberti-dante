"use client";

import { AlertDialog } from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/generated/prisma/client";
import { useServiceWorker } from "@/lib/providers/sw";
import { NotificationsDialog } from "../notifications-dialog";
import { UserAvatar } from "./user-avatar";
import UserDropdown from "./user-dropdown";

type UserDialogProps = {
	user: User;
};

export function UserDialog({ user }: UserDialogProps) {
	const sw = useServiceWorker();

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar user={user} className="rounded-2xl" />
				</DropdownMenuTrigger>
				<UserDropdown user={user} />
			</DropdownMenu>
			{sw ? <NotificationsDialog sw={sw} /> : null}
		</AlertDialog>
	);
}
