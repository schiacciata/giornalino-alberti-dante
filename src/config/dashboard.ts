import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { getScopedI18n } from "@/lib/i18n/server";
import { SidebarNavSection } from "@/types/nav";

export const getSidebar = async () => {
  const user = await getCurrentUser();
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
          {
            title: scopedT('users'),
            href: "/dashboard/users",
            icon: "user",
            show: async () => {
              'use server';
              
              if (!user) return false;
              
              return isAdmin(user);
            }
          },
        ],
    },
];

  return sections;
}

const dashboardConfig = {};

export default dashboardConfig;