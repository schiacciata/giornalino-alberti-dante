import { Link } from 'next-view-transitions'

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icons"
import { RegisterForm } from "@/components/auth/register-form"
import { getI18n, getScopedI18n } from "@/lib/i18n/server"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default async function RegisterPage() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('register');

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icon icon="logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {scopedT('createAccount')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {scopedT('enterEmail')}
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {scopedT('privacyAgree')}
            {" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              {scopedT('termsOfService')}
            </Link>
            {` & `}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              {scopedT('privacyPolicy')}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}