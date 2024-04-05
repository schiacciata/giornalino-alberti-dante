'use client'

import { FC, useTransition } from 'react'
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
    disabled?: boolean;
}

const PostInsertComment: FC<PostInsertCommentProps> = ({ post, disabled }) => {
    const t = useI18n();
    const [isLoading, startTransition] = useTransition();
    const scopedT = useScopedI18n('comments');

    const handleCommentSubmit = async (formData: FormData) => {
        startTransition(() => {
            newComment(formData)
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }

                if (data.success) {
                    toast.success(data.success);
                }
            })
            .catch(() => toast.error(t('errors.general')));
        })
    };

    return (<form
        className="mx-auto w-[50%] my-5 grid gap-y-4 grid-cols-1"
        action={handleCommentSubmit}
    >
        <Label htmlFor="content">{scopedT('insert.label')}</Label>
        <Textarea placeholder={scopedT('insert.placeholder')} id="content" name='content' disabled={disabled} />

        <input
            id="postId"
            name="postId"
            value={post.id}
            hidden
            readOnly
            disabled={disabled}
        />
        <Button type='submit' disabled={disabled || isLoading}>
            {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('submit')}
        </Button>
    </form>);
}

export default PostInsertComment