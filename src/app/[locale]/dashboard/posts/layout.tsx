import { Shell } from "@/components/shell"

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
