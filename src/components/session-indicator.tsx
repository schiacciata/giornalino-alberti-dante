'use client'

import { useSession } from "next-auth/react"
import { Icon } from "./icons"
import { Button } from "./ui/button"
import { UserDialog } from "./user-dialog"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar"


export function SessionIndicator() {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';

    if (session && new Date(session.expires) > new Date()) {
        return (
            <UserDialog user={session.user} />
        )
    }

    return (
        <Link href={'/login'}>
            { isLoading ? 
                <>
                    <Avatar>
                        <AvatarFallback>
                            <Icon icon="spinner" className="mr-0"/>
                        </AvatarFallback>
                    </Avatar>
                </> : 
                <>
                    <Button disabled={isLoading}>
                        <Icon icon="login"/> Login
                    </Button>
                </>
            }
        </Link>
    )
}