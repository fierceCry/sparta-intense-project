import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Performance } from 'src/entities/Performance.entity';
import { PerformanceTime } from 'src/entities/PerformanceTime.entity';
import { Seats } from 'src/entities/Seats.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/entities/User.entity';
import { Order } from 'src/entities/Order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Performance, PerformanceTime, Seats, User, Order]),
    UserModule
  ],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
