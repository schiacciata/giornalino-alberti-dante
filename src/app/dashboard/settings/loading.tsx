import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

export default function DashboardSettingsLoading() {
  return (
    <Shell>
      <Header
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </Shell>
  )
}
