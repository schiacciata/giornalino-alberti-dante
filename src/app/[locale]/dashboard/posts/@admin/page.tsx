import { SearchParams } from "@/types"
import { getPosts } from "@/lib/queries/post"
import { PostTable } from "@/components/posts-table/posts-table"

export interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function AdminPostsPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;

  const postsPromise = getPosts(searchParams)
  return (<PostTable postPromise={postsPromise}/>);
}
