"use client"

import { SidebarNavSection } from "@/types/nav"
import { SidebarItem } from "@/components/sidebar-item"
import { NavSection } from "./nav-section";

interface DashboardNavProps {
  sections: SidebarNavSection[];
}

export function DashboardNav({ sections }: DashboardNavProps) {
  return (
      <NavSection 
        sections={sections}
        item={SidebarItem}
      />
  )
}