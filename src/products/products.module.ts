import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'src/types/entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Type])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
