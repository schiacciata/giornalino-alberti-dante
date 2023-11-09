'use client'

import { RootLayoutProps } from '@/types/layout'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from "next-themes"

export function Providers({
  children,
}: RootLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>  
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}