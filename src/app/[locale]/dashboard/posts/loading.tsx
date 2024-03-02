import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function DashboardLoading() {
  return (
      <div className="divide-border-200 divide-y rounded-md border">
        <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
      </div>
  )
}
