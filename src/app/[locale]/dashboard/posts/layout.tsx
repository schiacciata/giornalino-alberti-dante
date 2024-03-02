import { Shell } from "@/components/shell"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { getScopedI18n } from "@/lib/i18n/server"

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const t = await getScopedI18n('posts');

    return (
        <Shell>
            <Header heading={t('heading')} text={t('headingDescription')}>
                <PostCreateButton />
            </Header>
            {children}
        </Shell>
    )
}
