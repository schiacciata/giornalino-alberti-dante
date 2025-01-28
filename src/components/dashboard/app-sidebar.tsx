import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { SessionIndicator } from "@/components/session-indicator"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarNavSection } from "@/types/nav"
import { Icon } from "../icons"
import { cn } from "@/lib/utils"
import SidebarButton from "./sidebar-button"
import SidebarHeader from "./sidebar-header"
import SidebarUser from "./sidebar-user"

interface DashboardSidebarProps {
  items: SidebarNavSection[]
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent>
        {items.map((item, i) => (
          <SidebarGroup
            key={`sidebar_section_${typeof item.title === 'string' ? item.title : i}`}
          >
            {item.title && (
              <SidebarGroupLabel asChild={typeof item.title !== 'string'}>
                {item.icon && <Icon icon={item.icon} className={cn('m-0')} />}
                <span>{item.title}</span>
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((subItem, i) => (
                  <SidebarButton
                    item={subItem}
                    key={`sidebar_item_${typeof subItem.title === 'string' ? subItem.title : i}`}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        <LocaleSwitcher  />
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  )
}
