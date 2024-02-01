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
import { isAdmin } from "@/lib/auth/roles"
import { ReactElement } from "react"
import { getPages } from "@/lib/queries"
import { SearchParams } from "@/types"
import { PageTable } from "@/components/pages-table/pages-table"

export const metadata = {
  title: "Pages",
}

type PostsPageProps = {
    params: {
        postId: string;
    }
    searchParams: SearchParams;
}

export default async function PostsPage({ params, searchParams }: PostsPageProps) {
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
            authorId: true,
        }
    });
    if (!post) return notFound();

    const users = await db.user.findMany({
      where: {
        OR: [
          {
            role: 'ADMIN',
          },
          {
            role: 'EDITOR',
          },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    const getPagesComponent = async (): Promise<ReactElement> => {
      if (post.pdfPath) {
        return (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="page" />
            <EmptyPlaceholder.Title>Post con pdf</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Questo post ha un file pdf impostato
            </EmptyPlaceholder.Description>
            <Link className={buttonVariants({ variant: 'outline' })} href={post.pdfPath} target="_blank" download={true}>
              <Icon icon="download"/>
              Scarica
            </Link>
          </EmptyPlaceholder>
        );
      }

      if (isAdmin(user)) {
        const pagesPromise = getPages(post.id, searchParams);
        return (<PageTable pagePromise={pagesPromise}/>);
      }

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
      });

      if (pages.length === 0) {
        return (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="page" />
            <EmptyPlaceholder.Title>No pages created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              This page doesn&apos;t have any pages yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PageCreateButton postId={post.id} variant="outline" />
          </EmptyPlaceholder>
        );
      }

      return (
        <div className="divide-y divide-border rounded-md border">
          {pages.map((page) => (
            <PageItem key={page.id} page={page} />
          ))}
        </div>
      );
    }
  
    return (
      <Shell>
        <Header heading={`Pagine di "${post.title}" ${post.published ? '🌐' : '🔐'}`} text="Create and manage posts.">
            <PostEditDialog
              post={{ id: post.id, title: post.title, published: post.published, pdfPath: post.pdfPath, authorId: post.authorId }}
              users={users}
              />
            {!post.pdfPath && (<PageCreateButton postId={post.id} />)}
        </Header>
        <div>
          {await getPagesComponent()}
        </div>
      </Shell>
    )
}