'use client'

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/nav";
import Link from "next/link";
import { Icon } from "../icons";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarItemProps = {
  item: SidebarNavItem;
  iconsOnly?: boolean;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export function SidebarItem({ item, iconsOnly, ...props }: SidebarItemProps) {
  const path = usePathname();
  return (
    <div {...props}>
      {item.href && (
        <Link
          href={item.disabled ? "/" : item.href}
          target={item._blank ? '_blank' : '_self'}
        >
          <div
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent w-full",
              path === item.href ? "bg-accent" : "transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <Icon icon={item.icon} className={cn(iconsOnly ? 'm-0' : '')} />
            <div>
              {!iconsOnly ? item.title : ''}
            </div>
          </div>
        </Link>
      )}
    </div>

  );
}