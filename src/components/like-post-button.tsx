"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Post } from "@prisma/client"
import { Icon } from "./icons"
import { useSession } from "next-auth/react"
// @ts-ignore
import { useFormStatus } from "react-dom"
import { likePost } from "@/actions/post"
import { toast } from "sonner"
import { useI18n } from "@/lib/i18n/client"

interface LikePostButtonProps {
    post: Pick<Post, 'id' | 'likesUserIDs'>
}

export function LikePostButton({ post }: LikePostButtonProps) {
  const t = useI18n();
  const { pending } = useFormStatus();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const isLoading = status === 'loading' || pending;

  useEffect(() => {
    if (!session) return;
    const { id } = session.user;

    setIsLiked(post.likesUserIDs.some(userId => userId === id));
  }, [status])

  async function handleAction() {
    
    toast.promise(likePost({
        id: post.id,
        liked: !isLiked
      }), {
      loading: 'Loading...',
      success: (data) => {
        return `Successfully ${data.liked ? 'liked' : 'disliked'} post`;
      },
      error: (error) => {
          return error.message;
      },
    });
    
    setIsLiked(!isLiked);
  }

  return (
    <form action={handleAction}>
        <Button type="submit" disabled={isLoading} className={isLiked ? 'bg-red-500' : ''}>
          {isLoading ? 
            <>
              <Icon icon="spinner"/>
              Loading
            </>
           : 
            <>
              { isLiked ?
                  <>
                    <Icon icon="heart"/>
                    Liked
                  </> 
                :
                  <>
                    <Icon icon="heart"/>
                    Like
                  </>
              }
            </>
          }
        </Button>
    </form>
  )
}