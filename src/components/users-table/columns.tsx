"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { Link } from "next-view-transitions";
import * as React from "react";
import { toast } from "sonner";
import { deleteUser, updateUserRole } from "@/actions/user";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role, type User } from "@/generated/prisma/client";
import { catchError } from "@/lib/catch-error";
import type {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@/types";
import { Icon } from "../icons";
import UserBadge from "../user/user-badge";

export function fetchUsersTableColumnDefs(): ColumnDef<User, unknown>[] {
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => {
						table.toggleAllPageRowsSelected(!!value);
					}}
					aria-label="Select all"
					className="translate-y-[2px]"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => {
						row.toggleSelected(!!value);
					}}
					aria-label="Select row"
					className="translate-y-[2px]"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			cell: ({ row }) => (
				<Link href={`/dashboard/users/${row.original.id}`}>
					{row.getValue("name")}
				</Link>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "role",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Role" />
			),
			cell: ({ row }) => {
				const role = Object.values(Role).find(
					(role) => role === row.original.role,
				);

				return (
					<div className="flex space-x-2">
						{role && <UserBadge user={{ role }} />}
					</div>
				);
			},
		},
		{
			accessorKey: "email",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Email" />
			),
			cell: ({ row }) => <div>{row.getValue("email")}</div>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			id: "actions",
			cell: ({ row }) => <ActionsCell row={row} />,
		},
	];
}

function ActionsCell({ row }: { row: Row<User> }) {
	const [isUpdatePending, startUpdateTransition] = React.useTransition();
	const [isDeletePending, startDeleteTransition] = React.useTransition();

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						aria-label="Open menu"
						variant="ghost"
						className="flex size-8 p-0 data-[state=open]:bg-muted"
					>
						<Ellipsis className="size-4" aria-hidden="true" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DropdownMenuItem asChild>
						<Link href={`/dashboard/users/${row.original.id}`}>
							<Icon icon="edit" />
							Edit
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Roles</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuRadioGroup
								value={row.original.role}
								onValueChange={(value) => {
									startUpdateTransition(() => {
										toast.promise(
											updateUserRole({
												id: row.original.id,
												role: value as User["role"],
											}),
											{
												loading: "Updating...",
												success: "Role updated",
												error: (err) => catchError(err),
											},
										);
									});
								}}
							>
								{Object.values(Role).map((role) => (
									<DropdownMenuRadioItem
										key={role}
										value={role}
										className="capitalize"
										disabled={isUpdatePending}
									>
										{role}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem>
							Delete
							<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
					<Button
						size="sm"
						onClick={() => {
							startDeleteTransition(() => {
								row.toggleSelected(false);

								toast.promise(deleteUser(row.original.id), {
									loading: "Deleting...",
									success: () => "User deleted",
									error: (err: unknown) => catchError(err),
								});
							});
						}}
						disabled={isDeletePending}
					>
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export const filterableColumns: DataTableFilterableColumn<User>[] = [
	{
		id: "role",
		title: "Role",
		options: Object.values(Role).map((role) => ({
			label: role[0]?.toUpperCase() + role.slice(1),
			value: role,
		})),
	},
];

export const searchableColumns: DataTableSearchableColumn<User>[] = [
	{
		id: "name",
		title: "name",
	},
	{
		id: "email",
		title: "email",
	},
];
