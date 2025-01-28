'use client'

import { cn, formatDate } from '@/lib/utils'
import { Comment, Post } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Icon } from '../icons'
import { useI18n } from '@/lib/i18n/client'
import { backdrop } from '@/styles/backdrop'

interface PostCardProps {
  post: Pick<Post, "id" | "title" | "createdAt" | "likesUserIDs">;
  comments:  Pick<Comment, 'id'>[];
}

export const PostCard: FC<PostCardProps> = ({ post, comments }) => {
  const t = useI18n();

  return (
    <div className={cn("flex items-center justify-between p-4", 'bg-background/80 backdrop-blur-md')}>
      <div className="grid gap-1">
        <Link
          href={`/blog/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt?.toDateString())} ∘ <b>
              {post.likesUserIDs.length || 0} <Icon icon='heart' className='inline-flex'/>
            </b> ∘ <b>
              {comments.length || 0} <Icon icon='message' className='inline-flex'/>
            </b>
          </p>
        </div>
      </div>
        <Link
            href={`/blog/${post.id}`}
            className={buttonVariants({ className: 'bg-none bg-gradient-to-r from-bg-primary via-bg-secondary to-bg-primary' })}
            >
              <Icon icon="read"/>
              {t('read')}
        </Link>
    </div>
  )
}