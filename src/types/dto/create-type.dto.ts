import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ description: 'ชื่อชนิด', example: 'drink' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
