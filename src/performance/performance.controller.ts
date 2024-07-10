import { AuthGuard } from '@nestjs/passport';
import { CreatePerformanceDto } from './dto/performance.create.dto';
import { PerformanceService } from './performance.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { User } from 'src/entities/User.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('PERFORMANCE')
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  /**
   * 공연 등록 
   * @param performance 
   * @param user 
   * @returns 
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  createPerformance(
    @Body() performance: CreatePerformanceDto,
    @UserInfo() user: User,
  ) {
    const {
      performanceName,
      performanceDescription,
      performanceCategory,
      performanceVenue,
      performanceImage,
      performanceTime,
      performanceSeats,
    } = performance;
    return this.performanceService.createPerformance(
      user.id,
      user.role,
      performanceName,
      performanceDescription,
      performanceCategory,
      performanceVenue,
      performanceImage,
      performanceTime,
      performanceSeats,
    );
  }

  /**
   * 공연 카테고리 조회
   * @param categoryId 
   * @returns 
   */
  @Get(':categoryId')
  getAllPerformances(@Param('categoryId') categoryId: number) {
    return this.performanceService.getAllPerformances(categoryId);
  }

  /**
   * 공연 검색
   * @param performanceName 
   * @returns 
   */
  @ApiNotFoundResponse({
    schema: {
      example: {
        status: 406,
        message: '찾는 공연이 없습니다.',
      },
    },
  })
  @Get('search/:performanceName')
  getPerformance(@Param('performanceName') performanceName: string) {
    return this.performanceService.getPerformance(performanceName);
  }

  /**
   * 공연 상세 조회
   * @param performanceId 
   * @returns 
   */
  @Get('detail/:performanceId')
  getPerformanceId(@Param('performanceId') performanceId: number) {
    return this.performanceService.getPerformanceById(performanceId);
  }
}
