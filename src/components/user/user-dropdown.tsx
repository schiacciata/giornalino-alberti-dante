'use client'

import { signOut } from "next-auth/react"
import { Link } from 'next-view-transitions'
import { UserAvatar } from "./user-avatar"
import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { isEditor } from "@/lib/auth/roles"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Meteors } from "@/components/ui/meteors"
import { AuthUser } from "@/types/next-auth"
import { FC } from "react"
import { useScopedI18n } from "@/lib/i18n/client"
import { useServiceWorker } from "@/lib/providers/sw"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowDownToLine, Bell, CogIcon, LayoutDashboard, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface UserDropdownProps {
    user: AuthUser,
}

const UserDropdown: FC<UserDropdownProps> = ({ user }) => {
    const sw = useServiceWorker();
    const scopedT = useScopedI18n('userMenu');
    const isMobile = useIsMobile();
    const path = usePathname();

    const isDashboard = path?.startsWith('/dashboard')

    const onInstallClick = () => {
        if (!sw?.promptInstall) return;
        sw.promptInstall.prompt();
    };

    return (
        <DropdownMenuContent
            className={cn(
                "min-w-56 rounded-lg",
                isDashboard && 'w-[--radix-dropdown-menu-trigger-width]',
            )}
            side={isMobile || !isDashboard ? "bottom" : "right"}
            align="end"
            sideOffset={4}
        >
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm relative">
                    <UserAvatar user={user} />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <Meteors number={10} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isEditor(user) ?
                <>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard />
                            {scopedT('dashboard')}
                        </Link>
                    </DropdownMenuItem>
                </>
                : null
            }
            {(sw && sw.permission !== "granted") ? (
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem>
                        <Bell />
                        <button className="font-bold bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
                            {scopedT('notifications')}
                        </button>
                    </DropdownMenuItem>
                </AlertDialogTrigger>
            ) : null}
            {(sw && sw.promptInstall) ? (
                <DropdownMenuItem>
                    <ArrowDownToLine />
                    <button onClick={onInstallClick} className="font-bold bg-gradient-to-r from-teal-500 to-cyan-400 via-cyan-400 text-transparent bg-clip-text">
                        {scopedT('install')}
                    </button>
                </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem asChild>
                <Link href="/settings">
                    <CogIcon />
                    {scopedT('settings')}
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                className="hover:text-red-500 cursor-pointer"
                onSelect={(event) => {
                    event.preventDefault()
                    signOut({
                        //callbackUrl: `${window.location.origin}/login`,
                    })
                }}
            >
                <LogOut />
                {scopedT('signOut')}
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default UserDropdown