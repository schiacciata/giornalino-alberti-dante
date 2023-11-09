import { SidebarNavSection } from "@/types/nav";

export default {
    sidebarNav: [
        {
            title: '',
            items: [
                {
                    title: "Overview",
                    href: '/dashboard',
                    icon: 'home'
                },
            ],
        },
        {
            title: 'Menu',
            items: [
              {
                title: "Posts",
                href: "/dashboard/posts",
                icon: "post",
              },
              {
                title: "Settings",
                href: "/dashboard/settings",
                icon: "settings",
              },
            ],
        },
    ] as SidebarNavSection[],
};