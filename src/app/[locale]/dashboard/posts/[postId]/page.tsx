import { notFound, redirect } from "next/navigation"

import authOptions from "@/lib/auth/config"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { Shell } from "@/components/dashboard/shell"
import { PageCreateButton } from "@/components/page/page-create-button"
import { PostEditDialog } from "@/components/post/post-edit-dialog"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { isAdmin } from "@/lib/auth/roles"
import { ReactElement } from "react"
import { getPages } from "@/lib/queries/page"
import { SearchParams } from "@/types"
import { PageTable } from "@/components/pages-table/pages-table"
import { cn, formatDate } from "@/lib/utils"
import { getCurrentLocale, getI18n } from "@/lib/i18n/server"

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
  const user = await getCurrentUser();
  const locale = await getCurrentLocale();
  const t = await getI18n();

  if (!user) {
    redirect(authOptions?.pages?.signIn)
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
      updatedAt: true,
    },
  });

  if (!post) return notFound();

  const users = isAdmin(user) ? await db.user.findMany({
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
      image: true,
    }
  }) : [];

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
            <Icon icon="download" />
            Scarica
          </Link>
        </EmptyPlaceholder>
      );
    }

    const pagesPromise = getPages(post.id, searchParams);
    return (<PageTable pagePromise={pagesPromise} />);
  }

  return (
    <>
      <Header heading={
        <h1>
          Pagine di &quot;{post.title}&quot; <Icon
            className={cn(
              "inline-flex h-6 w-6",
              post.published ? 'text-sky-400' : 'text-yellow-400',
            )}
            icon={post.published ? 'public' : 'private'}
          />
        </h1>
      } text={t('updatedAt', {
        updatedAt: post.updatedAt.toLocaleString(locale),
      })}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <PostEditDialog
            post={{ id: post.id, title: post.title, published: post.published, pdfPath: post.pdfPath, authorId: post.authorId }}
            users={users}
          />
          {!post.pdfPath && (<PageCreateButton postId={post.id} />)}
        </div>
      </Header>
      <div>
        {await getPagesComponent()}
      </div>
    </>
  )
}