import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth/options"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { Shell } from "@/components/shell"
import { SearchParams } from "@/types"
import { getPosts } from "@/lib/queries"
import { PostTable } from "@/components/posts-table"

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
    const posts = [];
  
    /*const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
        pdfPath: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })*/


    /*
    {posts?.length ? (
            <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
          )}
             */
  
    return (
      <Shell>
        <Header heading="Posts" text="Create and manage posts.">
          <PostCreateButton />
        </Header>
        <div>
          <PostTable postPromise={postsPromise}/>
        </div>
      </Shell>
    )
}
