import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Header } from "@/components/header"
import { getScopedI18n } from "@/lib/i18n/server"

export default async function DashboardLoading() {
  const t = await getScopedI18n('users');

  return (
    <>
      <Header heading={t('heading')} text={t('headingDescription')}>
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
      </div>
    </>
  )
}
