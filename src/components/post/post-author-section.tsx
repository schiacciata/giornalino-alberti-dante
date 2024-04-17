"use client"

import * as React from "react"
import { Post, User } from "@prisma/client"
import { UserAvatar } from "../user/user-avatar"
import { formatDate } from "@/lib/utils"
import { Link } from 'next-view-transitions'
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "../icons"

interface PostAuthorSectionProps {
    author: Pick<User, 'image' | 'name' | 'id'>
    post: Pick<Post, 'updatedAt' | 'likesUserIDs'>
}

export function PostAuthorSection({ author, post }: PostAuthorSectionProps) {

  return (
    <div className="divide-y divide-border rounded-md border px-4 py-4">
        <Link  className={buttonVariants({ variant: 'link' })} href={`/author/${author.id}`}>
            <UserAvatar
                user={{ name: author.name, image: author.image }}
                className="h-8 w-8" />  
            <p className="font-bold px-4 text-lg">{author.name}</p>
        </Link>
        <p className="px-4 py-2 text-muted-foreground italic">
            {formatDate(post.updatedAt?.toDateString())} ∘ <b>{post.likesUserIDs.length || 0} <Icon icon='heart' className='inline-flex'/></b>
        </p>
    </div>
  )
}