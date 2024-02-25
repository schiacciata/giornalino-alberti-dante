import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { getScopedI18n } from "@/lib/i18n/server"
import { RootLayoutProps } from "@/types/layout"

export default async function DashboardSettingsLayout({ children }: RootLayoutProps) {
    const scopedT = await getScopedI18n('settings');

    return (
        <Shell>
        <Header
            heading={scopedT('heading')}
            text={scopedT('headingDescription')}
        />
        <div className="grid md:grid-cols-2 gap-12">
            {children}
        </div>
        </Shell>
    )
}
