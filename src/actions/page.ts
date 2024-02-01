'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { pageCreateSchema, pagePatchSchema } from '@/lib/validations/page';

export const newPage = async (formData: FormData) => {
    const user = await getCurrentUser();
    if (!user) return Promise.reject('Not authenticated');

    const data = Object.fromEntries(formData);
    const body = pageCreateSchema.parse(data);

    const page = await db.page.create({
        data: {
          number: body.number,
          content: body.content,
          postId: body.postId,
        },
        select: {
          id: true,
          postId: true,
        },
    })

    revalidatePath(`/blog/${page.postId}`);
    return redirect(`/editor/${page.id}`);
}

export async function deletePage(pageId: string) {
    const user = await getCurrentUser();
    if (!user) return Promise.reject('Not authenticated');

    const page = await db.page.findUnique({
      where: {
        id: pageId,
      },
      select: {
        postId: true,
      }
    });
  
    if (!page) {
      return Promise.reject('Page not found');
    }
  
    const deletedPage = await db.page.delete({
      where: {
        id: pageId,
      },
      select: {
        number: true,
      }
    });
  
    revalidatePath(`/blog/${page.postId}`);
    revalidatePath(`/dashboard/posts/${page.postId}`);

    return deletedPage;
}

export const editPage = async (pageId: string, formData: any) => {
  const user = await getCurrentUser();
  if (!user) return Promise.reject('Not authenticated');

  const body = pagePatchSchema.parse(formData);

  const page = await db.page.update({
    where: {
      id: pageId,
    },
    data: {
      number: body.number,
      content: body.content,
    },
    select: {
      postId: true,
    },
  });

  revalidatePath(`/blog/${page.postId}`);
  revalidatePath(`/dashboard/posts/${page.postId}`);

  return page;
};