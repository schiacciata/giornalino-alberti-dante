'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema, postCreateFormData, postLikeSchema, postLikeFormData } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/session'

export const newPost = async (formData: postCreateFormData) => {
    const createPost = async (formData: postCreateFormData) => {
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
                },
                select: {
                  id: true,
                },
            })
        
            revalidatePath('/');
            revalidatePath('/dashboard/posts');
            revalidatePath('/blog');

            return post;
        } catch (e) {
            return { error: 'There was an error.' };
        }
    };
    
    const post = await createPost(formData);
    if ("error" in post) return post;

    return redirect(`/editor/${post.id}`);
}

export const likePost = async (formData: postLikeFormData) => {
    const updatePost = async (formData: postLikeFormData) => {
        try {
            const user = await getCurrentUser();
            if (!user) return { error: 'Not authenticated' };
    
            const body = postLikeSchema.parse({
                id: formData.id,
                liked: formData.liked,
            });
        
            const post = await db.post.update({
                where: {
                    id: body.id,
                },
                data: {
                    likes: {
                        [body.liked ? 'connect' : 'disconnect']: { id: user.id }
                    }
                }
            })

            return { liked: post.likesUserIDs.some(userId => userId === user.id) };
        } catch (e) {
            return { error: 'There was an error.' };
        }
    };
    
    const post = await updatePost(formData);
    if ("error" in post && post.error) return post;

    return { message: `Successfully ${post.liked ? 'liked' : 'disliked'} post` };
}