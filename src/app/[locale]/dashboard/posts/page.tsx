import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { Shell } from "@/components/shell"

export const metadata = {
  title: "Posts",
}

export default async function PostsPage() {
    const user = await getCurrentUser()

    if (!user) {
      redirect(authOptions?.pages?.signIn || "/login")
    }
  
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
  
    return (
      <Shell>
        <Header heading="Posts" text="Create and manage posts.">
          <PostCreateButton />
        </Header>
        <div>
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
        </div>
      </Shell>
    )
}