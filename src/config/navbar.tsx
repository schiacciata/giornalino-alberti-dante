import { NavbarSection } from "@/types/nav";
import links from "./links";
import { Icon } from "@/components/icons";

export const getNavbar = async (): Promise<NavbarSection[]> => {

  const mainSection: NavbarSection = {
    title: '',
    items: [
      {
        title: <h2>
          GitHub
        </h2>,
        href: links.github,
      }
    ]
  };

  const sections: NavbarSection[] = [
    mainSection,
  ];

  return sections;
}

const navbarConfig = {};

export default navbarConfig;