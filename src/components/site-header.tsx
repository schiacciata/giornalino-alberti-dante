import siteConfig from "@/config/site"
import { Navbar } from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SessionIndicator } from "./session-indicator"
import { NavbarSection } from "@/types/nav"
import { LocaleSwitcher } from "./locale-switcher"

type SiteHeaderProps = {
  navbarSections?: NavbarSection[];
  onlyMobile?: boolean;
}

export function SiteHeader({ navbarSections, onlyMobile } : SiteHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Navbar onlyMobile={onlyMobile ?? false} sections={navbarSections ?? [{ title: '', items: siteConfig.navbar }]} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SessionIndicator />
            <LocaleSwitcher/>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}