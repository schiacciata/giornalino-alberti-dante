'use client'

import { FC } from 'react'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { cn } from '@/lib/utils';

interface StatsCardProps {
    header: string | number | React.ReactElement;
    data: string | number | React.ReactElement;
    icon?: React.ReactElement;
}

const StatsCard: FC<StatsCardProps> = ({ header, data, icon }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{header}</CardTitle>
                <CardDescription>{data}</CardDescription>
            </CardHeader>
            <CardContent>
                {icon}
            </CardContent>
        </Card>
    )
}

export default StatsCard