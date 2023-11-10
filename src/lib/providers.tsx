'use client'

import { RootLayoutProps } from '@/types/layout'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from "next-themes"
import { I18nProviderClient } from './i18n/client'

export function Providers({
  children,
  params
}: RootLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <I18nProviderClient locale={params.locale}>
          {children}
        </I18nProviderClient>
      </SessionProvider>
    </ThemeProvider>
  )
}