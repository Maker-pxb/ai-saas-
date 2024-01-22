import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI platform',
  description: 'AI platform',
  icons: {
    icon: '/assets/logo.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body suppressHydrationWarning={true} className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
