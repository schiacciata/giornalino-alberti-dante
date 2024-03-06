import { notFound, redirect } from "next/navigation"
import { Page } from "@prisma/client"

import authOptions from "@/lib/auth/config"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { Editor } from "@/components/editor/editor"
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
//export const revalidate = 0;
export const fetchCache = 'force-no-store';

async function getPageForUser(pageId: Page["id"]) {
  noStore();
  return await db.page.findFirst({
    where: {
      id: pageId,
    },
    select: {
      id: true,
      post: true,
      number: true,
      content: true,
    }
  })
}

interface EditorPageProps {
  params: { pageId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  noStore();
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn)
  }

  const page = await getPageForUser(params.pageId)

  if (!page) {
    notFound()
  }

  return (
    <Editor
      page={{
        id: page.id,
        number: page.number,
        content: page.content,
      }}
      post={{
        title: page.post.title,
        id: page.post.id,
      }}
    />
  )
}
