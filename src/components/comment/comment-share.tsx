'use client'

import { FC } from 'react'
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icon } from '../icons'
import { Comment } from '@prisma/client'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

interface CommentShareProps {
    comment: Pick<Comment, 'id'>;
}

const CommentShare: FC<CommentShareProps> = ({ comment }) => {
    const [, copyToClipboard] = useCopyToClipboard();

    const { origin, pathname } = window.location;
    const commentUrl = `${origin}${pathname}#${comment.id}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='w-full'>
                    <Icon icon="share" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={commentUrl}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={() => copyToClipboard(commentUrl)}>
                        <span className="sr-only">Copy</span>
                        <Icon icon='copy' className='m-0' />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CommentShare