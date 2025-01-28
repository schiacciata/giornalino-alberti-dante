'use client'

import { SidebarNavItem } from '@/types/nav';
import { usePathname } from 'next/navigation';
import { type FC } from 'react'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon } from '../icons';

interface SidebarButtonProps {
    item: SidebarNavItem;
}

const SidebarButton: FC<SidebarButtonProps> = ({ item }) => {
    const path = usePathname();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton disabled={item.disabled} tooltip={item.title} asChild isActive={path === item.href}>
                {item.href && (
                    <Link
                        href={item.disabled ? "/" : item.href}
                        target={item._blank ? '_blank' : '_self'}
                        className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm w-full",
                        )}
                    >
                        <Icon icon={item.icon} className={cn('m-0')} />
                        <span>
                            {item.title}
                        </span>
                    </Link>
                )}
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default SidebarButton