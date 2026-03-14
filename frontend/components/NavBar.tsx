'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AUTH_COOKIE_NAME } from '@/lib/auth'

type NavBarProps = {
  isLoggedIn: boolean
}

export function NavBar({ isLoggedIn }: NavBarProps) {
  const router = useRouter()

  const onLogout = () => {
    localStorage.removeItem('qa-user')
    localStorage.removeItem('qa-cart')
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link href="/shop">Shop</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/qa-challenge">QA Challenge</Link>
          <button className="nav-action" type="button" onClick={onLogout}>Logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  )
}
