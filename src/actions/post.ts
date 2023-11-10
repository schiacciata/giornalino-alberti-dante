'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/session'

export const createPost = async (formData: FormData) => {
    try {
        const user = await getCurrentUser();
        if (!user) return { message: 'Not authenticated' };

        const body = postCreateSchema.parse({
            title: formData.get('title') || "Untitled Post",
            content: formData.get('content'),
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

        return { success: true, message: 'Post create successfully' };
    } catch (e) {
        return { message: 'There was an error.' };
    }
}