import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  return (
    <Shell>
      <Header heading="Dashboard" text="what."/>
    </Shell>
  )
}
