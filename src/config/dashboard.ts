import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { getScopedI18n } from "@/lib/i18n/server";
import { SidebarNavSection } from "@/types/nav";

export const getSidebar = async () => {
  const user = await getCurrentUser();
  const scopedT = await getScopedI18n('dashboard.sidebar');

  const mainSection: SidebarNavSection = {
    title: '',
    items: [
      {
        title: scopedT('overview'),
        href: '/dashboard',
        icon: 'home'
      },
    ],
  };

  const menuSection: SidebarNavSection = {
    title: 'Menu',
    items: [
      {
        title: scopedT('posts'),
        href: "/dashboard/posts",
        icon: "post",
      },
    ],
  };

  if (user && isAdmin(user)) {
    menuSection.items.push({
      title: scopedT('users'),
      href: "/dashboard/users",
      icon: "users",
    });
  };

  const sections: SidebarNavSection[] = [
    mainSection,
    menuSection,
  ];

  return sections;
}

const dashboardConfig = {};

export default dashboardConfig;