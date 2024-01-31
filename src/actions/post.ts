'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema, postCreateFormData, postLikeSchema, postLikeFormData, postPatchSchema } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { notifications } from '@/lib/notifications';
import { isAdmin } from '@/lib/auth/roles';

export const newPost = async (formData: FormData) => {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const data = Object.fromEntries(formData);
    const body = postCreateSchema.parse(data);

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

    return redirect(`/dashboard/posts/${post.id}`);
}

export const likePost = async (formData: postLikeFormData) => {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

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
        },
        select: {
            authorId: true,
            title: true,
        }
    })

    if (body.liked) {
        notifications.sendUserNotification(post.authorId, {
            title: 'Nuovo Like',
            body: `${user.name || 'Qualcuno'} ha messo mi piace al tuo post "${post.title}"!`,
            tag: 'POST_LIKED'
        })
    }
    
    return {
        ...post,
        liked: body.liked
    };
}


export const editPost = async (formData: FormData) => {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const data = Object.fromEntries(formData);
    const body = postPatchSchema.parse(data);

    const protectedFields: (keyof typeof body | string & {})[] = ['pdfPath', 'authorId'];

    if (!body.id) throw new Error('No post id');

    const updatedFields = Object
        .keys(body)
        .filter((k) => protectedFields.includes(k));

    if (updatedFields.length > 0 && !isAdmin(user)) throw new Error('You can\'t modify protected fields');

    const post = await db.post.update({
        data: {
            title: body.title,
            published: body.published,
            pdfPath: body.pdfPath,
            authorId: body.authorId,
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
}

export async function deletePost(postId: string) {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
  
    if (!post) {
      throw new Error('Post not found');
    }
  
    const deletedPost = await db.post.delete({
      where: {
        id: postId,
      },
    });
  
    revalidatePath('/');
    revalidatePath('/dashboard/posts');
    revalidatePath('/blog');
  
    return deletedPost;
}