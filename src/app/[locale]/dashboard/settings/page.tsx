import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth/options"
import { getCurrentUser } from "@/lib/auth/user"
import { UserUpdateForm } from "@/components/user-name-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
      <>
        <UserUpdateForm user={{ name: user.name || "" }} />
      </>
  )
}
