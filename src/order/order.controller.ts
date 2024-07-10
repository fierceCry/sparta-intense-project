import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { User } from 'src/entities/User.entity';
import { ReservationDto } from './dto/create.reservation.dto';

@ApiTags('ORDER')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * 공연 예매
   * @param reserveSeatDto 
   * @param user 
   * @returns 
   */
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

  /**
   * 공연 예메 확인
   * @param user 
   * @returns 
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('reserve')
  performanceReserve(@UserInfo() user: User) {
    return this.orderService.getPerformanceReserve(user.id);
  }
}
