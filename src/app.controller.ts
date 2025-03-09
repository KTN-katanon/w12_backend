import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file?: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDefault(): string {
    return 'Default';
  }

  @Get('hello')
  getHello(): string {
    return '<html><body><h1>Hello Buu</h1></body></html>';
  }

  @Delete('world')
  getWorld(): string {
    return '<html><body><h1>Buu World</h1></body></html>';
  }

  @Get('test-query')
  testQuery(
    @Req() req,
    @Query('celsius') celsius: number,
    @Query('type') type: string,
  ) {
    return { celsius: celsius, type: type };
  }

  @Get('test-params/:celsius')
  testParam(@Req() req, @Param('celsius') celsius: number) {
    return {
      celsius,
    };
  }

  @Post('test-body')
  testBody(@Req() req, @Body() body, @Body('celsius') celsius: number) {
    return { celsius };
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          console.log(file);
          const uniqueFileName = uuidv4() + extname(file.originalname);
          callback(null, uniqueFileName);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() body: UploadFileDto,
  ) {
    console.log(file.filename);
  }
}
