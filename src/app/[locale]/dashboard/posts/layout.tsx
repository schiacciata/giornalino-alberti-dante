import { Shell } from "@/components/dashboard/shell"

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <Shell>
            {children}
        </Shell>
    )
}
