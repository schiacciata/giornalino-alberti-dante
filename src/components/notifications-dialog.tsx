'use client'

import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { SWContext } from "@/lib/providers/sw"

type NotificationsDialogProps = {
    sw: SWContext
}

export function NotificationsDialog({ sw }: NotificationsDialogProps) {
    const isDenied = sw.permission === "denied";

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Do you want to enable push notifications?</AlertDialogTitle>
                <AlertDialogDescription>
                    {isDenied ? 'Notification for this website are disabled, reenable them in your browser settings' : 'We will notify you whenever a new post is published'}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {isDenied ? null : (
                        <AlertDialogAction onClick={async () => await sw.requestNotificationPermission()}>Enable</AlertDialogAction>
                )}
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}