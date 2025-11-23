import { SearchParams } from "@/types"
import { getPages } from "@/lib/queries/page"
import { PageTable } from "@/components/pages-table/pages-table"

export interface IndexPageProps {
  params: Promise<{
      postId: string;
  }>
  searchParams: Promise<SearchParams>
}

export default async function AdminPagesPage(props: IndexPageProps) {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const pagesPromise = getPages(params.postId, searchParams)
    return (<PageTable pagePromise={pagesPromise}/>);
}
