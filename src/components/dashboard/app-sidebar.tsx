import { LocaleSwitcher } from "@/components/locale-switcher";
import { SessionIndicator } from "@/components/session-indicator";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { SidebarNavSection } from "@/types/nav";
import { Icon } from "../icons";
import SidebarButton from "./sidebar-button";
import SidebarHeader from "./sidebar-header";
import SidebarUser from "./sidebar-user";

interface DashboardSidebarProps {
	items: SidebarNavSection[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader />
			<SidebarContent>
				{items.map((item, i) => (
					<SidebarGroup
						key={`sidebar_section_${typeof item.title === "string" ? item.title : i}`}
					>
						{item.title && (
							<SidebarGroupLabel asChild={typeof item.title !== "string"}>
								{item.icon && <Icon icon={item.icon} className={cn("m-0")} />}
								<span>{item.title}</span>
							</SidebarGroupLabel>
						)}
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items?.map((subItem, i) => {
									return (
										<SidebarButton
											key={`sidebar_item_${typeof subItem.title === "string" ? subItem.title : i}`}
											item={subItem}
										/>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<div className="flex justify-between items-center">
					<ThemeToggle />
					<LocaleSwitcher />
				</div>
				<SidebarUser />
			</SidebarFooter>
		</Sidebar>
	);
}
