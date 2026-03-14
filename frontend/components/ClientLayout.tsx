'use client'

import { PropsWithChildren } from 'react'
import { NavBar } from './NavBar'

type ClientLayoutProps = PropsWithChildren<{
  isLoggedIn: boolean
}>

export function ClientLayout({ children, isLoggedIn }: ClientLayoutProps) {
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <main className="container">{children}</main>
    </>
  )
}
