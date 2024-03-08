"use client"

import { useEffect, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Post } from "@prisma/client"
import { Icon, TIcon } from "../icons"
import { useSession } from "next-auth/react"
import { likePost } from "@/actions/post"
import { toast } from "sonner"
import { useI18n } from "@/lib/i18n/client"
import { cn } from "@/lib/utils";

interface LikePostButtonProps {
  post: Pick<Post, 'id' | 'likesUserIDs'>
}

export function LikePostButton({ post }: LikePostButtonProps) {
  const t = useI18n();

  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const isLoading = status === 'loading' || isPending;

  useEffect(() => {
    if (!session) return;
    const { id } = session.user;

    setIsLiked(post.likesUserIDs.some(userId => userId === id));
  }, [status])

  async function handleAction() {
    startTransition(() => {
      likePost({
        id: post.id,
        liked: !isLiked
      })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            setIsLiked(!isLiked);

          }
        })
        .catch(() => toast.error(t('errors.general')));
    })
  }

  const getIcon = (): TIcon => {
    if (isLoading) return 'spinner';

    return 'heart';
  }

  return (
    <form action={handleAction}>
      <Button variant="link" size="icon" type="submit" disabled={isLoading}>
        <Icon icon={getIcon()} className={cn('m-0', isLiked ? 'fill-red-500' : '')} />
      </Button>
    </form>
  )
}