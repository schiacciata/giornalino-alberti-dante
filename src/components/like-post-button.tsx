"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Post } from "@prisma/client"
import { Icon } from "./icons"
import { useSession } from "next-auth/react"
// @ts-ignore
import { useFormStatus } from "react-dom"
import { likePost } from "@/actions/post"
import { toast } from "./ui/use-toast"

interface LikePostButtonProps {
    post: Pick<Post, 'id' | 'likesUserIDs'>
}

export function LikePostButton({ post }: LikePostButtonProps) {
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
    const res = await likePost({
      id: post.id,
      liked: !isLiked
    });
    
    if ('error' in res) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error,
      });
    }
    
    setIsLiked(!isLiked);
    return toast({
      variant: "default",
      title: "Success!",
      description: res.message,
    });
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