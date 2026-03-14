import { getOrders } from '@/lib/api'

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="card">
      <h1>Orders</h1>
      <p className="muted">ดูผลหลัง checkout</p>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.phone}</td>
              <td>{order.total}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
