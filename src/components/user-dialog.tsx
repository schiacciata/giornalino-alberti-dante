'use client'

import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { UserAvatar } from "./user-avatar"
import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { isEditor } from "@/lib/auth/roles"
import { NotificationsDialog } from "./notifications-dialog"
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog"
import { useServiceWorker } from "@/lib/providers/sw"

type UserDialogProps = {
  user: User,
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
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          {isEditor(user) ?
            <>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
            </>
            : null
          }
          {(sw && sw.permission !== "granted") ? (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <p className="cursor-pointer font-bold bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  Enable Notifications
                </p>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer hover:bg-red-500"
            onSelect={(event) => {
              event.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {sw ? <NotificationsDialog sw={sw} /> : null}
    </AlertDialog>
  )
}
