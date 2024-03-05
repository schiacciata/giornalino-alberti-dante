"use client"

import { SidebarNavSection } from "@/types/nav"
import { SidebarItem } from "@/components/dashboard/sidebar-item"
import { NavSection } from "../nav-section";
import { memo } from 'react';

interface DashboardNavProps {
  sections: SidebarNavSection[];
}

export function DashboardNav({ sections }: DashboardNavProps) {
  const Nav = memo(NavSection)

  return (
      <Nav 
        sections={sections}
        item={SidebarItem}
      />
  )
}