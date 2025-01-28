'use client'

import { Comment } from '@prisma/client'
import { FC, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button';
import { Icon } from '../icons';
import { deleteComment } from '@/actions/comment'
import { toast } from 'sonner'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useI18n } from '@/lib/i18n/client'

interface CommentDeleteProps {
    comment: Pick<Comment, 'id'>;
}

const CommentDelete: FC<CommentDeleteProps> = ({ comment }) => {
    const t = useI18n();
    const [isLoading, startTransition] = useTransition();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

    const handleCommentDelete = async () => {
        startTransition(() => {
            setShowDeleteAlert(false);

            deleteComment(comment.id)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }

                    if (data.success) {
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error(t('errors.general')));
        });
    };

    return (
        <Dialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <DialogTrigger asChild>
                <Button variant="destructive" size={'sm'} className='w-full'>
                    <Icon icon="trash" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete this comment?
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='gap-2'>
                    <DialogClose asChild>
                        <Button variant={'secondary'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <form action={handleCommentDelete}>
                        <Button disabled={isLoading} variant="destructive" className='w-full'>
                            Delete
                        </Button>
                    </form >
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CommentDelete