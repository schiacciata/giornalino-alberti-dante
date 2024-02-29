import { Comment, User } from '@prisma/client'
import { FC } from 'react'
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import { UserAvatar } from './user-avatar'
import { Separator } from './ui/separator'
import { isAdmin, isEditor } from '@/lib/auth/roles'
import { getCurrentUser } from '@/lib/auth/user'
import CommentDeleteButton from './comment-delete-button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import UserBadge from './user-badge'

interface PostCommentProps {
    comment: Pick<Comment, 'id' | 'content' | 'updatedAt'>
    author: Pick<User, 'name' | 'image' | 'id' | 'role'>
}

const PostComment: FC<PostCommentProps> = async ({ comment, author }) => {
    const user = await getCurrentUser();

    const isAuthor = user && user.id === author.id;
    const canDelete = isAuthor || (user && isAdmin(user));

    return (
        <Card className="pt-4 px-4">
            <div className="flex items-center justify-between mb-2 mr-2 gap-2">
                <Link href={isEditor(author) ? `/author/${author.id}` : '#'} className={cn("flex items-center gap-2", isEditor(author) ? `cursor-default` : '')}>
                    <UserAvatar user={{ name: author.name || null, image: author.image || null }} className="h-6 w-6" />
                    <CardTitle className="font-semibold">{author.name}</CardTitle>
                    {author.role !== 'USER' && <UserBadge user={{ role: author.role }}/>}
                </Link>
                {canDelete && (
                    <CommentDeleteButton comment={{ id: comment.id }} />
                )}
            </div>
            <p className="text-gray-500 text-sm mb-2">{comment.updatedAt.toLocaleString()}</p>
            <Separator/>
            <CardContent className='mt-4 whitespace-pre-line overflow-hidden max-w-full'>
                {comment.content}
            </CardContent>
        </Card>
    );
};

export default PostComment