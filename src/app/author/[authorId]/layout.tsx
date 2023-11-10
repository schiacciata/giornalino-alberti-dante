import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

interface AuthorLayoutProps {
  children?: React.ReactNode
}

export default async function AuthorLayout({
  children,
}: AuthorLayoutProps) {

  return (
    <>
      <SiteHeader />
      <div className="flex min-h-screen flex-col space-y-6">
        <div className="container grid flex-1 gap-12">
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <Footer className="border-t" />
      </div>
    </>
  )
}
