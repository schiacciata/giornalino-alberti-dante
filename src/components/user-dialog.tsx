import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { UserAvatar } from "./user-avatar"
import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { isEditor } from "@/lib/auth/roles"

type UserDialogProps = {
    user: User,
}

export function UserDialog({ user }: UserDialogProps) {
  return (
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
            <DropdownMenuSeparator />
          </>
          : null
        }
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
  )
}
