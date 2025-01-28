'use client'

import { useSession } from 'next-auth/react'
import { type FC } from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from 'lucide-react'
import UserDropdown from '../user/user-dropdown'
import { AlertDialog } from '../ui/alert-dialog'

interface SidebarUserProps {

}

const SidebarUser: FC<SidebarUserProps> = ({ }) => {
  const { isMobile } = useSidebar()
  const { data, status } = useSession();

  if (status === 'loading' || !data) {
    return (
      <></>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data.user.image || ''} alt={data.user.name || ''} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data.user.name}</span>
                  <span className="truncate text-xs">{data.user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <UserDropdown user={data.user} />
          </DropdownMenu>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default SidebarUser