import { Controller, Get } from '@nestjs/common'

@Controller('qa')
export class QaController {
  @Get('challenges')
  getChallenges() {
    return {
      requirements: [
        'User should login with valid username/password',
        'User can search products by product name',
        'User can sort products by price ascending and descending',
        'User can add products to cart and checkout',
        'Coupon SAVE10 should discount 10% of subtotal',
        'Phone number should be exactly 10 digits before checkout success'
      ],
      testScenarios: [
        {
          id: 'TC-001',
          title: 'Login with correct credential',
          expected: 'User login success and sees success message'
        },
        {
          id: 'TC-002',
          title: 'Search with lowercase and uppercase product names',
          expected: 'Should find same product regardless of case'
        },
        {
          id: 'TC-003',
          title: 'Apply coupon SAVE10 on subtotal 100',
          expected: 'Discount should be 10 and total should be 90'
        },
        {
          id: 'TC-004',
          title: 'Checkout with phone less than 10 digits',
          expected: 'System should reject checkout'
        },
        {
          id: 'TC-005',
          title: 'Sort by price ascending',
          expected: 'Products should be arranged from lowest numeric price to highest'
        }
      ],
      bugHints: [
        'ลองพิมพ์ค้นหาสินค้าแบบพิมพ์เล็กและพิมพ์ใหญ่',
        'ลองคิดเลข total เมื่อใช้ coupon SAVE10',
        'ลองเพิ่มสินค้าที่ stock น้อยหลายครั้ง',
        'ลองเช็กการเรียงราคาสินค้า 12, 20, 100',
        'ลอง checkout ด้วยเบอร์โทร 9 หลัก'
      ]
    }
  }
}
