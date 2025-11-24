"use client";

import { usePathname } from "next/navigation";
import { type FC, Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toPascalCase } from "@/lib/utils";

type DashboardBreadcrumbsProps = {};

const DashboardBreadcrumbs: FC<DashboardBreadcrumbsProps> = ({}) => {
	const path = usePathname();
	const [_locale, ...segments] = (path || "").split("/").filter(Boolean);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{segments.map((segment, index) => {
					const title = toPascalCase(segment);
					const href = `/${segments.slice(0, index + 1).join("/")}`;

					return (
						<Fragment key={href}>
							{index === segments.length - 1 ? (
								<>
									<BreadcrumbItem>
										<BreadcrumbPage>{title}</BreadcrumbPage>
									</BreadcrumbItem>
								</>
							) : (
								<>
									<BreadcrumbItem>
										<BreadcrumbLink href={href}>{title}</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							)}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default DashboardBreadcrumbs;
