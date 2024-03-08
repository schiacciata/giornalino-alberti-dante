import { Comment, Post, User } from "@prisma/client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/icons"
import CommentDelete from "./comment-delete"
import CommentShare from "./comment-share"
import { isAdmin } from "@/lib/auth/roles"
import { getCurrentUser } from "@/lib/auth/user"

interface CommentOperationsProps {
    comment: Pick<Comment, 'id' | 'content' | 'updatedAt'>
    author: Pick<User, 'name' | 'image' | 'id' | 'role'>
    post: Pick<Post, 'title'>
}

export async function CommentOperations({ comment, author, post }: CommentOperationsProps) {
    const user = await getCurrentUser();

    const isCommentAuthor = user && user.id === author.id;
    const canDelete = isCommentAuthor || (user?.role && isAdmin({
        role: user.role,
    }));

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <Icon icon='ellipsis' className='m-0' />
                    <span className="sr-only">Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-fit">
                    <DropdownMenuItem asChild>
                        <CommentShare
                            comment={{
                                id: comment.id,
                            }}
                            author={{
                                name: author.name,
                            }}
                            post={{
                                title: post.title,
                            }}
                        />
                    </DropdownMenuItem>
                    {canDelete && (<>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <CommentDelete
                                comment={{
                                    id: comment.id,
                                }}

                            />
                        </DropdownMenuItem>
                    </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
