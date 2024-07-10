import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Performance } from 'src/entities/Performance.entity';
import { PerformanceTime } from 'src/entities/PerformanceTime.entity';
import { Seats } from 'src/entities/Seats.entity';
import _ from 'lodash';
import { PerformanceSeatDto } from '../performance/dto/performance.create.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(PerformanceTime)
    private performanceTimeRepository: Repository<PerformanceTime>,
    @InjectRepository(Seats)
    private seatsRepository: Repository<Seats>,
  ) {}

  async createPerformance(
    userId: number,
    userRole: string,
    performanceName: string,
    performanceDescription: string,
    performanceCategory: number,
    performanceVenue: string,
    performanceImage: string,
    performanceTimes: string[],
    performanceSeats: PerformanceSeatDto[],
  ) {
    if (userRole !== 'admin') {
      throw new ForbiddenException('관리자만 공연을 등록할 수 있습니다.');
    }

    const newPerformance = await this.createPerformanceEntity(
      userId,
      performanceName,
      performanceDescription,
      performanceCategory,
      performanceVenue,
      performanceImage,
    );

    const savedPerformanceTimes = await this.createPerformanceTimes(
      newPerformance,
      performanceTimes,
      performanceSeats,
    );

    await this.createSeatsForPerformanceTimes(
      newPerformance,
      savedPerformanceTimes,
      performanceSeats,
    );

    return newPerformance;
  }

  async createPerformanceEntity(
    userId: number,
    performanceName: string,
    performanceDescription: string,
    performanceCategory: number,
    performanceVenue: string,
    performanceImage: string,
  ) {
    return await this.performanceRepository.save({
      userId,
      performanceName,
      performanceDescription,
      categoryId: performanceCategory,
      performanceVenue,
      performanceImage,
    });
  }

  async createPerformanceTimes(
    performance: Performance,
    performanceTimes: string[],
    performanceSeats: PerformanceSeatDto[],
  ) {
    return await Promise.all(
      performanceTimes.map(async (time) => {
        const newPerformanceTime = this.performanceTimeRepository.create({
          performance: performance,
          performanceDateTimes: [time],
          seatsRemaining: performanceSeats.reduce(
            (acc, seat) => acc + seat.seat_count,
            0,
          ),
        });
        return await this.performanceTimeRepository.save(newPerformanceTime);
      }),
    );
  }

  async createSeatsForPerformanceTimes(
    performance: Performance,
    performanceTimes: PerformanceTime[],
    performanceSeats: PerformanceSeatDto[],
  ) {
    for (const time of performanceTimes) {
      for (const seat of performanceSeats) {
        await this.createSeats(performance, time, seat);
      }
    }
  }

  async createSeats(
    performance: Performance,
    performanceTime: PerformanceTime,
    seat: PerformanceSeatDto,
  ) {
    const seatNumbers = Array.from(
      { length: seat.seat_count },
      (_, i) => i + 1,
    );
    const newSeat = this.seatsRepository.create({
      performance: performance,
      performanceTime: performanceTime,
      performanceTimeId: performanceTime.id,
      seatNumber: seatNumbers,
      isAvailable: true,
      grade: seat.grade,
      price: seat.price,
    });
    await this.seatsRepository.save(newSeat);
  }

  async getAllPerformances(categoryId: number) {
    if (!categoryId) {
      return this.performanceRepository.find();
    }
    const performancesData = await this.performanceRepository.find({
      where: { categoryId },
    });
    if (performancesData.length === 0) {
      throw new NotFoundException('찾는 카테고리가 없습니다.');
    }
    return performancesData;
  }

  async getPerformance(performanceName: string) {
    const performances = await this.performanceRepository.find({
      where: { performanceName: Like(`%${performanceName}%`) },
    });
    if (performances.length === 0) {
      throw new NotAcceptableException('찾는 공연이 없습니다.');
    }
    return performances;
  }

  async getPerformanceById(performanceId: number) {
    const performanceData = await this.performanceRepository.findOne({
      relations: ['performanceTimes'],
      where: { id: performanceId },
    });

    if (!performanceData) {
      throw new NotFoundException('없는 공연입니다.');
    }

    return performanceData;
  }
}
