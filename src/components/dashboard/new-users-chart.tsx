'use client'

import { FC } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import siteConfig from "@/config/site"

type UserData = {
    date: Date;
    usersCreated: number;
}

interface NewUsersChartProps {
    userData: UserData[];
}

const NewUsersChart: FC<NewUsersChartProps> = ({ userData }) => {
    const formattedData = userData.map(x => {
        return {
            ...x,
            month: x.date.toLocaleString('default', { month: 'short', year: '2-digit' }),
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Creation Statistics for {formattedData[0].date.getFullYear()}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={formattedData}>
                        <XAxis
                            dataKey="month"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            type="number"
                            domain={[0, 'dataMax + 10']}
                        />
                        <Tooltip />
                        <Bar dataKey="usersCreated" fill='hsl(var(--foreground))' radius={[4, 4, 0, 0]} name="Count" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default NewUsersChart