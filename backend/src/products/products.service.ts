import { Injectable } from '@nestjs/common'
import { mockProducts } from '../common/mock-db'

@Injectable()
export class ProductsService {
  findAll() {
    return mockProducts
  }

  findById(id: number) {
    return mockProducts.find(item => item.id === id)
  }
}
