'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"
import { UserAvatar } from "./user-avatar"
import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { isEditor } from "@/lib/auth/roles"
import { NotificationsDialog } from "./notifications-dialog"
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog"
import { useServiceWorker } from "@/lib/providers/sw"
import { Meteors } from "./ui/meteors"
import { AuthUser } from "@/types/next-auth"
import { useScopedI18n } from "@/lib/i18n/client"
import authOptions from "@/lib/auth/config"

type UserDialogProps = {
  user: AuthUser,
}

export function UserDialog({ user }: UserDialogProps) {
  const sw = useServiceWorker();
  const scopedT = useScopedI18n('userMenu');

  const onInstallClick = () => {
    if (!sw?.promptInstall) return;
    sw.promptInstall.prompt();
  };

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
          <div className="flex items-center justify-start gap-2 p-2 ">
            <div className="flex flex-col space-y-1 leading-none">
              <div className="h-3/4 md:h-1/2 w-3/4 relative max-w-sm">
                {user.name && <p className="font-medium">{user.name}</p>}
                {user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                )}
                <Meteors number={10} />
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          {isEditor(user) ?
            <>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  {scopedT('dashboard')}
                </Link>
              </DropdownMenuItem>
            </>
            : null
          }
          {(sw && sw.permission !== "granted") ? (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <button className="font-bold bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {scopedT('notifications')}
                </button>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          ) : null}
          {(sw && sw.promptInstall) ? (
            <DropdownMenuItem>
              <button onClick={onInstallClick} className="font-bold bg-gradient-to-r from-teal-500 to-cyan-400 via-cyan-400 text-transparent bg-clip-text">
                {scopedT('install')}
              </button>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem asChild>
            <Link href="/settings">{scopedT('settings')}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:bg-red-500"
            onSelect={(event) => {
              event.preventDefault()
              signOut({
                //callbackUrl: `${window.location.origin}/login`,
              })
            }}
          >
            {scopedT('signOut')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {sw ? <NotificationsDialog sw={sw} /> : null}
    </AlertDialog>
  )
}
