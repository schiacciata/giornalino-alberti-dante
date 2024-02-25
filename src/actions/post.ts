'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { postCreateSchema, postLikeSchema, postLikeFormData, postPatchSchema } from "@/lib/validations/post"
import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { notifications } from '@/lib/notifications';
import { isAdmin } from '@/lib/auth/roles';
import { uploadToGithub } from '@/lib/files';
import { deleteFromGithub } from '@/lib/files';

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
    const user = await getCurrentUser();
    if (!user) return Promise.reject('Not authenticated');

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
    if (!user) return Promise.reject('Not authenticated');

    const data = Object.fromEntries(formData);
    const body = postPatchSchema.parse(data);

    if (!body.id) return Promise.reject('No post id');
    body.pdfFile = (body.pdfFile?.size || 0) > 0 ? body.pdfFile : undefined;

    const protectedFields: (keyof typeof body | string & {})[] = ['pdfPath', 'authorId'];
    const updatedFields = Object
        .keys(body)
        .filter((k) => protectedFields.includes(k));

    if (updatedFields.length > 0 && !isAdmin(user)) return Promise.reject('You can\'t modify protected fields');
    const pdfPath = body.pdfPath || (body.pdfFile.name ? `/pdfs/${body.pdfFile.name}` : undefined);

    const uploadOK = (body.pdfFile && pdfPath) ? await uploadToGithub({
        path: `public${pdfPath}`,
        content: await body.pdfFile.text(),
    }) : true;

    if (!uploadOK) return Promise.reject('Could not upload pdf file');

    const post = await db.post.update({
        data: {
            title: body.title,
            published: body.published,
            pdfPath: pdfPath,
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

    return post;
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