'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema, postCreateFormData, postLikeSchema, postLikeFormData, postPatchSchema } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { notifications } from '@/lib/notifications';

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

    return redirect(`/dashboard/posts/${post.id}`);
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

            if (body.liked) {
                notifications.sendUserNotification(post.authorId, {
                    title: 'Nuovo Like',
                    body: `${user.name || 'Qualcuno'} ha messo mi piace al tuo post!`,
                    tag: 'POST_LIKED'
                })
            }

            return { liked: post.likesUserIDs.some(userId => userId === user.id) };
        } catch (e) {
            return { error: 'There was an error.' };
        }
    };
    
    const post = await updatePost(formData);
    if ("error" in post && post.error) return post;

    return { message: `Successfully ${post.liked ? 'liked' : 'disliked'} post` };
}


export const editPost = async (formData: FormData) => {
    const update = async (formData: FormData) => {
        try {
            const user = await getCurrentUser();
            if (!user) return { error: 'Not authenticated' };

            const data = Object.fromEntries(formData);
            const body = postPatchSchema.parse(data);
            if (!body.id) return { error: 'No post id' }
        
            const post = await db.post.update({
                data: {
                  title: body.title,
                  published: body.published,
                },
                where: {
                    id: body.id
                }
            });

            if (body.published) {
                notifications.sendEveryoneNotification({
                    title: 'Nuovo post pubblicato',
                    body: `Leggi ora ${post.title}`,
                    tag: 'POST_PUBLISHED'
                });
            }
        
            revalidatePath('/');
            revalidatePath('/dashboard/posts');
            revalidatePath('/blog');
            revalidatePath(`/blog/${post.id}`);

            return post;
        } catch (e) {
            return { error: 'There was an error.' };
        }
    };
    
    const post = await update(formData);
    if ("error" in post) return post;

    return { message: 'Updated post' };
}
