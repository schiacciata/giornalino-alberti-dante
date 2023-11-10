import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { UserAuthForm } from "@/components/auth-form"
import { getI18n, getScopedI18n } from "@/lib/i18n/server"

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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icon icon="logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {scopedT('welcomeBack')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {scopedT('emailLabel')}
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              {scopedT('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}