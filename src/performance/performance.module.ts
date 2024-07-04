import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Performance } from 'src/entities/Performance';
import { PerformanceTime } from 'src/entities/PerformanceTime';
import { Seats } from 'src/entities/Seats';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/entities/User';
import { Order } from 'src/entities/Order';

@Module({
  imports: [
    TypeOrmModule.forFeature([Performance, PerformanceTime, Seats, User, Order]),
    UserModule
  ],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
