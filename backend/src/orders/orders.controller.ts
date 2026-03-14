import { Body, Controller, Get, Post } from '@nestjs/common'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { OrdersService } from './orders.service'

class CheckoutItemDto {
  @IsNumber()
  productId!: number

  @IsNumber()
  quantity!: number
}

class CheckoutDto {
  @IsString()
  customerName!: string

  @IsString()
  phone!: string

  @IsString()
  address!: string

  @IsOptional()
  @IsString()
  couponCode?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[]
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders()
  }

  @Post('checkout')
  checkout(@Body() body: CheckoutDto) {
    return this.ordersService.checkout(body)
  }
}
