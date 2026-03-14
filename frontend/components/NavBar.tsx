import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/shop">Shop</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/qa-challenge">QA Challenge</Link>
    </nav>
  )
}
