import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'ชื่อสินค้า', example: 'Latte' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'ราคาสินค้า', example: 120, minimum: 0 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'id ของ type', example: 1, minimum: 0 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  typeId: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'รูปภาพสินค้า',
    required: false,
  })
  @IsOptional()
  file?: string;
}
