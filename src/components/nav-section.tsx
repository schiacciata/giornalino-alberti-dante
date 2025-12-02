"use client";

import { memo } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { NavbarSection } from "@/types/nav";

interface MobileNavProps extends React.HTMLAttributes<HTMLElement> {
	sections: NavbarSection[];
	item: (props: any) => "" | React.ReactElement<any>;
	iconsOnly?: boolean;
}

export function NavSection({
	sections,
	item,
	iconsOnly,
	...props
}: MobileNavProps) {
	const Item = memo(item);

	return (
		<nav {...props}>
			{sections.map((section, index) => {
				return (
					<div key={index} className="hidden gap-6 md:flex">
						<div className="px-3 my-3 min-w-full">
							{section.title && (
								<div className="px-4 text-lg font-semibold tracking-tight">
									{section.icon && (
										<Icon
											icon={section.icon}
											className={cn(iconsOnly ? "m-0" : "")}
										/>
									)}
									{/*!iconsOnly ? section.title : ''*/}
								</div>
							)}
							<div className="space-y-1 w-full">
								{section.items.map((sectionItem, index) => {
									return (
										<Item
											item={sectionItem}
											key={index}
											iconsOnly={iconsOnly}
										/>
									);
								})}
							</div>
						</div>
					</div>
				);
			})}
		</nav>
	);
}
