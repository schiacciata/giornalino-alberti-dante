'use client'

import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Icon, TIcon } from '@/components/icons';
import Counter from '../animata/text/counter';

interface StatsCardProps {
    header: string | number | React.ReactElement<any>;
    data: number;
    icon?: TIcon;
}

const StatsCard: FC<StatsCardProps> = ({ header, data, icon }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{header}</CardTitle>
                <CardDescription>
                    {icon && <Icon className='inline-flex' icon={icon} />}
                    <Counter
                        className='text-sm font-normal text-muted-foreground'
                        targetValue={data}
                    />
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default StatsCard