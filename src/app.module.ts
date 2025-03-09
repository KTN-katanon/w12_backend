import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureModule } from './temperature/temperature.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { TypesModule } from './types/types.module';
import { Type } from './types/entities/type.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/orderItem.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/products'),
      serveRoot: '/products-images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/users'),
      serveRoot: '/users-images',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydb.sqlite',
      entities: [User, Product, Type, Role, Order, OrderItem],
      synchronize: true,
    }),
    TemperatureModule,
    UsersModule,
    ProductsModule,
    TypesModule,
    RolesModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
