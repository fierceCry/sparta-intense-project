import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { User } from 'src/entities/User';
import { ReservationDto } from './dto/create.reservation.dto';

@ApiTags('ORDER')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '공연 예매' })
  @ApiResponse({
    schema: {
      example: {
        userId: 1,
        performanceId: 3,
        seatNumber: '1, 2',
        quantity: 2,
        totalPrice: 30000,
        paymentStatus: 'paid',
        id: 18,
        createdAt: '2024-07-04T11:49:16.185Z',
        updatedAt: '2024-07-04T11:49:16.185Z',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('reserve')
  async reserveSeat(
    @Body()
    reserveSeatDto: ReservationDto,
    @UserInfo() user: User,
  ) {
    return this.orderService.reserveSeat(
      user.id,
      reserveSeatDto.performanceId,
      reserveSeatDto.grade,
      reserveSeatDto.seatCount,
      reserveSeatDto.performanceTime,
    );
  }

  @ApiOperation({ summary: '공연 예매확인' })
  @ApiResponse({
    schema: {
      example: {
        id: 23,
        userId: 1,
        performanceId: 3,
        seatNumber: '11, 12',
        quantity: 2,
        totalPrice: 30000,
        paymentStatus: 'paid',
        createdAt: '2024-07-05T07:22:57.528Z',
        updatedAt: '2024-07-05T07:22:57.528Z',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('reserve')
  performanceReserve(@UserInfo() user: User) {
    return this.orderService.getPerformanceReserve(user.id);
  }
}
