import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Performance } from 'src/entities/Performance';
import { PerformanceTime } from 'src/entities/PerformanceTime';
import { Seats } from 'src/entities/Seats';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET_KEY'),
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forFeature([Performance, PerformanceTime, Seats]),
  ],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
