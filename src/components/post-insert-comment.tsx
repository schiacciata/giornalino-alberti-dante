'use client'

import { FC } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { newComment } from '@/actions/comment'
import { toast } from './ui/use-toast'
import { Post } from '@prisma/client'
import { useI18n, useScopedI18n } from '@/lib/i18n/client'

interface PostInsertCommentProps {
    post: Pick<Post, 'id'>;
}

const PostInsertComment: FC<PostInsertCommentProps> = ({ post }) => {
    const t = useI18n();
    const scopedT = useScopedI18n('comments');

    const handleCommentSubmit = async (formData: FormData) => {
        const { error, message } = await newComment(formData);

        if (error) {
            return toast({
                variant: "destructive",
                title: t('errors.general'),
                description: error,
            });
        }

        return toast({
            variant: "default",
            title: t('success'),
            description: message,
        });
    };

    return (<form
        className="mx-auto w-[50%] mt-10 grid gap-y-4 grid-cols-1"
        action={handleCommentSubmit}
    >
        <Label htmlFor="message">{scopedT('insert.label')}</Label>
        <Textarea placeholder={scopedT('insert.placeholder')} id="content" name='content' />

        <input
            id="postId"
            name="postId"
            value={post.id}
            hidden
            readOnly
        />
        <Button type='submit'>{t('submit')}</Button>
    </form>);
}

export default PostInsertComment