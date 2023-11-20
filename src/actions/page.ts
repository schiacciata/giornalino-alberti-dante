'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { pageCreateSchema } from '@/lib/validations/page';

export const newPage = async (formData: FormData) => {
    const createPage = async (formData: FormData) => {
        try {
            const user = await getCurrentUser();
            if (!user) return { error: 'Not authenticated' };

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

            return page;
        } catch (e) {
            console.log(e)
            return { error: 'There was an error.' };
        }
    };
    
    const page = await createPage(formData);
    if ("error" in page) return page;

    return redirect(`/editor/${page.id}`);
}