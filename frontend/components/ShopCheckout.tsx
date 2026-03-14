'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { checkout, getProducts, Product } from '@/lib/api'

type CartItem = { productId: number; quantity: number }

function calculateDiscount(subtotal: number, couponCode: string) {
  if (couponCode === 'SAVE10') {
    return subtotal * 0.2
  }

  if (couponCode === 'FREESHIP') {
    return 40
  }

  return 0
}

export function ShopCheckout() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState('all')
  const [message, setMessage] = useState('')
  const [customerName, setCustomerName] = useState('Wanchana')
  const [phone, setPhone] = useState('081234567')
  const [address, setAddress] = useState('Bangkok')
  const [couponCode, setCouponCode] = useState('SAVE10')

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setMessage('Load products failed'))

    const raw = localStorage.getItem('qa-cart')
    setCart(raw ? JSON.parse(raw) : [])
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

  const cartDetail = useMemo(() => {
    return cart.map(item => {
      const product = products.find(product => product.id === item.productId)
      return {
        ...item,
        name: product?.name || 'Unknown',
        price: product?.price || 0,
        imageUrl: product?.imageUrl || '',
        subtotal: (product?.price || 0) * item.quantity
      }
    })
  }, [cart, products])

  const subtotal = useMemo(() => cartDetail.reduce((sum, item) => sum + item.subtotal, 0), [cartDetail])
  const discount = useMemo(() => calculateDiscount(subtotal, couponCode), [couponCode, subtotal])
  const estimatedTotal = Math.max(subtotal - discount, 0)
  const phoneInvalid = message === 'Phone number invalid'
  const stockExceeded = message.includes('quantity exceeds stock')
  const checkoutNotice = phoneInvalid || stockExceeded
    ? message
    : 'ลองทดสอบกรณี phone ไม่ครบ 10 หลัก, coupon ผิด, cart ว่าง, quantity เกิน stock'

  const syncCart = (next: CartItem[]) => {
    setCart(next)
    localStorage.setItem('qa-cart', JSON.stringify(next))
  }

  const addToCart = (product: Product) => {
    const next = [...cart]
    const existing = next.find(item => item.productId === product.id)

    if (existing) {
      if (existing.quantity > product.stock) {
        setMessage('Cannot add more than stock')
        return
      }

      existing.quantity += 1
    } else {
      next.push({ productId: product.id, quantity: 1 })
    }

    syncCart(next)
    setMessage(`${product.name} added to cart`)
  }

  const removeItem = (productId: number) => {
    const next = cart.filter(item => item.productId !== productId)
    syncCart(next)
  }

  const onCheckout = async () => {
    setMessage('')

    try {
      const order = await checkout({ customerName, phone, address, couponCode, items: cart })
      localStorage.removeItem('qa-cart')
      setCart([])
      setMessage(`Checkout success. Order #${order.id} total ${order.total} บาท`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Checkout failed')
    }
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="space-between">
          <div>
            <h1>Shop</h1>
            <p className="muted">เลือกสินค้า ดูตะกร้า และ checkout ได้ในหน้าเดียว</p>
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

      <div className="shop-shell">
        <div className="grid grid-3 shop-products">
          {filtered.map(product => (
            <div className="card product-card" key={product.id}>
              <div className="product-image-wrap">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={480}
                  height={320}
                  className="product-image"
                />
              </div>
              <span className="badge">{product.category}</span>
              <h3>{product.name}</h3>
              <p>ราคา: {product.price} บาท</p>
              <p>คงเหลือ: {product.stock}</p>
              <p>Rating: {product.rating}/5</p>
              <button className="btn" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gap: 16 }}>
          <div className="card sticky-card">
            <div className="space-between">
              <div>
                <h2 style={{ marginBottom: 8 }}>Cart</h2>
                <p className="muted" style={{ marginTop: 0 }}>สรุปรายการและยอดก่อนกดซื้อ</p>
              </div>
              <span className="badge">{cartDetail.length} items</span>
            </div>

            {cartDetail.length === 0 ? (
              <p className="muted">ยังไม่มีสินค้าในตะกร้า</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetail.map(item => (
                    <tr key={item.productId}>
                      <td>
                        <div className="cart-product">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={56}
                              height={56}
                              className="cart-thumb"
                            />
                          ) : null}
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.subtotal}</td>
                      <td>
                        <button className="btn danger" onClick={() => removeItem(item.productId)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{subtotal} บาท</strong>
              </div>
              <div className="summary-row">
                <span>Discount preview</span>
                <strong>{discount} บาท</strong>
              </div>
              <div className="summary-row total">
                <span>Estimated total</span>
                <strong>{estimatedTotal} บาท</strong>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Checkout</h2>
            <div className="grid" style={{ gap: 12 }}>
              <input className="input" placeholder="Customer name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              <input className="input" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
              <textarea className="input" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} rows={4} />
              <input className="input" placeholder="Coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
              <button className="btn" onClick={onCheckout}>Checkout</button>
            </div>

            <div style={{ marginTop: 16 }} className={phoneInvalid || stockExceeded ? 'notice error-notice' : 'notice'}>
              {checkoutNotice}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
