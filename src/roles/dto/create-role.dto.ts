import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'ชื่อบทบาท', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
