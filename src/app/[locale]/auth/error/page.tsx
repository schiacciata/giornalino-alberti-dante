import { Metadata } from "next"
import { Link } from 'next-view-transitions'

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { LoginForm } from "@/components/auth/login-form"
import { getI18n, getScopedI18n } from "@/lib/i18n/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardContainer } from "@/components/ui/3d-card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Auth Error",
}

export default async function LoginPage() {
    const t = await getI18n();
    const scopedT = await getScopedI18n('errors');

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <Icon icon="back" />
                    {t('back')}
                </>
            </Link>
            <div className={cn("mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]")}>
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <CardContainer>
                        <Card className={cn("rounded-[25px] border")}>
                            <CardHeader>
                                <CardTitle className='flex flex-col space-y-2 text-center'>
                                    <p className="text-2xl font-bold text-red-500">
                                        {scopedT('warning')}
                                    </p>
                                </CardTitle>
                                <Separator/>
                                <CardDescription>
                                    {scopedT('general')}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </CardContainer>
                </div>
            </div>
        </div>
    )
}