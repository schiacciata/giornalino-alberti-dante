"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"

import {
  deleteSelectedRows,
  PageTableFloatingBarContent,
} from "./actions"
import {
  fetchPageTableColumnDefs,
  filterableColumns,
  searchableColumns,
} from "./columns"
import { Page } from "@prisma/client"

interface PageTableProps {
  pagePromise: Promise<{
    data: Page[];
    pageCount: number;
  }>;
}

export function PageTable({ pagePromise }: PageTableProps) {
  // Learn more about React.use here: https://react.dev/reference/react/use
  const { data, pageCount } = React.use(pagePromise)

  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Page, unknown>[]>(
    () => fetchPageTableColumnDefs(isPending, startTransition),
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
      floatingBarContent={PageTableFloatingBarContent(dataTable)}
      deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  )
}