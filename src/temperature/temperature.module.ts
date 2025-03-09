import { Module } from '@nestjs/common';
import { TemperatureController } from './temperature.controller';
import { TemperatureService } from './temperature.service';

@Module({
  imports: [],
  exports: [],
  controllers: [TemperatureController],
  providers: [TemperatureService],
})
export class TemperatureModule {}
