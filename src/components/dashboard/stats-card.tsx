'use client'

import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Icon, TIcon } from '@/components/icons';

interface StatsCardProps {
    header: string | number | React.ReactElement;
    data: string | number | React.ReactElement;
    icon?: TIcon;
}

const StatsCard: FC<StatsCardProps> = ({ header, data, icon }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{header}</CardTitle>
                <CardDescription>
                    {icon && <Icon className='inline-flex' icon={icon} />}
                    {data}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default StatsCard