import { Comment, Post, User } from '@prisma/client'
import { FC } from 'react'
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import { UserAvatar } from '../user/user-avatar'
import { Separator } from '@/components/ui/separator'
import { isEditor } from '@/lib/auth/roles'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import UserBadge from '../user/user-badge'
import { CommentOperations } from '../comment/comment-operations'

interface PostCommentProps {
    comment: Pick<Comment, 'id' | 'content' | 'updatedAt'>
    author: Pick<User, 'name' | 'image' | 'id' | 'role'>
    post: Pick<Post, 'authorId' | 'title'>
}

const PostComment: FC<PostCommentProps> = async ({ post, comment, author }) => {
    const isPostAuthor = author.id === post.authorId;
    const isAuthorEditor = isEditor(author);

    return (
        <Card className="pt-4 px-4" id={comment.id} >
            <div className="flex items-center justify-between mb-2 mr-2 gap-2">
                <Link href={isAuthorEditor ? `/author/${author.id}` : `#${comment.id}`} className={cn("flex items-center gap-2")}>
                    <UserAvatar user={{ name: author.name || null, image: author.image || null }} className="h-6 w-6 rounded-2xl" />
                    <CardTitle className="font-semibold">{author.name}</CardTitle>
                    {isPostAuthor && <UserBadge user={{ role: 'AUTHOR' }} />}
                    {author.role !== 'USER' && <UserBadge user={{ role: author.role }} />}
                </Link>
                <CommentOperations
                    comment={{
                        id: comment.id,
                        content: comment.content,
                        updatedAt: comment.updatedAt,
                    }}
                    author={{
                        id: author.id,
                        name: author.name,
                        image: author.image,
                        role: author.role,
                    }}
                    post={{
                        title: post.title,
                    }}
                />
            </div>
            <p className="text-gray-500 text-sm mb-2">{comment.updatedAt.toLocaleString()}</p>
            <Separator />
            <CardContent className='mt-4 whitespace-pre-line overflow-hidden max-w-full'>
                {comment.content}
            </CardContent>
        </Card>
    );
};

export default PostComment