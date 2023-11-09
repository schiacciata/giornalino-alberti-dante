import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children?: React.ReactNode
}

export default async function MainLayout({
  children,
}: LayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}