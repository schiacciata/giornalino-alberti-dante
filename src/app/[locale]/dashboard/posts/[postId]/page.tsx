import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth/options"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { Shell } from "@/components/shell"
import { PageCreateButton } from "@/components/page-create-button"
import { PageItem } from "@/components/page-item"

export const metadata = {
  title: "Pages",
}

type PostsPageProps = {
    params: {
        postId: string;
    }
}

export default async function PostsPage({ params }: PostsPageProps) {
    const user = await getCurrentUser()

    if (!user) {
      redirect(authOptions?.pages?.signIn || "/login")
    }

    const post = await db.post.findFirst({
        where: {
            id: params.postId,
        },
        select: {
            id: true,
            title: true,
        }
    });
    if (!post) return notFound();
  
    const pages = await db.page.findMany({
        where: {
            postId: post.id,
        },
        select: {
            id: true,
            number: true,
            updatedAt: true,
            content: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
  
    return (
      <Shell>
        <Header heading={`Pagine di ${post.title}`} text="Create and manage posts.">
            <PageCreateButton postId={post.id} />
        </Header>
        <div>
          {pages?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {pages.map((page) => (
                <PageItem key={page.id} page={page} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="page" />
              <EmptyPlaceholder.Title>No pages created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                This page doesn&apos;t have any pages yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PageCreateButton postId={post.id} variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </Shell>
    )
}