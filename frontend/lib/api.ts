const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
}

export type CartItem = {
  productId: number
  quantity: number
}

export type Order = {
  id: number
  customerName: string
  phone: string
  address: string
  couponCode?: string
  total: number
  createdAt: string
  items: Array<{ productId: number; quantity: number; name: string; price: number }>
}

export async function getProducts(params?: Record<string, string>) {
  const search = params ? `?${new URLSearchParams(params).toString()}` : ''
  const res = await fetch(`${API_URL}/products${search}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Cannot load products')
  return (await res.json()) as Product[]
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function checkout(payload: {
  customerName: string
  phone: string
  address: string
  couponCode?: string
  items: CartItem[]
}) {
  const res = await fetch(`${API_URL}/orders/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Checkout failed' }))
    throw new Error(error.message || 'Checkout failed')
  }

  return res.json() as Promise<Order>
}

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Cannot load orders')
  return (await res.json()) as Order[]
}

export async function getQaChallenges() {
  const res = await fetch(`${API_URL}/qa/challenges`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Cannot load QA challenges')
  return res.json()
}
