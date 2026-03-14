'use client'

import { useEffect, useMemo, useState } from 'react'
import { getProducts, Product } from '@/lib/api'

type CartRow = { productId: number; quantity: number }

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState('all')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setMessage('Load products failed'))
  }, [])

  const filtered = useMemo(() => {
    let data = [...products]

    if (search) {
      data = data.filter(item => item.name.includes(search))
    }

    if (category !== 'all') {
      data = data.filter(item => item.category === category)
    }

    if (sort === 'price-asc') {
      data = data.sort((a, b) => String(a.price).localeCompare(String(b.price)))
    }

    if (sort === 'price-desc') {
      data = data.sort((a, b) => b.price - a.price)
    }

    return data
  }, [products, search, sort, category])

  const addToCart = (product: Product) => {
    const raw = localStorage.getItem('qa-cart')
    const cart: CartRow[] = raw ? JSON.parse(raw) : []
    const existing = cart.find(item => item.productId === product.id)

    if (existing) {
      if (existing.quantity > product.stock) {
        setMessage('Cannot add more than stock')
        return
      }
      existing.quantity += 1
    } else {
      cart.push({ productId: product.id, quantity: 1 })
    }

    localStorage.setItem('qa-cart', JSON.stringify(cart))
    setMessage(`${product.name} added to cart`)
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="space-between">
          <div>
            <h1>Shop</h1>
            <p className="muted">ทดสอบการค้นหา sort และเพิ่มสินค้าเข้าตะกร้า</p>
          </div>
          <span className="badge">6 mock products</span>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <input className="input" placeholder="Search product name" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
          <select className="select" value={category} onChange={e => setCategory(e.target.value)} style={{ width: 180 }}>
            <option value="all">All categories</option>
            <option value="drink">Drink</option>
            <option value="snack">Snack</option>
            <option value="fruit">Fruit</option>
          </select>
          <select className="select" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 180 }}>
            <option value="default">Default</option>
            <option value="price-asc">Price ต่ำไปสูง</option>
            <option value="price-desc">Price สูงไปต่ำ</option>
          </select>
        </div>
      </div>

      {!!message && <div className="notice">{message}</div>}

      <div className="grid grid-3">
        {filtered.map(product => (
          <div className="card product-card" key={product.id}>
            <span className="badge">{product.category}</span>
            <h3>{product.name}</h3>
            <p>ราคา: {product.price} บาท</p>
            <p>คงเหลือ: {product.stock}</p>
            <p>Rating: {product.rating}/5</p>
            <button className="btn" onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
