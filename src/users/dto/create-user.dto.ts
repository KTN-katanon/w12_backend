/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsIn,
  IsNumber,
  Min,
  Max,
  IsArray,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'อีเมลสำหรับเข้าสู่ระบบ',
    example: 'user@example.com',
  })
  @IsEmail()
  login: string;

  @ApiProperty({
    description: 'รหัสผ่าน (ต้องมีความยาว 8-32 ตัวอักษร)',
    example: 'StrongPass123!',
    minLength: 8,
    maxLength: 32,
  })
  @IsNotEmpty()
  @Length(8, 32)
  password: string;

  // @IsArray()
  // @ApiProperty({ description: 'บทบาทของผู้ใช้', example: ['admin', 'user'], isArray: true })
  // roles: ('admin' | 'user')[];

  @ApiProperty({
    description: 'เพศของผู้ใช้',
    example: 'male',
    enum: ['male', 'female'],
  })
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @ApiProperty({
    description: 'อายุของผู้ใช้ (ค่าต้องอยู่ระหว่าง 1 ถึง 120 ปี)',
    example: 25,
    minimum: 1,
    maximum: 120,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  @ApiProperty({
    description: 'ชุด role ids',
    example: [1, 2],
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((val) => parseInt(val, 10));
    } else {
      return [parseInt(value, 10)];
    }
  })
  @IsArray()
  @IsInt({ each: true })
  roleIds: number[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'รูปภาพสินค้า',
    required: false,
  })
  @IsOptional()
  file?: string;
}
