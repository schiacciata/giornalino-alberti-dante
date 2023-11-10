import config from "@/config/dashboard"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
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
      <div className="flex min-h-screen flex-col space-y-6">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav sections={config.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <Footer className="border-t" />
      </div>
    </>
  )
}
