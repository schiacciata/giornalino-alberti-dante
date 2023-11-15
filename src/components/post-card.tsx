'use client'

import { formatDate } from '@/lib/utils'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { buttonVariants } from './ui/button'
import { Icon } from './icons'
import { useI18n } from '@/lib/i18n/client'

interface PostCardProps {
    post: Pick<Post, "id" | "title" | "updatedAt" | "likesUserIDs">
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const t = useI18n();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/blog/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.updatedAt?.toDateString())} ∘ <b>{post.likesUserIDs.length || 0} <Icon icon='heart' className='inline-flex'/></b>
          </p>
        </div>
      </div>
        <Link
            href={`/blog/${post.id}`}
            className={buttonVariants()}
            >
                <Icon icon="read"/>
                {t('read')}
        </Link>
    </div>
  )
}