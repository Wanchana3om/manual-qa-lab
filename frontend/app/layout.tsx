import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Manual QA Lab',
  description: 'Simple web app for manual QA practice'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get(AUTH_COOKIE_NAME)?.value === AUTH_COOKIE_VALUE

  return (
    <html lang="en">
      <body>
        <ClientLayout isLoggedIn={isLoggedIn}>{children}</ClientLayout>
      </body>
    </html>
  )
}
