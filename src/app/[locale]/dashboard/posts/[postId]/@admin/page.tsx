import { SearchParams } from "@/types"
import { getPages } from "@/lib/queries/page"
import { PageTable } from "@/components/pages-table/pages-table"

export interface IndexPageProps {
  params: {
      postId: string;
  }
  searchParams: SearchParams
}

export default async function AdminPagesPage({ params, searchParams }: IndexPageProps) {
  
    const pagesPromise = getPages(params.postId, searchParams)
    return (<PageTable pagePromise={pagesPromise}/>);
}
