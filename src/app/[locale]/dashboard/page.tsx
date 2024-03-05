import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Shell } from "@/components/dashboard/shell"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth/user"
import { getI18n, getScopedI18n } from "@/lib/i18n/server"
import NewUsersChart from "@/components/dashboard/new-users-chart"
import { getCountInYear } from "@/lib/queries/user"
import StatsCard from "@/components/dashboard/stats-card"
import { db } from "@/lib/db"

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

  const userData = await getCountInYear();

  const postCount = await db.post.count();
  const usersCount = await db.user.count();
  const commentsCount = await db.comment.count();

  return (
    <Shell className="gap-13">
      <Header heading="Dashboard" text={scopedT('homeGreetings', {
        name: user.name
      })}/>
      <p className="max-w-[700px] text-lg text-muted-foreground italic">
        {scopedT('createNew')} <Link className="underline font-bold" href={'/dashboard/posts'}>
          {t('dashboard.sidebar.posts')}
        </Link>
      </p>

      <div className="grid md:grid-cols-3 gap-4 py-4">
        <StatsCard header={t('dashboard.sidebar.posts')} data={postCount} icon="post"/>
        <StatsCard header={t('userMenu.users')} data={usersCount} icon="users"/>
        <StatsCard header={t('comments.heading')} data={commentsCount} icon="message"/>
      </div>

      <NewUsersChart userData={userData}/>
    </Shell>
  )
}
