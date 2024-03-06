"use client"

import { Comment, User } from "@prisma/client"
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

interface CommentOperationsProps {
    comment: Pick<Comment, 'id' | 'content' | 'updatedAt'>
    author: Pick<User, 'name' | 'image' | 'id' | 'role'>
}

export function CommentOperations({ comment, author }: CommentOperationsProps) {
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
                        />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <CommentDelete
                            comment={{
                                id: comment.id,
                            }}

                        />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
