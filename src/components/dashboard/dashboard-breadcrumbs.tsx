'use client'

import { type FC } from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { toPascalCase } from '@/lib/utils'

interface DashboardBreadcrumbsProps {

}

const DashboardBreadcrumbs: FC<DashboardBreadcrumbsProps> = ({ }) => {
    const path = usePathname();
    const segments = (path || '').split('/').filter(Boolean);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    const title = toPascalCase(segment);
                    const href = `/${segments.slice(0, index + 1).join('/')}`;

                    return (
                        <Fragment key={href}>
                            {index === 0 ? (
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                                </BreadcrumbItem>
                            ) : (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default DashboardBreadcrumbs