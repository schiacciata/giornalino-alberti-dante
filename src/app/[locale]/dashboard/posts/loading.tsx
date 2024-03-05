import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post/post-create-button"
import { getScopedI18n } from "@/lib/i18n/server"

export default async function DashboardLoading() {
  const t = await getScopedI18n('posts');

  return (
    <>
      <Header heading={t('heading')} text={t('headingDescription')}>
        <PostCreateButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
      </div>
    </>
  )
}
