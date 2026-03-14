import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manual QA Lab',
  description: 'Simple web app for manual QA practice'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
