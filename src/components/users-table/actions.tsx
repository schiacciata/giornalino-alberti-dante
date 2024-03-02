import * as React from "react"
import { unstable_noStore as noStore } from "next/cache"
import { ArrowUpIcon, CheckCircledIcon, TrashIcon } from "@radix-ui/react-icons"
import { SelectTrigger } from "@radix-ui/react-select"
import { type Table } from "@tanstack/react-table"
import { toast } from "sonner"
import { catchError } from "@/lib/catch-error"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"

import {
  deleteUser,
  updateUserRole,
} from "@/actions/user"
import { Role, User } from "@prisma/client"

export function deleteSelectedRowsAction({
  table,
  event,
}: {
  table: Table<User>
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
}) {
  event?.preventDefault()
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: User
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        deleteUser(row.original.id),
      )
    ),
    {
      loading: "Deleting...",
      success: "User deleted",
      error: (err) => catchError(err),
    }
  )
}

export function updateUserRoleAction({
  table,
  role,
}: {
  table: Table<User>
  role: string
}) {
  const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: User
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        updateUserRole({
          id: row.original.id,
          role: role as User["role"],
        })
      )
    ),
    {
      loading: "Updating...",
      success: "User updated",
      error: (err) => catchError(err),
    }
  )
}

export function UserTableFloatingBarContent(table: Table<User>) {
  return (
    <div className="justify-between gap-2 align-middle">
      <Select
        onValueChange={(value) => updateUserRoleAction({ table, role: value })}
      >
        <SelectTrigger asChild>
          <Button
            aria-label="Delete selected rows"
            title="Status"
            variant="ghost"
            size="icon"
            className="size-7 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <CheckCircledIcon className="size-4" aria-hidden="true" />
          </Button>
        </SelectTrigger>
        <SelectContent align="center">
          <SelectGroup>
            {Object.values(Role).map((role) => (
              <SelectItem key={role} value={role} className="capitalize">
                {role}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        title="Delete"
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={(event) => {
          table.toggleAllPageRowsSelected(false)
          deleteSelectedRowsAction?.({ table, event })
        }}
      >
        <TrashIcon className="size-4" aria-hidden="true" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}