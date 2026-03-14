'use client'

import { PropsWithChildren } from 'react'
import { NavBar } from './NavBar'

export function ClientLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <main className="container">{children}</main>
    </>
  )
}
