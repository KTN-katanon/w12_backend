import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly ordersItemRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const user = await this.usersRepository.findOneByOrFail({
      id: createOrderDto.userId,
    });
    const order = new Order();
    order.user = user;
    order.total = 0;
    order.qty = 0;
    order.orderItems = [];
    for (const oi of createOrderDto.orderItems) {
      const orderItem = new OrderItem();
      orderItem.product = await this.productsRepository.findOneByOrFail({
        id: oi.productId,
      });
      orderItem.name = orderItem.product.name;
      orderItem.price = orderItem.product.price;
      orderItem.qty = oi.qty;
      orderItem.total = orderItem.price * orderItem.qty;
      const newOrderItem = await this.ordersItemRepository.save(orderItem);
      order.orderItems.push(newOrderItem);
      order.total += orderItem.total;
      order.qty += orderItem.qty;
    }
    await this.ordersRepository.save(order);
    return await this.ordersRepository.find({
      relations: { orderItems: true, user: true },
    });
  }

  findAll() {
    return this.ordersRepository.find({
      relations: { user: true, orderItems: true },
    });
  }

  findOne(id: number) {
    return this.ordersRepository.findOneOrFail({
      where: { id },
      relations: { user: true, orderItems: true },
    });
  }

  remove(id: number) {
    return this.ordersRepository.delete(id);
  }
}
