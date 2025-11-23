import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authPages } from "@/lib/auth/config";
import { getCurrentSession } from "@/lib/auth/user";
import { Icon } from "./icons";
import { UserDialog } from "./user/user-dialog";

export async function SessionIndicator() {
	const session = await getCurrentSession();

	if (session?.session && new Date(session.session.expiresAt) > new Date()) {
		return <UserDialog user={session.user} />;
	}

	return (
		<Link href={authPages.signIn}>
			<Button>
				<Icon icon="login" /> Login
			</Button>
		</Link>
	);
}
