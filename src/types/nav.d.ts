import { TIcon } from "@/components/icons"
import { User } from "./api";

type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
    icon?: TIcon;
    show?: () => boolean | Promise<boolean>;
}

type NavbarSection<TNavItem = NavItem> = {
    title: string;
    icon?: TIcon;
    items: TNavItem[];
    show?: () => boolean | Promise<boolean>;
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