'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema, postCreateFormData } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/session'

export const createPost = async (formData: postCreateFormData) => {
    try {
        const user = await getCurrentUser();
        if (!user) return { error: 'Not authenticated' };

        const body = postCreateSchema.parse({
            title: formData.title,
            content: formData.content,
        });
    
        const post = await db.post.create({
            data: {
              title: body.title,
              content: body.content,
              authorId: user.id,
              likes: 0,
            },
            select: {
              id: true,
            },
        })
    
        revalidatePath('/');
        revalidatePath('/dashboard/posts');
        redirect(`/editor/${post.id}`);
    } catch (e) {
        return { error: 'There was an error.' };
    }
}