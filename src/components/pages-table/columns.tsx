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

import { deletePage, editPage } from "@/actions/page"
import { Page } from "@prisma/client"
import { Icon } from "../icons"
import { PageOperations } from "../page/page-operations"
import { cn, formatDate } from "@/lib/utils"
import Link from "next/link"

export function fetchPageTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<Page, unknown>[] {
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
      accessorKey: "number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Numero" />
      ),
      cell: ({ row }) => {
        const page = row.original;

        return (
          <Link href={`/editor/${page.id}`} className="w-[150px]">
            {page.number}
          </Link>
        );
      },
      enableHiding: false,
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
        const page = row.original
   
        return (
          <PageOperations page={{ id: page.id }} />
        )
      },
    },
  ]
}

export const filterableColumns: DataTableFilterableColumn<Page>[] = [
  /*{
    id: "published",
    title: "Status",
    options: page.status.enumValues.map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
  {
    id: "pdfPath",
    title: "Priority",
    options: page.priority.enumValues.map((priority) => ({
      label: priority[0]?.toUpperCase() + priority.slice(1),
      value: priority,
    })),
  },*/
]

export const searchableColumns: DataTableSearchableColumn<Page>[] = []