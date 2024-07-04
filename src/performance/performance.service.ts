import { UserService } from 'src/user/user.service';
import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Performance } from 'src/entities/Performance';
import { PerformanceTime } from 'src/entities/PerformanceTime';
import { Seats } from 'src/entities/Seats';
import _ from 'lodash';
import { PerformanceSeatDto } from '../performance/dto/performance.create.dto';
import { Order } from 'src/entities/Order';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(PerformanceTime)
    private performanceTimeRepository: Repository<PerformanceTime>,
    @InjectRepository(Seats)
    private seatsRepository: Repository<Seats>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private userService: UserService,
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
  
    const newPerformance = await this.performanceRepository.save({
      userId,
      performanceName,
      performanceDescription,
      categoryId: performanceCategory,
      performanceVenue,
      performanceImage,
    });
  
    const savedPerformanceTimes = await Promise.all(
      performanceTimes.map(async (time) => {
        const newPerformanceTime = this.performanceTimeRepository.create({
          performance: newPerformance,
          performanceDateTimes: [time],
          seatsRemaining: performanceSeats.reduce(
            (acc, seat) => acc + seat.seat_count,
            0,
          ),
        });
        return await this.performanceTimeRepository.save(newPerformanceTime);
      }),
    );
  
    for (const time of savedPerformanceTimes) {
      for (const seat of performanceSeats) {
        if (seat.grade.toLowerCase() === 'standing') {
          const newSeat = this.seatsRepository.create({
            performance: newPerformance,
            performanceTime: time,
            performanceTimeId: time.id,
            seatNumber: Array.from({ length: seat.seat_count }, (_, i) => i + 1),
            isAvailable: true,
            grade: seat.grade,
            price: seat.price,
          });
          await this.seatsRepository.save(newSeat);
        } else {
          const seatNumbers = Array.from(
            { length: seat.seat_count },
            (_, i) => i + 1,
          );
          const newSeat = this.seatsRepository.create({
            performance: newPerformance,
            performanceTime: time,
            performanceTimeId: time.id,
            seatNumber: seatNumbers,
            isAvailable: true,
            grade: seat.grade,
            price: seat.price,
          });
          await this.seatsRepository.save(newSeat);
        }
      }
    }
  
    return newPerformance;
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

  async reserveSeat(
    userId: number,
    performanceId: number,
    grade: string,
    seatCount: number,
    performanceTime: string,
  ) {
    // 사용자 확인
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('없는 유저입니다.');
    }
  
    // 공연 확인
    const performance = await this.performanceRepository.findOne({
      where: { id: performanceId },
    });
    if (!performance) {
      throw new NotFoundException('없는 공연입니다.');
    }
  
    // 공연 시간 확인
    const performanceTimeEntity = await this.performanceTimeRepository.findOne({
      where: {
        performanceId: performance.id,
        performanceDateTimes: performanceTime,
      },
    });
    if (!performanceTimeEntity) {
      throw new NotFoundException('해당 시간의 공연 날짜를 찾을 수 없습니다.');
    }
  
    // 좌석 확인
    const seats = await this.seatsRepository.find({
      where: {
        performanceTimeId: performanceTimeEntity.id,
        grade,
        isAvailable: true,
      },
    });
  
    if (seats.length === 0 || seats[0].seatNumber.length < seatCount) {
      throw new NotAcceptableException('이용 가능한 좌석이 없습니다.');
    }
  
    // 총 가격 계산
    const totalPrice = seats[0].price * seatCount;
    if (user.point < totalPrice) {
      throw new ForbiddenException('포인트가 부족합니다.');
    }
  
    // 트랜잭션 시작
    return await this.seatsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // 포인트 차감
        user.point -= totalPrice;
        await transactionalEntityManager.save(user);
  
        // 좌석 예약 및 결제 정보 저장
        const reservedSeatNumbers = seats[0].seatNumber.slice(0, seatCount);
        const order = this.ordersRepository.create({
          performanceId,
          userId,
          seatNumber: reservedSeatNumbers.join(', '),
          totalPrice,
          paymentStatus: 'paid',
          quantity: seatCount,
        });
        await transactionalEntityManager.save(order);
  
        // 좌석 정보 업데이트
        seats[0].seatNumber = seats[0].seatNumber.slice(seatCount);
        if (seats[0].seatNumber.length === 0) {
          seats[0].isAvailable = false;
        }
        await transactionalEntityManager.save(seats[0]);
  
        // performanceTimeEntity의 좌석 수 업데이트
        performanceTimeEntity.seatsRemaining -= seatCount;
        await transactionalEntityManager.save(performanceTimeEntity);
  
        return order;
      },
    );
  }
  
}
