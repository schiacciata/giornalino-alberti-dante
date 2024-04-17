import { Icon } from "./icons"
import { Button } from "@/components/ui/button"
import { UserDialog } from "./user/user-dialog"
import { Link } from 'next-view-transitions'
import authOptions from "@/lib/auth/config"
import { auth } from "@/lib/auth";


export async function SessionIndicator() {
    const session = await auth();

    if (session && new Date(session.expires) > new Date()) {
        return (
            <UserDialog user={session.user} />
        )
    }

    return (
        <Link href={authOptions.pages.signIn}>
            <Button>
                <Icon icon="login" /> Login
            </Button>
        </Link>
    )
}