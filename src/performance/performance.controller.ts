import { AuthGuard } from '@nestjs/passport';
import { CreatePerformanceDto } from './dto/performance.create.dto';
import { PerformanceService } from './performance.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { User } from 'src/entities/User';
import {
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

  @ApiOperation({ summary: '공연 등록' })
  @ApiCreatedResponse({
    schema: {
      example: {
        userId: 2,
        performanceName: '싸이 공연',
        performanceDescription:
          '이 공연을 정말 재미있고 틀네으미으마ㅣ으미ㅏㅡㅇ미ㅡ',
        categoryId: 23,
        performanceVenue: '경기도 안산시 중앙동',
        performancePrice: 16000,
        performanceImage: 'https://example.com/images/concert.jpg',
        id: 15,
        createdAt: '2024-07-02T02:11:44.416Z',
        updatedAt: '2024-07-02T02:11:44.416Z',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('post')
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

  @ApiOperation({ summary: '공연 조회' })
  @ApiOkResponse({
    schema: {
      example: {
        id: 1,
        userId: 2,
        categoryId: 19,
        performanceName: '행복한 공연',
        performanceDescription: '이 공연을 정말 재미있고',
        performanceVenue: '경기도 안산시 중앙동',
        performancePrice: 16000,
        performanceImage: 'htpps/ada/sda.',
        createdAt: '2024-07-01T11:08:08.796Z',
        updatedAt: '2024-07-01T11:08:08.796Z',
      },
    },
  })
  @Get(':category')
  getAllPerformances(@Param('category') category: number) {
    return this.performanceService.getAllPerformances(category);
  }

  @ApiOperation({ summary: '공연 검색' })
  @ApiOkResponse({
    schema: {
      example: [
        {
          id: 1,
          userId: 2,
          categoryId: 19,
          performanceName: '행복한 공연',
          performanceDescription:
            '이 공연을 정말 재미있고 틀네으미으마ㅣ으미ㅏㅡㅇ미ㅡ',
          performanceVenue: '경기도 안산시 중앙동',
          performanceImage: 'htpps/ada/sda.',
          createdAt: '2024-07-01T11:08:08.796Z',
          updatedAt: '2024-07-01T11:08:08.796Z',
        },
        {
          id: 2,
          userId: 2,
          categoryId: 19,
          performanceName: '행복한 공연',
          performanceDescription:
            '이 공연을 정말 재미있고 틀네으미으마ㅣ으미ㅏㅡㅇ미ㅡ',
          performanceVenue: '경기도 안산시 중앙동',
          performanceImage: 'htpps/ada/sda.',
          createdAt: '2024-07-01T11:12:20.575Z',
          updatedAt: '2024-07-01T11:12:20.575Z',
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    schema: {
      example: {
        status: 406,
        message: '찾는 공연이 없습니다.',
      },
    },
  })
  @Get(':performanceName/Search')
  getPerformance(@Param('performanceName') performanceName: string) {
    return this.performanceService.getPerformance(performanceName);
  }

  @ApiOperation({ summary: '공연 상세보기' })
  @ApiOkResponse({
    schema: {
      example: {
        id: 2,
        userId: 2,
        categoryId: 19,
        performanceName: '행복한 공연',
        performanceDescription:
          '이 공연을 정말 재미있고 틀네으미으마ㅣ으미ㅏㅡㅇ미ㅡ',
        performanceVenue: '경기도 안산시 중앙동',
        performanceImage: 'htpps/ada/sda.',
        createdAt: '2024-07-01T11:12:20.575Z',
        updatedAt: '2024-07-01T11:12:20.575Z',
        performanceTimes: [
          {
            id: 1,
            performanceDateTime: '2024-07-25T00:00:00.000Z',
            seatsRemaining: 100,
            createdAt: '2024-07-01T11:12:20.614Z',
            updatedAt: '2024-07-01T11:12:20.614Z',
          },
          {
            id: 2,
            performanceDateTime: '2024-07-26T00:00:00.000Z',
            seatsRemaining: 100,
            createdAt: '2024-07-01T11:12:20.629Z',
            updatedAt: '2024-07-01T11:12:20.629Z',
          },
          {
            id: 3,
            performanceDateTime: '2024-07-27T00:00:00.000Z',
            seatsRemaining: 100,
            createdAt: '2024-07-01T11:12:20.631Z',
            updatedAt: '2024-07-01T11:12:20.631Z',
          },
        ],
        isBookable: true,
      },
    },
  })
  @Get('detail/:performanceId')
  getPerformanceId(@Param('performanceId') performanceId: number) {
    return this.performanceService.getPerformanceById(performanceId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('reserve')
  async reserveSeat(@Body() reserveSeatDto: {
    performanceId: number;
    grade: string;
    seatCount: number;
    performanceTime: string;
  }, @UserInfo() user: User) {
    return await this.performanceService.reserveSeat(
      user.id,
      reserveSeatDto.performanceId,
      reserveSeatDto.grade,
      reserveSeatDto.seatCount,
      reserveSeatDto.performanceTime,
    );
  }
}
