import { SearchParams } from "@/types"
import { getUsers } from "@/lib/queries/user"
import { UserTable } from "@/components/users-table/users-table"
import { Header } from "@/components/header"
import { getScopedI18n } from "@/lib/i18n/server"

export const metadata = {
  title: "Users",
}

export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function UsersPage({ searchParams }: IndexPageProps) {
  const t = await getScopedI18n('users');
  const usersPromise = getUsers(searchParams)

  return (
    <>
      <Header heading={t('heading')} text={t('headingDescription')}>
      </Header>
      <UserTable userPromise={usersPromise} />
    </>
  )
}
