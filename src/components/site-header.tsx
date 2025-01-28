import { getNavbar } from "@/config/navbar"
import { Navbar } from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SessionIndicator } from "./session-indicator"
import { NavbarSection } from "@/types/nav"
import { LocaleSwitcher } from "./locale-switcher"
import HeaderWrapper from "./navigation/header-wrapper"

type SiteHeaderProps = {
  navbarSections?: NavbarSection[];
}

export async function SiteHeader({ navbarSections }: SiteHeaderProps) {
  const navbar = await getNavbar();
  
  return (
    <HeaderWrapper>
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Navbar
          sections={navbarSections ?? navbar}
          navbar={navbar} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SessionIndicator />
            <LocaleSwitcher />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </HeaderWrapper>
  )
}