import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { LoginForm } from "@/components/auth/login-form"
import { getI18n, getScopedI18n } from "@/lib/i18n/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardContainer } from "@/components/ui/3d-card"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('login');
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
                <Icon icon="logo" />
                <p className="text-2xl font-semibold">
                  {scopedT('welcomeBack')}
                </p>
              </CardTitle>
              <CardDescription>
                {scopedT('emailLabel')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <p className="px-8 pt-4 text-center text-sm text-muted-foreground">
                <Link
                  href="/register"
                  className="hover:text-brand underline underline-offset-4"
                >
                  {scopedT('signUp')}
                </Link>
              </p>
            </CardContent>
          </Card>
          </CardContainer>
        </div>
      </div>
    </div>
  )
}