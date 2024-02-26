import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './tailwind.css'
import './globals.css'
import { cn } from '../lib/utils'
import { NextProvider, StyleProvider, ThemeProvider } from './providers'
import 'react-image-crop/dist/ReactCrop.css'
import getUser from './actions/getUser'
import Navbar from '@/components/nav/Navbar'
import AppNavBar from '@/components/nav/AppNavBar'
import { ModalProvider } from '@/components/providers/ModalProvider'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import StoreProvider from '@/components/providers/StoreProvider'
import FloatingMenu from '@/components/nav/FloatingMenu'
import Application from '@/components/Application'
export const metadata: Metadata = {
  title: 'Wavify',
  description: 'Generated by create next app',
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body
        className={cn(
          'debug-screens flex min-h-screen flex-col bg-background antialiased'
        )}
      >
        <NextProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="wavify-theme"
            >
              <StyleProvider>
                {!user ? (
                  <div className="flex h-screen w-full flex-col">
                    <header className="flex min-h-[100h] w-screen bg-background">
                      <Navbar></Navbar>
                    </header>
                    <main className=" relative flex w-[100%] flex-grow bg-background_content">
                      {children}
                    </main>
                  </div>
                ) : (
                  <StoreProvider user={user}>
                    <div className="flex h-screen flex-col">
                      <ModalProvider />
                      <header className=" w-full bg-background">
                        <AppNavBar user={user}></AppNavBar>
                      </header>
                      <Application>{children}</Application>
                    </div>
                  </StoreProvider>
                )}
              </StyleProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </NextProvider>
      </body>
    </html>
  )
}
