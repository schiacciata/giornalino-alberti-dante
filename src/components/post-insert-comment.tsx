'use client'

import { FC } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { newComment } from '@/actions/comment'
import { toast } from './ui/use-toast'
import { Post } from '@prisma/client'

interface PostInsertCommentProps {
    post: Pick<Post, 'id'>;
}

const PostInsertComment: FC<PostInsertCommentProps> = ({ post }) => {
    const handleCommentSubmit = async (formData: FormData) => {
        const { error, message } = await newComment(formData);

        if (error) {
            return toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error,
            });
        }

        return toast({
            variant: "default",
            title: "Success!",
            description: message,
        });
    };

    return (<form
        className="mx-auto w-[50%] mt-10 grid gap-y-4 grid-cols-1"
        action={handleCommentSubmit}
    >
        <Label htmlFor="message">Your message</Label>
        <Textarea placeholder="Type your message here." id="content" name='content' />

        <input
            id="postId"
            name="postId"
            value={post.id}
            hidden
            readOnly
        />
        <Button type='submit'>Submit</Button>
    </form>);
}

export default PostInsertComment