import { SiteHeader } from "@/components/site-header"

interface AuthorLayoutProps {
  children?: React.ReactNode
}

export default async function AuthorLayout({
  children,
}: AuthorLayoutProps) {

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col space-y-6">
        <div className="container grid flex-1 gap-12">
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
