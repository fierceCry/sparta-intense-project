import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { PerformanceTime } from 'src/entities/PerformanceTime';
import { Seats } from 'src/entities/Seats';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Performance } from 'src/entities/Performance';

@Injectable()
export class OrderService {
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

  async reserveSeat(
    userId: number,
    performanceId: number,
    grade: string,
    seatCount: number,
    performanceTime: string,
  ) {
    const user = await this.validateUser(userId);
    const performance = await this.validatePerformance(performanceId);
    const performanceTimeEntity = await this.validatePerformanceTime(
      performance.id,
      performanceTime,
    );
    const seats = await this.validateSeats(
      performanceTimeEntity.id,
      grade,
      seatCount,
    );
    const totalPrice = this.calculateTotalPrice(seats[0].price, seatCount);
    this.validateUserPoints(user, totalPrice);

    return await this.seatsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await this.deductUserPoints(
          transactionalEntityManager,
          user,
          totalPrice,
        );
        const reservedSeatNumbers = seats[0].seatNumber.slice(0, seatCount);
        const reservedSeatNumbersString = reservedSeatNumbers.map(String); // 변환 추가
        const order = await this.createOrder(
          transactionalEntityManager,
          userId,
          performanceId,
          reservedSeatNumbersString, // 문자열 배열로 전달
          totalPrice,
          seatCount,
        );
        await this.updateSeats(transactionalEntityManager, seats[0], seatCount);
        await this.updatePerformanceTimeSeats(
          transactionalEntityManager,
          performanceTimeEntity,
          seatCount,
        );

        return order;
      },
    );
  }

  async validateUser(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('없는 유저입니다.');
    }
    return user;
  }

  async validatePerformance(performanceId: number) {
    const performance = await this.performanceRepository.findOne({
      where: { id: performanceId },
    });
    if (!performance) {
      throw new NotFoundException('없는 공연입니다.');
    }
    return performance;
  }

  async validatePerformanceTime(
    performanceId: number,
    performanceTime: string,
  ) {
    const performanceTimeEntity = await this.performanceTimeRepository.findOne({
      where: {
        performanceId,
        performanceDateTimes: performanceTime,
      },
    });
    if (!performanceTimeEntity) {
      throw new NotFoundException('해당 시간의 공연 날짜를 찾을 수 없습니다.');
    }
    return performanceTimeEntity;
  }

  async validateSeats(
    performanceTimeId: number,
    grade: string,
    seatCount: number,
  ) {
    const seats = await this.seatsRepository.find({
      where: {
        performanceTimeId,
        grade,
        isAvailable: true,
      },
    });

    if (seats.length === 0 || seats[0].seatNumber.length < seatCount) {
      throw new NotAcceptableException('이용 가능한 좌석이 없습니다.');
    }
    return seats;
  }

  calculateTotalPrice(price: number, seatCount: number){
    return price * seatCount;
  }

  validateUserPoints(user: any, totalPrice: number) {
    if (user.point < totalPrice) {
      throw new ForbiddenException('포인트가 부족합니다.');
    }
  }

  async deductUserPoints(
    transactionalEntityManager: any,
    user: any,
    totalPrice: number,
  ) {
    user.point -= totalPrice;
    await transactionalEntityManager.save(user);
  }

  async createOrder(
    transactionalEntityManager: any,
    userId: number,
    performanceId: number,
    reservedSeatNumbers: string[],
    totalPrice: number,
    seatCount: number,
  ) {
    const order = this.ordersRepository.create({
      performanceId,
      userId,
      seatNumber: reservedSeatNumbers.join(', '),
      totalPrice,
      paymentStatus: 'paid',
      quantity: seatCount,
    });
    await transactionalEntityManager.save(order);
    return order;
  }

  async updateSeats(
    transactionalEntityManager: any,
    seats: Seats,
    seatCount: number,
  ) {
    seats.seatNumber = seats.seatNumber.slice(seatCount);
    if (seats.seatNumber.length === 0) {
      seats.isAvailable = false;
    }
    await transactionalEntityManager.save(seats);
  }

  async updatePerformanceTimeSeats(
    transactionalEntityManager: any,
    performanceTimeEntity: PerformanceTime,
    seatCount: number,
  ) {
    performanceTimeEntity.seatsRemaining -= seatCount;
    await transactionalEntityManager.save(performanceTimeEntity);
  }

  async getPerformanceReserve(userId: number) {
    const data = await this.ordersRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return data;
  }
}
