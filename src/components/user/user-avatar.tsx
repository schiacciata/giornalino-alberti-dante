import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "@/components/icons"
import { AuthUser } from "@/types/next-auth"
import { cn } from "@/lib/utils"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User | AuthUser, "image" | "name">
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props} className={cn("h-8 w-8 rounded-md", className)}>
      <AvatarImage alt="Picture" src={user.image || ''} referrerPolicy="no-referrer" />
      <AvatarFallback className="rounded-lg">{user.name?.[0]}</AvatarFallback>
    </Avatar>
  )
}
