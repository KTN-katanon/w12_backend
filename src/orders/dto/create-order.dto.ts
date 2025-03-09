import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNumber, Min } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ description: 'Id สินค้า', example: 1 })
  @IsNumber()
  @Min(1, { message: 'Product Id must more than 1.' })
  productId: number;
  @ApiProperty({ description: 'จำนวนสินค้า', example: 1 })
  @IsNumber()
  @Min(1, { message: 'Qty Id must more than 1.' })
  qty: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Id ผู้ใช้' })
  @IsNumber()
  @Min(1, { message: 'User Id must more than 1.' })
  userId: number;
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  orderItems: OrderItemDto[];
}
