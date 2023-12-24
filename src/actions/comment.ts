'use server'

import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { notifications } from "@/lib/notifications";
import { commentCreateSchema } from "@/lib/validations/comment";
import { revalidatePath } from "next/cache";

export const newComment = async (formData: FormData) => {
    const createComment = async (formData: FormData) => {
        try {
            const user = await getCurrentUser();
            if (!user) return { error: 'Not authenticated' };

            const data = Object.fromEntries(formData);
            const body = commentCreateSchema.parse(data);
        
            const comment = await db.comment.create({
                data: {
                    authorId: user.id,
                    postId: body.postId,
                    content: body.content,
                },
                select: {
                  post: {
                    select: {
                      id: true,
                      authorId: true,
                      title: true,
                    }
                  },
                },
            })
        
            revalidatePath(`/blog/${comment.post.id}`);

            const maxNotificationContentLenght = 10;
            const notificationContent = 
              body.content.length > maxNotificationContentLenght
              ? `${body.content.slice(0, maxNotificationContentLenght)}...`
              : body.content;

            notifications.sendUserNotification(comment.post.authorId, {
              title: `Nuovo commento su ${comment.post.title}`,
              body: `${user.name}: "${notificationContent}"`
            })

            return { message: 'Successfully posted comment', };
        } catch (e) {
            console.log(e)
            return { error: 'There was an error.' };
        }
    };
    
    return await createComment(formData);
}



export async function deleteComment(commentId: string) {
    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        postId: true,
        authorId: true,
      }
    });
  
    if (!comment) {
      return { error: 'Comment not found' };
    }
  
    if (user.id !== comment.authorId && !isAdmin(user)) {
      return { error: 'Can\'t delete other user\'s comment' };
    }
  
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
  
    revalidatePath(`/blog/${comment.postId}`);
    revalidatePath(`/dashboard/posts/${comment.postId}`);

    return { message: 'Comment successfully deleted' };
}