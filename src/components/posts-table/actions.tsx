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
  deletePost,
  editPost,
} from "@/actions/post"
import { Post } from "@prisma/client"
import { Icon } from "../icons"

export function deleteSelectedRows(
  table: Table<Post>,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  event?.preventDefault()
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: Post
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        deletePost(row.original.id)
      )
    ),
    {
      loading: "Deleting...",
      success: () => {
        return "Post deleted successfully."
      },
      error: (err: unknown) => {
        return catchError(err)
      },
    }
  )
}

export function updatePostStatus(table: Table<Post>, status: string) {
  /*const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: Post
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
        editPost({
          id: row.original.id,
          status: status as Post["status"],
        })
      )
    ),
    {
      loading: "Updating...",
      success: () => {
        return "Post updated successfully."
      },
      error: (err: unknown) => {
        return catchError(err)
      },
    }
  )*/
}

export function updatePostPriority(table: Table<Post>, priority: string) {
/*const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: Post
  }[]

  noStore()
  toast.promise(
    Promise.all(
      selectedRows.map(async (row) =>
      editPost({
          id: row.original.id,
          priority: priority as Post["priority"],
        })
      )
    ),
    {
      loading: "Updating...",
      success: () => {
        return "Post updated successfully."
      },
      error: (err: unknown) => {
        return catchError(err)
      },
    }
  )*/
}

/*
    <Select onValueChange={(value) => updatePostStatus(table, value)}>
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
            {post.status.enumValues.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updatePostPriority(table, value)}>
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
            {post.priority.enumValues.map((priority) => (
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

export function PostTableFloatingBarContent(table: Table<Post>) {
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