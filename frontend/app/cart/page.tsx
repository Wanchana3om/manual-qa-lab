'use client'

import { useEffect, useMemo, useState } from 'react'
import { checkout, getProducts, Product } from '@/lib/api'

type CartItem = { productId: number; quantity: number }

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [message, setMessage] = useState('')
  const [customerName, setCustomerName] = useState('Wanchana')
  const [phone, setPhone] = useState('081234567')
  const [address, setAddress] = useState('Bangkok')
  const [couponCode, setCouponCode] = useState('SAVE10')

  useEffect(() => {
    getProducts().then(setProducts)
    const raw = localStorage.getItem('qa-cart')
    setCart(raw ? JSON.parse(raw) : [])
  }, [])

  const cartDetail = useMemo(() => {
    return cart.map(item => {
      const product = products.find(product => product.id === item.productId)
      return {
        ...item,
        name: product?.name || 'Unknown',
        price: product?.price || 0,
        subtotal: (product?.price || 0) * item.quantity
      }
    })
  }, [cart, products])

  const subtotal = useMemo(() => cartDetail.reduce((sum, item) => sum + item.subtotal, 0), [cartDetail])

  const removeItem = (productId: number) => {
    const next = cart.filter(item => item.productId !== productId)
    setCart(next)
    localStorage.setItem('qa-cart', JSON.stringify(next))
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
    <div className="grid grid-2">
      <div className="card">
        <h1>Cart</h1>
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
                  <td>{item.name}</td>
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
        <p><strong>Subtotal:</strong> {subtotal} บาท</p>
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

        <div style={{ marginTop: 16 }} className="notice">
          ลองทดสอบกรณี phone ไม่ครบ 10 หลัก, coupon ผิด, cart ว่าง, quantity เกิน stock
        </div>

        {!!message && <p>{message}</p>}
      </div>
    </div>
  )
}
