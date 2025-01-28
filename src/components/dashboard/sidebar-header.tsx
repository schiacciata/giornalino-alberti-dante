'use client'

import { cn } from '@/lib/utils'
import { type FC } from 'react'
import { Icon } from '../icons'
import siteConfig from "@/config/site"
import { SidebarHeader as DefaultHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

interface SidebarHeaderProps {

}

const SidebarHeader: FC<SidebarHeaderProps> = ({ }) => {
    return (
        <DefaultHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Icon icon={'logo'} className={cn('m-0 size-4')} />
                        </div>
                        <div
                            className={cn(
                                "grid flex-1 text-left text-sm leading-tight transition-opacity duration-300",
                                //"data-[state=open]:visible hidden"
                            )}
                        >
                            <span className="truncate font-semibold">
                                {siteConfig.title}
                            </span>
                            <span className="truncate text-xs">{new Date().toLocaleDateString()}</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </DefaultHeader>
    )
}

export default SidebarHeader