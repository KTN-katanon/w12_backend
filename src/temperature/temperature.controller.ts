import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TemperatureService } from './temperature.service';

@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}
  @Get('convert')
  convert(@Query('celsius') celsius: string) {
    return this.temperatureService.convert(parseFloat(celsius));
  }
  @Post('convert')
  convertByPost(@Body('celsius') celsius: number) {
    return this.temperatureService.convert(celsius);
  }
  @Get('convert/:celsius')
  convertByParam(@Param('celsius') celsius: string) {
    return this.temperatureService.convert(parseFloat(celsius));
  }
}
