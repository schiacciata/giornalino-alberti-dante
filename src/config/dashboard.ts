import { getScopedI18n } from "@/lib/i18n/server";
import { SidebarNavSection } from "@/types/nav";

export const getSidebar = async () => {
  const scopedT = await getScopedI18n('dashboard.sidebar');

  const sections: SidebarNavSection[] = [
    {
        title: '',
        items: [
            {
                title: scopedT('overview'),
                href: '/dashboard',
                icon: 'home'
            },
        ],
    },
    {
        title: 'Menu',
        items: [
          {
            title: scopedT('posts'),
            href: "/dashboard/posts",
            icon: "post",
          },
        ],
    },
];

  return sections;
}

const dashboardConfig = {};

export default dashboardConfig;