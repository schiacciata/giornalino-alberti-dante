"use client"

import * as React from "react"
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { catchError } from "@/lib/catch-error"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import { deleteUser, updateUserRole } from "@/actions/user"
import { Role, User } from "@prisma/client"
import UserBadge from "../user-badge"

export function fetchUsersTableColumnDefs(): ColumnDef<User, unknown>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
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
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const role = Object.values(Role).find(
          (role) => role === row.original.role
        )

        return (
          <div className="flex space-x-2">
            {role && <UserBadge user={{ role }} />}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("email")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

function ActionsCell({ row }: { row: Row<User> }) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  const [isDeletePending, startDeleteTransition] = React.useTransition()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open menu"
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
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
                      success: "Label updated",
                      error: (err) => catchError(err),
                    }
                  )
                })
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
        <DropdownMenuItem
          onClick={() => {
            startDeleteTransition(() => {
              row.toggleSelected(false)

              toast.promise(
                deleteUser(row.original.id),
                {
                  loading: "Deleting...",
                  success: () => "User deleted",
                  error: (err: unknown) => catchError(err),
                }
              )
            })
          }}
          disabled={isDeletePending}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
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
]

export const searchableColumns: DataTableSearchableColumn<User>[] = [
  {
    id: "name",
    title: "name",
  },
  {
    id: "email",
    title: "email",
  },
]