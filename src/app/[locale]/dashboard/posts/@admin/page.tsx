import { SearchParams } from "@/types"
import { getPosts } from "@/lib/queries/post"
import { PostTable } from "@/components/posts-table/posts-table"

export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function AdminPostsPage({ searchParams }: IndexPageProps) {
  
    const postsPromise = getPosts(searchParams)
    return (<PostTable postPromise={postsPromise}/>);
}
