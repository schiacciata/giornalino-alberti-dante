import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "./icons";

interface ErrorProps {
	message: string;
}

export function ErrorAlert({ message }: ErrorProps) {
	return (
		<Alert variant="destructive">
			<Icons.error className="size-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription className="font-bold">{message}</AlertDescription>
		</Alert>
	);
}
