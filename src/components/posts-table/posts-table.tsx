"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"

import {
  deleteSelectedRows,
  PostTableFloatingBarContent,
} from "./actions"
import {
  fetchPostTableColumnDefs,
  filterableColumns,
  searchableColumns,
} from "./columns"
import { Post } from "@prisma/client"

interface PostTableProps {
  postPromise: Promise<{
    data: Post[];
    pageCount: number;
  }>;
}

export function PostTable({ postPromise }: PostTableProps) {
  // Learn more about React.use here: https://react.dev/reference/react/use
  const { data, pageCount } = React.use(postPromise)

  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Post, unknown>[]>(
    () => fetchPostTableColumnDefs(isPending, startTransition),
    [isPending]
  )

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  })

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
      floatingBarContent={PostTableFloatingBarContent(dataTable)}
      deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  )
}