import { Comment, User } from '@prisma/client'
import { FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { UserAvatar } from './user-avatar'
import { Separator } from './ui/separator'
import { isAdmin } from '@/lib/auth/roles'
import { getCurrentUser } from '@/lib/auth/user'
import CommentDeleteButton from './comment-delete-button'
import { formatDate } from '@/lib/utils'

interface PostCommentProps {
    comment: Pick<Comment, 'id' | 'content' | 'updatedAt'>
    author: Pick<User, 'name' | 'image' | 'id'>
}

const PostComment: FC<PostCommentProps> = async ({ comment, author }) => {
    const user = await getCurrentUser();

    const isAuthor = user && user.id === author.id;
    const canDelete = isAuthor || (user && isAdmin(user));

    return (
        <Card className="pt-4 px-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <UserAvatar user={{ name: author.name || null, image: author.image || null }} className="h-6 w-6" />
                    <CardTitle className="font-semibold ml-2">{author.name}</CardTitle>
                </div>
                {canDelete && (
                    <CommentDeleteButton comment={{ id: comment.id }} />
                )}
            </div>
            <p className="text-gray-500 text-sm mb-2">{formatDate(comment.updatedAt)}</p>
            <Separator/>
            <CardContent className='mt-4 whitespace-pre-line overflow-hidden max-w-full'>
                {comment.content}
            </CardContent>
        </Card>
    );
};

export default PostComment