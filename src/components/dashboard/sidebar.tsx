"use client"

import { SidebarNavSection } from "@/types/nav"
import { SidebarItem } from "@/components/dashboard/sidebar-item"
import { NavSection } from "../nav-section";
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

interface DashboardNavProps {
  sections: SidebarNavSection[];
}

export const DashboardNav = React.memo(({ sections }: DashboardNavProps) => {
  const Nav = (NavSection);
  const [showSidebar, setShowSidebar] = React.useState<boolean>(true);

  const handleMouse = (enter: boolean) => {
    setShowSidebar(enter);
  }

  return (
    <aside
      className={cn(
        "hidden h-screen md:flex flex-col w-fit border-r bg-background fixed left-0",
        showSidebar ? 'w-[200px]' : '',
      )}
      onMouseEnter={() => handleMouse(true)}
      onMouseLeave={() => handleMouse(false)}
    >
      <AnimatePresence mode="wait">
        <Nav
          sections={sections}
          item={SidebarItem}
          iconsOnly={!showSidebar}
        />
      </AnimatePresence>
    </aside>
  )
})