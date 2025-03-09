import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'สร้าง user ใหม่' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto, description: 'ข้อมูล user' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, callback) => {
          console.log(file);
          const uniqueFileName = Date.now() + extname(file.originalname);
          callback(null, uniqueFileName);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log(file);
    return this.usersService.create({
      ...createUserDto,
      imageUrl: file
        ? '/users-images/' + file.filename
        : '/users-images/unknown.jpg',
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลผู้ใช้' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'ข้อมูลที่ต้องการอัปเดตผู้ใช้',
    type: UpdateUserDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users', // กำหนดที่เก็บไฟล์
        filename: (req, file, callback) => {
          const uniqueFileName = uuidv4() + extname(file.originalname);
          callback(null, uniqueFileName);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, {
      ...updateUserDto,
      imageUrl: file ? '/users-images/' + file.filename : undefined,
    });
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
