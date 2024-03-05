import { TIcon } from "@/components/icons"
import { User } from "./api";

type NavItem = {
    title: string | React.ReactElement;
    href: string;
    disabled?: boolean;
    icon?: TIcon;
}

type NavbarSection<TNavItem = NavItem> = {
    title: string | React.ReactElement;
    icon?: TIcon;
    items: TNavItem[];
}

type SidebarNavItem = NavItem & {
    icon: TIcon;
}

type SidebarNavSection = NavbarSection<SidebarNavItem>;

export type {
    NavItem,
    NavbarSection,
    SidebarNavSection,
    SidebarNavItem,
}