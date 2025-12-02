"use client";

import { AnimatePresence } from "motion/react";
import { memo, useState } from "react";
import { SidebarItem } from "@/components/dashboard/sidebar-item";
import { cn } from "@/lib/utils";
import type { SidebarNavSection } from "@/types/nav";
import { NavSection } from "../nav-section";

interface DashboardNavProps {
	sections: SidebarNavSection[];
}

export const DashboardNav = memo(({ sections }: DashboardNavProps) => {
	const Nav = NavSection;
	const [showSidebar, setShowSidebar] = useState<boolean>(true);

	const handleMouse = (enter: boolean) => {
		setShowSidebar(enter);
	};

	return (
		<aside
			className={cn(
				"hidden h-screen md:flex flex-col w-fit border-r bg-background fixed left-0",
				showSidebar ? "w-[200px]" : "",
			)}
			onMouseEnter={() => handleMouse(true)}
			onMouseLeave={() => handleMouse(false)}
		>
			<AnimatePresence mode="wait">
				<Nav sections={sections} item={SidebarItem} iconsOnly={!showSidebar} />
			</AnimatePresence>
		</aside>
	);
});

DashboardNav.displayName = "DashboardNav";
