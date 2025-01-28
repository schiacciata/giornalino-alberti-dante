'use client'

import { UserAvatar } from "./user-avatar"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationsDialog } from "../notifications-dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { useServiceWorker } from "@/lib/providers/sw"
import { AuthUser } from "@/types/next-auth"
import UserDropdown from "./user-dropdown"

type UserDialogProps = {
  user: AuthUser,
}

export function UserDialog({ user }: UserDialogProps) {
  const sw = useServiceWorker();

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className="h-8 w-8"
          />
        </DropdownMenuTrigger>
        <UserDropdown user={user}/>
      </DropdownMenu>
      {sw ? <NotificationsDialog sw={sw} /> : null}
    </AlertDialog>
  )
}
