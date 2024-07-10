import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceTime } from 'src/entities/PerformanceTime.entity';
import { Performance } from 'src/entities/Performance.entity';
import { Seats } from 'src/entities/Seats.entity';
import { Order } from 'src/entities/Order.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Performance, PerformanceTime, Seats, Order]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
