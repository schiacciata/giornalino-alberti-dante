"use client"

import { SidebarNavSection } from "@/types/nav"
import { SidebarItem } from "@/components/dashboard/sidebar-item"
import { NavSection } from "../nav-section";
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  sections: SidebarNavSection[];
}

export const DashboardNav = React.memo(({ sections }: DashboardNavProps) => {
  const Nav = (NavSection);
  const [showSidebar, setShowSidebar] = React.useState<boolean>(true);
  const [hoverSidebar, setHoverSidebar] = React.useState<boolean>(true);

  const handleMouse = (enter: boolean) => {
    if (showSidebar) return;

    setHoverSidebar(enter);
  }

  const show = showSidebar// || hoverSidebar;

  return (
    <aside
      className={cn(
        "hidden h-screen md:flex flex-col w-fit border-r bg-background fixed left-0",
        show ? 'w-[200px]' : '',
      )}
      onMouseEnter={() => handleMouse(true)}
      onMouseLeave={() => handleMouse(false)}
    >
      {show && (
        <Nav
          sections={sections}
          item={SidebarItem}
        />
      )}

      {/*<SidebarItem
        item={{
          title: '',
          icon: 'arrowRight',
          href: '#',
        }}
        onClick={() => {
          setShowSidebar(prev => !prev);
          setHoverSidebar(false);
        }}
        className="place-items-center"
      />*/}
    </aside>
  )
})