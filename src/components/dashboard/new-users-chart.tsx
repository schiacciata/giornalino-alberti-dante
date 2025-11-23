"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { FC } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import siteConfig from "@/config/site";
import { toPascalCase } from "@/lib/utils";
import Counter from "../animata/text/counter";

type UserData = {
	date: Date;
	usersCreated: number;
};

interface NewUsersChartProps {
	userData: UserData[];
}

const NewUsersChart: FC<NewUsersChartProps> = ({ userData }) => {
	const formattedData = userData.map((x) => {
		return {
			...x,
			month: x.date.toLocaleDateString(undefined, {
				month: "long",
				year: "numeric",
			}),
		};
	});

	const lastMonthUsers = userData[userData.length - 2]?.usersCreated || 0;
	const currentMonthUsers = userData[userData.length - 1]?.usersCreated || 0;
	const percentageChange = lastMonthUsers
		? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100
		: 0;
	const isTrendingUp = percentageChange > 0;

	const chartConfig = {
		created: {
			label: "Users Created",
			color: "var(--chart-1)",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					User Creation Statistics for {formattedData[0].date.getFullYear()}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer className="min-h-[300px]" config={chartConfig}>
					<BarChart accessibilityLayer data={formattedData}>
						<CartesianGrid vertical={false} />
						<XAxis
							stroke="#888888"
							fontSize={12}
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(v: string) => v[0].toUpperCase() + v.slice(1)}
						/>
						<YAxis
							stroke="#888888"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							type="number"
							dataKey={"usersCreated"}
							domain={[0, "dataMax + 10"]}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar
							dataKey="usersCreated"
							fill="var(--color-created)"
							radius={4}
							name="Count"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-1 font-medium leading-none">
					{isTrendingUp ? (
						<>
							Trending up by
							<Counter
								className="text-md font-medium"
								targetValue={percentageChange + 1}
							/>
							% this month <TrendingUp className="size-4" />
						</>
					) : (
						<>
							Trending down by
							<Counter
								className="text-md font-medium"
								targetValue={Math.abs(percentageChange) + 1}
							/>
							% this month <TrendingDown className="size-4" />
						</>
					)}
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last {userData.length} months
				</div>
			</CardFooter>
		</Card>
	);
};

export default NewUsersChart;
