import { redirect } from "next/navigation"

import authOptions from "@/lib/auth/config"
import { getCurrentUser } from "@/lib/auth/user"
import { UserUpdateForm } from "@/components/user-name-form"
import Social from "@/components/auth/social"
import { getAccountsByUserId } from "@/lib/queries/account"
import { Account } from "@prisma/client"
import AccountCard from "@/components/account/account-card"
import { getScopedI18n } from "@/lib/i18n/server"
import { Header } from "@/components/header"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const scopedT = await getScopedI18n('accounts');
  const user = await getCurrentUser()

  if (!user || !user.id) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const accounts = await getAccountsByUserId(user.id);
  const formattedAccounts: Pick<Account, 'provider' | 'providerAccountId'>[] = (accounts || [])
    .map((account) => {
      return {
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      };
    })

  return (
    <>
      <UserUpdateForm user={{ name: user.name || "" }} />
      <div>
        <Header heading={scopedT('heading')} text={scopedT('headingDescription')} />
        
        <div className="py-4 grid justify-center md:grid-cols-2 gap-2 w-fit">
          {formattedAccounts.map(account => (<AccountCard account={account} key={account.provider} />))}
          <Social linkedAccounts={formattedAccounts} />
        </div>
      </div>
    </>
  )
}
