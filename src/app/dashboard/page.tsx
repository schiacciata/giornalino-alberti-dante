import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import Link from "next/link"
import { getCurrentUser, isAdmin } from "@/lib/session"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user || !isAdmin(user)) {
    return notFound()
  }

  return (
    <Shell>
      <Header heading="Dashboard" text={`Welcome, ${user.name}`}/>
      <p className="max-w-[700px] text-lg text-muted-foreground italic">
        Create new <Link className="underline font-bold" href={'/dashboard/posts'}>
          posts
        </Link> or change user <Link className="underline font-bold" href={'/dashboard/settings'}>
          settings
        </Link>
      </p>
    </Shell>
  )
}
