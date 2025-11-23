"use client";

import { ChevronsUpDown } from "lucide-react";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/client";
import { Icons } from "../icons";
import { AlertDialog } from "../ui/alert-dialog";
import { Skeleton } from "../ui/skeleton";
import UserDropdown from "../user/user-dropdown";

type SidebarUserProps = {};

const SidebarUser: FC<SidebarUserProps> = ({}) => {
	const { data, isPending } = authClient.useSession();

	if (isPending || !data) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<AlertDialog>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarFallback className="rounded-lg">
											<Skeleton className="h-12 w-12" />
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col justify-between h-full">
										<Skeleton className="h-3 w-[70px]" />
										<Skeleton className="h-3 w-[120px]" />
									</div>
									<ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
						</DropdownMenu>
					</AlertDialog>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<AlertDialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={data.user.image || ""}
										alt={data.user.name || ""}
									/>
									<AvatarFallback className="rounded-lg">
										{data.user.name?.[0]}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{data.user.name}
									</span>
									<span className="truncate text-xs">{data.user.email}</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<UserDropdown user={data.user} />
					</DropdownMenu>
				</AlertDialog>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default SidebarUser;
