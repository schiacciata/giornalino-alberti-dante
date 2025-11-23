import { getSidebar } from "@/config/dashboard"
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardSidebar } from "@/components/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import DashboardBreadcrumbs from "@/components/dashboard/dashboard-breadcrumbs"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const sections = await getSidebar();

  return (
    <SidebarProvider>
      <DashboardSidebar
        items={sections}
      />
      <SidebarInset className="overflow-hidden dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadcrumbs />
          </div>
        </header>
        <div className="container grid flex md:grid-cols-[200px_1fr] gap-x-5 overflow-x-hidden md:overflow-visible">
          <main className="flex md:min-w-[70vw] w-full flex-col justify-center overflow-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
