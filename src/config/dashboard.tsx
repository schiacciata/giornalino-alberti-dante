import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { getI18n, getScopedI18n } from "@/lib/i18n/server";
import { SidebarNavSection } from "@/types/nav";
import links from "./links";
import config from ".";

export const getSidebar = async () => {
  const t = await getI18n();
  const scopedT = await getScopedI18n('dashboard.sidebar');

  const user = await getCurrentUser();

  const mainSection: SidebarNavSection = {
    title: '',
    items: [
      {
        title: scopedT('home'),
        href: '/',
        icon: 'back'
      },
      {
        title: scopedT('overview'),
        href: '/dashboard',
        icon: 'dashboard'
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

  const helpSection: SidebarNavSection = {
    title: scopedT('support'),
    items: [
      {
        title: <h2 className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
            Instagram
        </h2>,
        href: links.instagram,
        icon: "instagram",
        _blank: true,
      },
      {
        title: <h2 className="font-extrabold text-transparent bg-clip-text bg-linear-to-b from-cyan-500 via-[#ffff00] to-cyan-500">
            {t('help')}
        </h2>,
        href: `mailto:${config.admin}`,
        icon: "help",
      },
    ]
  };

  const sections: SidebarNavSection[] = [
    mainSection,
    menuSection,
    helpSection,
  ];

  return sections;
}

const dashboardConfig = {};

export default dashboardConfig;