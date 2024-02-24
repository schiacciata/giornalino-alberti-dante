import { SiteHeader } from "@/components/site-header"

interface BlogLayoutProps {
  children?: React.ReactNode
}

export default async function BlogLayout({
  children,
}: BlogLayoutProps) {

  return (
    <>
      <SiteHeader />
      <div className="flex h-full flex-col space-y-6">
        <div className="container grid flex-1 gap-12">
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
