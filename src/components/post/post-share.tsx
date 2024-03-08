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
import { Post, User } from '@prisma/client'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import site from '@/config/site'
import useIsMobile from '@/hooks/use-is-mobile'
import { useI18n } from '@/lib/i18n/client'

interface PostShareProps {
    post: Pick<Post, 'title'>;
    author: Pick<User, 'name'>;
}

const ShareButton: FC<React.HtmlHTMLAttributes<HTMLButtonElement>> = ({ onClick }) => {
    return (
        <Button Button variant="outline" size="icon" onClick={onClick}>
            <Icon icon="share" className='m-0' />
        </Button>
    )
}

const PostShare: FC<PostShareProps> = ({ post, author, }) => {
    const t = useI18n();
    const [, copyToClipboard] = useCopyToClipboard();
    const { isMobile } = useIsMobile();

    const { origin, pathname } = window.location;
    const postUrl = `${origin}${pathname}`;

    const shareData: ShareData = {
        url: postUrl,
        title: site.title,
        text: t('posts.share', {
            authorName: author.name,
            postName: post.title,
        })
    };

    if (navigator.canShare(shareData) && isMobile) {
        return (
            <ShareButton onClick={() => navigator.share(shareData)}/>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ShareButton />
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
                            defaultValue={postUrl}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={() => {
                        copyToClipboard(postUrl);
                    }}>
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

export default PostShare