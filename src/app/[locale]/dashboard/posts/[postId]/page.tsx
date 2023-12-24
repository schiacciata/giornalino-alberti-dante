import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth/options"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { PageCreateButton } from "@/components/page-create-button"
import { PageItem } from "@/components/page-item"
import { PostEditDialog } from "@/components/post-edit-dialog"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"

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
            published: true,
            pdfPath: true,
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
        <Header heading={`Pagine di "${post.title}" ${post.published ? '🌐' : '🔐'}`} text="Create and manage posts.">
            <PostEditDialog post={{ id: post.id, title: post.title, published: post.published, pdfPath: post.pdfPath }} />
            {!post.pdfPath && (<PageCreateButton postId={post.id} />)}
        </Header>
        <div>
          {pages?.length || post.pdfPath ? (
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

          {post.pdfPath && (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="page" />
              <EmptyPlaceholder.Title>Post con pdf</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Questo post ha un file pdf impostato
              </EmptyPlaceholder.Description>
              <Link className={buttonVariants({ variant: 'outline' })} href={post.pdfPath} target="_blank">
                <Icon icon="download"/>
                Scarica
              </Link>
            </EmptyPlaceholder>
          )}
        </div>
      </Shell>
    )
}