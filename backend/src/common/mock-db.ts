export const mockUsers = [
  { id: 1, username: 'tester', password: '1234', displayName: 'QA Tester' },
  { id: 2, username: 'admin', password: 'admin123', displayName: 'Admin User' }
]

export const mockProducts = [
  { id: 1, name: 'cola', category: 'drink', price: 20, stock: 10, rating: 4.3 },
  { id: 2, name: 'Orange Juice', category: 'drink', price: 35, stock: 5, rating: 4.7 },
  { id: 3, name: 'Potato Chips', category: 'snack', price: 30, stock: 8, rating: 4.1 },
  { id: 4, name: 'Banana', category: 'fruit', price: 12, stock: 20, rating: 4.9 },
  { id: 5, name: 'Apple', category: 'fruit', price: 25, stock: 7, rating: 4.4 },
  { id: 6, name: 'Cookie Box', category: 'snack', price: 100, stock: 3, rating: 4.8 }
]

export const mockOrders: any[] = [
  {
    id: 1001,
    customerName: 'Demo User',
    phone: '0899999999',
    address: 'Bangkok',
    couponCode: '',
    total: 55,
    createdAt: '2026-03-14T10:30:00.000Z',
    items: [
      { productId: 1, quantity: 1, name: 'cola', price: 20 },
      { productId: 2, quantity: 1, name: 'Orange Juice', price: 35 }
    ]
  }
]
