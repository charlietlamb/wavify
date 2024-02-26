'use client'

import { NextUIProvider } from '@nextui-org/react'
export function NextProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>
}

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

import { useUser } from '@/state/user/useUser'

export function StyleProvider({ children }: { children: React.ReactNode }) {
  let user: User | null = null
  try {
    user = useUser()
  } catch {
    user = null
  } finally {
  }
  React.useEffect(() => {
    if (user) {
      document.documentElement.style.setProperty('--primary', user.color)
    } else {
      document.documentElement.style.setProperty('--primary', '48 96% 53%')
    }
  }, [user])

  return <>{children}</>
}
