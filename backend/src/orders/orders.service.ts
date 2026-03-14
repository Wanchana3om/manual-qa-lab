import { BadRequestException, Injectable } from '@nestjs/common'
import { mockOrders } from '../common/mock-db'
import { ProductsService } from '../products/products.service'

@Injectable()
export class OrdersService {
  constructor(private readonly productsService: ProductsService) {}

  getOrders() {
    return [...mockOrders].sort((a, b) => b.id - a.id)
  }

  checkout(payload: {
    customerName: string
    phone: string
    address: string
    couponCode?: string
    items: Array<{ productId: number; quantity: number }>
  }) {
    if (!payload.customerName || !payload.address) {
      throw new BadRequestException('Customer name and address are required')
    }

    if (!payload.phone || payload.phone.length < 9) {
      throw new BadRequestException('Phone number invalid')
    }

    if (!payload.items?.length) {
      throw new BadRequestException('Cart is empty')
    }

    const detailedItems = payload.items.map(item => {
      const product = this.productsService.findById(item.productId)

      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`)
      }

      if (item.quantity > product.stock) {
        throw new BadRequestException(`Product ${product.name} quantity exceeds stock`)
      }

      return {
        productId: product.id,
        quantity: item.quantity,
        name: product.name,
        price: product.price
      }
    })

    const subtotal = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    let discount = 0

    if (payload.couponCode === 'SAVE10') {
      discount = subtotal * 0.2
    }

    if (payload.couponCode === 'FREESHIP') {
      discount = 40
    }

    const total = Math.max(subtotal - discount, 0)
    const order = {
      id: Number(mockOrders[mockOrders.length - 1]?.id || 1000) + 1,
      customerName: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      couponCode: payload.couponCode,
      total,
      createdAt: new Date().toISOString(),
      items: detailedItems
    }

    mockOrders.push(order)
    return order
  }
}
