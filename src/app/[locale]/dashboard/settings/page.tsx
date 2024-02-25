import { redirect } from "next/navigation"

import authOptions from "@/lib/auth/config"
import { getCurrentUser } from "@/lib/auth/user"
import { UserUpdateForm } from "@/components/user-name-form"
import Social from "@/components/auth/social"
import { getAccountsByUserId } from "@/lib/queries/account"
import { Account } from "@prisma/client"
import AccountCard from "@/components/account-card"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
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
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Linked accounts
        </h1>
        <div className="py-4 grid justify-center md:grid-cols-2 gap-2 w-fit">
          {formattedAccounts.map(account => (<AccountCard account={account} key={account.provider} />))}
          <Social linkedAccounts={formattedAccounts} />
        </div>
      </div>
    </>
  )
}
