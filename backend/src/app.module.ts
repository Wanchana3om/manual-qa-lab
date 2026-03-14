import { Module } from '@nestjs/common'
import { ProductsModule } from './products/products.module'
import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'
import { QaModule } from './qa/qa.module'

@Module({
  imports: [ProductsModule, AuthModule, OrdersModule, QaModule]
})
export class AppModule {}
