import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth/user"
import { getI18n, getScopedI18n } from "@/lib/i18n/server"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('dashboard');
  const user = await getCurrentUser();

  if (!user) {
    return notFound()
  }

  return (
    <Shell>
      <Header heading="Dashboard" text={scopedT('homeGreetings', {
        name: user.name
      })}/>
      <p className="max-w-[700px] text-lg text-muted-foreground italic">
        {scopedT('createNew')} <Link className="underline font-bold" href={'/dashboard/posts'}>
          {t('dashboard.sidebar.posts')}
        </Link>
      </p>
    </Shell>
  )
}
