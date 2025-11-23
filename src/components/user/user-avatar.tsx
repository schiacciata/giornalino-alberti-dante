import type { AvatarProps } from "@radix-ui/react-avatar";
import { Icon } from "@/components/icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends AvatarProps {
	user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
	return (
		<Avatar {...props} className={cn("h-8 w-8 rounded-md", className)}>
			<AvatarImage
				alt="Picture"
				src={user.image || ""}
				referrerPolicy="no-referrer"
			/>
			<AvatarFallback className="rounded-lg">{user.name?.[0]}</AvatarFallback>
		</Avatar>
	);
}
