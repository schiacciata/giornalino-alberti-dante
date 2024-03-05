'use client'

import { FC, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { newComment } from '@/actions/comment'
import { toast } from 'sonner'
import { Post } from '@prisma/client'
import { useI18n, useScopedI18n } from '@/lib/i18n/client'
import { Icons } from '../icons'

interface PostInsertCommentProps {
    post: Pick<Post, 'id'>;
}

const PostInsertComment: FC<PostInsertCommentProps> = ({ post }) => {
    const t = useI18n();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const scopedT = useScopedI18n('comments');

    const handleCommentSubmit = async (formData: FormData) => {
        setIsLoading(true);

        toast.promise(newComment(formData), {
            loading: 'Loading...',
            success: (data) => {
                return data.message;
            },
            error: (error) => {
                return error.message;
            },
        });

        setIsLoading(false);
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
        <Button type='submit' disabled={isLoading}>
            {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('submit')}
        </Button>
    </form>);
}

export default PostInsertComment