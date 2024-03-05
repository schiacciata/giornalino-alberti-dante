'use client'

import { Comment } from '@prisma/client'
import { FC } from 'react'
import { Button } from '@/components/ui/button';
import { Icon } from './icons';
import { deleteComment } from '@/actions/comment'
import { toast } from 'sonner'
import { useI18n } from '@/lib/i18n/client';

interface CommentDeleteButtonProps {
    comment: Pick<Comment, 'id'>;
}

const CommentDeleteButton: FC<CommentDeleteButtonProps> = ({ comment }) => {
    const t = useI18n();
    
    const handleCommentDelete = async () => {
        toast.promise(deleteComment(comment.id), {
            loading: 'Loading...',
            success: (data) => {
              return data.message;
            },
            error: (error) => {
                return error.message;
            },
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