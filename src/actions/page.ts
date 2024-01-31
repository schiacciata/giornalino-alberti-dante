'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { pageCreateSchema, pagePatchSchema } from '@/lib/validations/page';

export const newPage = async (formData: FormData) => {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

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
    if (!user) return { error: 'Not authenticated' };

    const page = await db.page.findUnique({
      where: {
        id: pageId,
      },
      select: {
        postId: true,
      }
    });
  
    if (!page) {
      return { error: 'Page not found' };
    }
  
    await db.page.delete({
      where: {
        id: pageId,
      },
    });
  
    revalidatePath(`/blog/${page.postId}`);
    revalidatePath(`/dashboard/posts/${page.postId}`);

    return { success: true };
}

export const editPage = async (pageId: string, formData: any) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

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

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'There was an error.' };
  }
};