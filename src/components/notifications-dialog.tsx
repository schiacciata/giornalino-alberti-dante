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
    serviceWorker: SWContext
}

export function NotificationsDialog({ serviceWorker }: NotificationsDialogProps) {
    const isDenied = serviceWorker.permission === "denied";

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Do you want to enable push notifications?</AlertDialogTitle>
                <AlertDialogDescription>
                    {isDenied ? 'Notification for this website are disabled, reenable them in your browser settings' : 'We will notify you whenever a new post is published'}
                </AlertDialogDescription>
            </AlertDialogHeader>
            {isDenied ? null : (
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => await serviceWorker.requestNotificationPermission()}>Enable</AlertDialogAction>
                </AlertDialogFooter>
            )}
        </AlertDialogContent>
    )
}