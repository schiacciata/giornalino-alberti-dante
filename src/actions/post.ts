'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema, postLikeSchema, postLikeFormData, postPatchSchema } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { notifications } from '@/lib/notifications';
import { isAdmin } from '@/lib/auth/roles';
import { deleteFromGithub } from '@/lib/files';
import { getI18n } from '@/lib/i18n/server';

export const newPost = async (formData: FormData) => {
    const user = await getCurrentUser();
    if (!user || !user.id) return Promise.reject('Not authenticated');

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
    const t = await getI18n();
    const user = await getCurrentUser();
    if (!user) return { error: t('errors.unauthenticated') };

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
    
    return { success: body.liked ? t('likes.successLiked') : t('likes.successUnliked') };
}

export const editPost = async (formData: FormData) => {
    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const data = Object.fromEntries(formData);
    const body = postPatchSchema.parse(data);

    if (!body.id) return { error: 'No post id' };
    
    const protectedFields: (keyof typeof body | string & {})[] = ['authorId'];
    const updatedFields = Object
        .keys(body)
        .filter((k) => protectedFields.includes(k));

    if (updatedFields.length > 0 && !isAdmin(user)) return { error: 'You can\'t edit protected fields' };

    const post = await db.post.update({
        data: {
            title: body.title,
            published: body.published,
            pdfPath: body.pdfPath,
            authorId: body.authorId,
        },
        where: {
            id: body.id
        },
        select: {
            title: true,
            id: true,
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

    return { success: `${data.title} è stato modificato` };
}

export async function deletePost(postId: string) {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        pdfPath: true,
      }
    });
  
    if (!post) {
      return Promise.reject('Post not found');
    }

    if (post.pdfPath) {
        const deletedOK = await deleteFromGithub({
            path: `public${post.pdfPath}`,
        });
    
        if (!deletedOK) return Promise.reject('Could not delete pdf file');
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

export async function deletePostPDF(postId: string) {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        pdfPath: true,
        title: true,
      }
    });
  
    if (!post) {
      return Promise.reject('Post not found');
    }

    if (!post.pdfPath) return Promise.reject(`Post ${post.title} does not have a pdf`);
  
    const deletedOK = await deleteFromGithub({
        path: `public${post.pdfPath}`,
    });

    if (!deletedOK) return Promise.reject('Could not delete pdf file');
  
    const updatedPost = await db.post.update({
        data: {
            pdfPath: null,
        },
        where: {
            id: postId,
        }
    });

    revalidatePath('/');
    revalidatePath('/dashboard/posts');
    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.id}`);

    return post;
}