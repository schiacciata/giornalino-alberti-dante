import { formatDate } from '@/lib/utils'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { buttonVariants } from './ui/button'
import { Icon } from './icons'

interface PostCardProps {
    post: Pick<Post, "id" | "title" | "published" | "createdAt">
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
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
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
        <Link
            href={`/blog/${post.id}`}
            className={buttonVariants()}
            >
                <Icon icon="read"/>
                Read
        </Link>
    </div>
  )
}