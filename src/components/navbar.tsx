"use client"

import * as React from "react"
import { Link } from 'next-view-transitions'

import siteConfig from "@/config/site"
import { MobileNav } from "@/components/mobile-navbar"
import { Icons } from "@/components/icons"
import { NavbarSection } from "@/types/nav"
import { NavSection } from "./nav-section"
import { NavbarItem } from "./navbar-item"

interface MainNavProps {
  sections: NavbarSection[];
  navbar?: NavbarSection[];
  children?: React.ReactNode;
}

export function Navbar({ sections, children, navbar }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <>
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.title}
          </span>
        </Link>
        <NavSection 
          sections={navbar ?? sections}
          item={NavbarItem}
        />
      </>

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
      {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && sections && (
        <MobileNav sections={sections}>{children}</MobileNav>
      )}
    </div>
  )
}