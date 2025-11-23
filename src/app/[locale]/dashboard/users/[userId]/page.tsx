import { notFound, redirect } from "next/navigation"

import authOptions from "@/lib/auth/config"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { Shell } from "@/components/dashboard/shell"
import { PageCreateButton } from "@/components/page/page-create-button"
import { Link } from 'next-view-transitions'
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { isAdmin } from "@/lib/auth/roles"
import { ReactElement } from "react"
import { getPages } from "@/lib/queries/page"
import { SearchParams } from "@/types"
import { PageTable } from "@/components/pages-table/pages-table"
import { cn, formatDate } from "@/lib/utils"
import { getCurrentLocale, getI18n } from "@/lib/i18n/server"
import AdminEditForm from "@/components/user/admin-edit-form"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
    title: "Pages",
}

type UsersPageProps = {
    params: Promise<{
        userId: string;
    }>
    searchParams: SearchParams;
}

export default async function UsersPage(props: UsersPageProps) {
    const params = await props.params;
    const currentUser = await getCurrentUser();
    const locale = await getCurrentLocale();
    const t = await getI18n();

    if (!currentUser || !isAdmin(currentUser)) {
        redirect(authOptions?.pages?.signIn)
    }

    const user = await db.user.findFirst({
        where: {
            id: params.userId,
        },
    });
    if (!user) return notFound();

    const isEditingAdmin = isAdmin(user);

    return (
        <div className="grid gap-4 justify-center items-center">
            <Header
                heading={`Editing ${user.name}`}
                text={`${user.email} - ${t('updatedAt', {
                    updatedAt: user.updatedAt.toLocaleString(locale),
                })}`} />
            <Card className="w-full">
                <CardContent>
                    <AdminEditForm user={{
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        isTwoFactorEnabled: user.isTwoFactorEnabled,
                        role: user.role,
                    }} disabled={isEditingAdmin} />
                </CardContent>
            </Card>
        </div>
    )
}