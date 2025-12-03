"use client";

import { useI18n } from "@/lib/i18n/client";
import { Icon } from "../icons";
import { Button } from "./button";

export interface BackButtonProps extends React.ComponentProps<typeof Button> {}

export const BackButton = (props: BackButtonProps) => {
	const t = useI18n();

	const goBack = () => {
		if (typeof window === "undefined") return;
		window.history.back();
	};

	return (
		<Button variant="ghost" {...props} onClick={goBack}>
			<Icon icon="back" />
			{t("back")}
		</Button>
	);
};
