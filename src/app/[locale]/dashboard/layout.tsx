import config from "@/config/dashboard"
import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/sidebar"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <SiteHeader navbarSections={config.sidebarNav} onlyMobile={true} />
      <div className="flex min-h-screen flex-col space-y-6 border-b">
        <div className="container grid flex-1 md:grid-cols-[200px_1fr]">
          <aside className="hidden h-screen md:flex flex-col w-[200px] border-r bg-background fixed inset-y-15 left-0 z-0">
            <DashboardNav sections={config.sidebarNav} />
          </aside>
          <main className="flex md:pl-20 w-[70vw] flex-1 flex-col overflow-hidden dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
