"use client"

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"
import { type ColumnDef } from "@tanstack/react-table"
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

import { deletePost, editPost } from "@/actions/post"
import { Post } from "@prisma/client"
import { Icon } from "../icons"
import { PostOperations } from "../post-operations"
import { cn, formatDate } from "@/lib/utils"

export function fetchPostTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<Post, unknown>[] {
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
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Post" />
      ),
      cell: ({ row }) => <div className="w-[150px]">{row.getValue("title")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "published",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pubblicato" />
      ),
      cell: ({ row }) => {
        const bool = row.getValue('published');

        return (
          <div className="flex w-[100px] items-center">
            <Icon
                icon={bool ? `check` : 'cross'}
                className={cn("mr-2 size-4 text-muted-foreground", bool ? 'text-green-500' : 'text-red-500')}
                aria-hidden="true"
            />
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return typeof value === "boolean" && value === row.getValue(id)
      },
    },
    {
      accessorKey: "pdfPath",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PDF ?" />
      ),
      cell: ({ row }) => {
        const bool = row.getValue('pdfPath');

        return (
            <div className="flex w-[100px] items-center">
            <Icon
                icon={bool ? `check` : 'cross'}
                className={cn("mr-2 size-4 text-muted-foreground", bool ? 'text-green-500' : 'text-red-500')}
                aria-hidden="true"
            />
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return typeof value === "boolean" && value === row.getValue(id)
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ultimo aggiornamento" />
      ),
      cell: ({ row }) => <div className="w-[150px]">{formatDate(row.getValue("updatedAt"))}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original
   
        return (
          <PostOperations post={{ id: post.id, title: post.title }} />
        )
      },
    },
  ]
}

export const filterableColumns: DataTableFilterableColumn<Post>[] = [
  /*{
    id: "published",
    title: "Status",
    options: post.status.enumValues.map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
  {
    id: "pdfPath",
    title: "Priority",
    options: post.priority.enumValues.map((priority) => ({
      label: priority[0]?.toUpperCase() + priority.slice(1),
      value: priority,
    })),
  },*/
]

export const searchableColumns: DataTableSearchableColumn<Post>[] = [
  {
    id: "title",
    title: "title",
  },
]