import { getSidebar } from "@/config/dashboard"
import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/dashboard/sidebar"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const sections = await getSidebar();

  return (
    <>
      <SiteHeader navbarSections={sections} />
      <div className="flex min-h-screen flex-col space-y-6 border-b">
        <div className="container grid flex-1 md:grid-cols-[200px_1fr] gap-x-5">
          <DashboardNav sections={sections} />
          <main className="flex w-[70vw] flex-1 flex-col overflow-hidden dark:bg-dot-white/[0.2] bg-dot-black/[0.2] justify-center">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
