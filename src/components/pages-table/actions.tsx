import * as React from "react"
import { unstable_noStore as noStore } from "next/cache"
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
  deletePage,
  editPage,
} from "@/actions/page"
import { Page } from "@prisma/client"
import { Icon } from "../icons"

export function deleteSelectedRows(
  table: Table<Page>,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  event?.preventDefault()
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: Page
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        deletePage(row.original.id)
      )
    ),
    {
      loading: "Deleting...",
      success: () => {
        return "Page deleted successfully."
      },
      error: (err: unknown) => {
        return catchError(err)
      },
    }
  )
}

export function updatePageStatus(table: Table<Page>, status: string) {
  /*const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: Page
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        editPage({
          id: row.original.id,
          status: status as Page["status"],
        })
      )
    ),
    {
      loading: "Updating...",
      success: () => {
        return "Page updated successfully."
      },
      error: (err: unknown) => {
        return catchError(err)
      },
    }
  )*/
}

export function updatePagePriority(table: Table<Page>, priority: string) {
/*const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: Page
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
      editPage({
          id: row.original.id,
          priority: priority as Page["priority"],
        })
      )
    ),
    {
      loading: "Updating...",
      success: () => {
        return "Page updated successfully."
      },
      error: (err: unknown) => {
        return catchError(err)
      },
    }
  )*/
}

/*
    <Select onValueChange={(value) => updatePageStatus(table, value)}>
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
            {page.status.enumValues.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updatePagePriority(table, value)}>
        <SelectTrigger asChild>
          <Button
            title="Priority"
            variant="ghost"
            size="icon"
            className="size-7 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <ArrowUpIcon className="size-4" aria-hidden="true" />
          </Button>
        </SelectTrigger>
        <SelectContent align="center">
          <SelectGroup>
            {page.priority.enumValues.map((priority) => (
              <SelectItem
                key={priority}
                value={priority}
                className="capitalize"
              >
                {priority}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
*/

export function PageTableFloatingBarContent(table: Table<Page>) {
  return (
    <div className="justify-between gap-2 align-middle">
      <Button
        title="Delete"
        variant="destructive"
        size="icon"
        className="size-7"
        onClick={(event) => {
          table.toggleAllPageRowsSelected(false)
          deleteSelectedRows?.(table, event)
        }}
      >
        <Icon icon="trash" className="size-4" aria-hidden="true" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}