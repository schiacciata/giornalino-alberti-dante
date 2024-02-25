import { redirect } from "next/navigation"

import authOptions from "@/lib/auth/config"
import { getCurrentUser } from "@/lib/auth/user"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { Shell } from "@/components/shell"
import { SearchParams } from "@/types"
import { getPosts } from "@/lib/queries/post"
import { PostTable } from "@/components/posts-table/posts-table"

export const metadata = {
  title: "Posts",
}

export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function PostsPage({ searchParams }: IndexPageProps) {
    const user = await getCurrentUser()

    if (!user) {
      redirect(authOptions?.pages?.signIn || "/login")
    }

    const postsPromise = getPosts(searchParams)
  
    return (
      <Shell>
        <Header heading="Posts" text="Create and manage posts.">
          <PostCreateButton />
        </Header>
        <PostTable postPromise={postsPromise}/>
      </Shell>
    )
}
