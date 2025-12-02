"use client";

import { type FC, memo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n, useScopedI18n } from "@/lib/i18n/client";
import { Icon } from "../icons";

interface PageSwitcherProps {
	pageIndex: number;
	pageCount: number;
	onPageChange?: (increment: number) => void;
}

export const PageSwitcher: FC<PageSwitcherProps> = memo(
	({ pageIndex, pageCount, onPageChange }) => {
		const t = useI18n();
		const scopedT = useScopedI18n("pageSwitcher");

		const [isDialogOpen, setIsDialogOpen] = useState(false);
		const [selectedPage, setSelectedPage] = useState(pageIndex + 1);

		const openDialog = () => setIsDialogOpen(true);
		const closeDialog = () => setIsDialogOpen(false);

		const onChange = onPageChange || ((increment: number) => {});

		const handlePageChange = () => {
			if (selectedPage > 0 && selectedPage <= pageCount) {
				onChange(selectedPage - pageIndex - 1);
				closeDialog();
			}
		};

		return (
			<>
				<center className="content-center justify-items-center grid grid-cols-3 py-6">
					<Button onClick={() => onChange(-1)} disabled={pageIndex === 0}>
						<Icon icon="chevronLeft" className="mr-0" />
					</Button>
					<p
						className={buttonVariants({ variant: "outline" })}
						onClick={openDialog}
						style={{ cursor: "pointer" }}
					>
						{pageIndex + 1} of {pageCount}
					</p>
					<Button
						onClick={() => onChange(1)}
						disabled={pageIndex >= pageCount - 1}
					>
						<Icon icon="chevronRight" className="mr-0" />
					</Button>
				</center>

				<Dialog open={isDialogOpen} onOpenChange={closeDialog}>
					<DialogTrigger>
						<span style={{ display: "none" }}>Open</span>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{scopedT("title")}</DialogTitle>
							<DialogDescription>{scopedT("description")}</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-y-4 py-4">
							<Label htmlFor="number" className="text-right">
								{scopedT("label")}
							</Label>
							<Input
								id="number"
								name="number"
								required
								placeholder="123"
								type="number"
								className="col-span-3"
								value={selectedPage}
								onChange={(e) => setSelectedPage(Number(e.target.value))}
								min={1}
								max={pageCount}
							/>
							<DialogFooter>
								<Button onClick={handlePageChange}>{t("submit")}</Button>
							</DialogFooter>
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	},
);

PageSwitcher.displayName = "PageSwitcher";
