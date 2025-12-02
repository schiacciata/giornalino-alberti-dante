"use client";

import { Link } from "next-view-transitions";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-navbar";
import siteConfig from "@/config/site";
import type { NavbarSection } from "@/types/nav";
import { NavSection } from "./nav-section";
import { NavbarItem } from "./navbar-item";

interface MainNavProps {
	sections: NavbarSection[];
	navbar?: NavbarSection[];
	children?: React.ReactNode;
}

export function Navbar({ sections, children, navbar }: MainNavProps) {
	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

	return (
		<div className="flex gap-6 md:gap-10">
			<>
				<Link href="/" className="hidden items-center space-x-2 md:flex">
					<Icons.logo />
					<span className="hidden font-bold sm:inline-block">
						{siteConfig.title}
					</span>
				</Link>
				<NavSection sections={navbar ?? sections} item={NavbarItem} />
			</>

			<button
				className="flex items-center space-x-2 md:hidden"
				type="button"
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu ? <Icons.close /> : <Icons.logo />}
				<span className="font-bold">Menu</span>
			</button>
			{showMobileMenu && sections && (
				<MobileNav sections={sections}>{children}</MobileNav>
			)}
		</div>
	);
}
