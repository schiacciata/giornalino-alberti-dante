'use client'

import { Comment } from '@prisma/client'
import { FC } from 'react'
import { Button } from './ui/button';
import { Icon } from './icons';
import { deleteComment } from '@/actions/comment'
import { toast } from './ui/use-toast'
import { useI18n } from '@/lib/i18n/client';

interface CommentDeleteButtonProps {
    comment: Pick<Comment, 'id'>;
}

const CommentDeleteButton: FC<CommentDeleteButtonProps> = ({ comment }) => {
    const t = useI18n();
    
    const handleCommentDelete = async () => {
        const { error, message } = await deleteComment(comment.id);

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
    
    return <form action={handleCommentDelete}>
        <input
            id="id"
            name="id"
            value={comment.id}
            hidden
            readOnly
        />
        <Button variant="destructive">
            <Icon icon='trash' className='mr-0' />
        </Button>
    </form>
}

export default CommentDeleteButton