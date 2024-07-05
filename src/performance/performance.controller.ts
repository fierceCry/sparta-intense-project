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
        userId: 1,
        performanceName: '워터밤 서울 2024 - 서울',
        performanceDescription:
          '워터밤은 여름 축제의 대명사가 될 정도로 대한민국 여름 대표 페스티벌로 자리 잡았다. 각종 콘텐츠에서 워터밤 출연을 희망하는 연예인들이 역으로 섭외 언급을 할 정도다. 출연진을 살펴보자면 탑티어 K-POP 아티스트부터 힙합, EDM까지 같이 뛰어놀 수 있는 다양한 음악의 아티스트들로 이루어져 있다. 낮시간부터 늦은 밤까지 비는 시간 없이 공연이 진행되며 아티스트의 라이브 공연과 유명 디제이가 번갈아 공연한다. 요일별로 박재범, 현아, 지코, 제시, 선미, aespa, 청하 등의 유명 케이팝 아티스트들 또한 이름을 올리기도 한다. 긍정적인 부분은 국내 EDM 프로듀서와 DJ들이 앞타임이 아닌 K-POP 아티스트와 라인업 타임 비중을 같이 두어, 피크타임에도 공연을 하기 때문에 다른 EDM 페스티벌과는 다르게 대우를 받는 편이다.',
        categoryId: 1,
        performanceVenue: '서울특별시 강남구 영동대로 513',
        performanceImage: 'https://example.com/images/concert.jpg',
        id: 5,
        createdAt: '2024-07-05T10:51:39.101Z',
        updatedAt: '2024-07-05T10:51:39.101Z',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('')
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
        id: 5,
        userId: 1,
        categoryId: 1,
        performanceName: '워터밤 서울 2024 - 서울',
        performanceDescription:
          '워터밤은 여름 축제의 대명사가 될 정도로 대한민국 여름 대표 페스티벌로 자리 잡았다. 각종 콘텐츠에서 워터밤 출연을 희망하는 연예인들이 역으로 섭외 언급을 할 정도다. 출연진을 살펴보자면 탑티어 K-POP 아티스트부터 힙합, EDM까지 같이 뛰어놀 수 있는 다양한 음악의 아티스트들로 이루어져 있다. 낮시간부터 늦은 밤까지 비는 시간 없이 공연이 진행되며 아티스트의 라이브 공연과 유명 디제이가 번갈아 공연한다. 요일별로 박재범, 현아, 지코, 제시, 선미, aespa, 청하 등의 유명 케이팝 아티스트들 또한 이름을 올리기도 한다. 긍정적인 부분은 국내 EDM 프로듀서와 DJ들이 앞타임이 아닌 K-POP 아티스트와 라인업 타임 비중을 같이 두어, 피크타임에도 공연을 하기 때문에 다른 EDM 페스티벌과는 다르게 대우를 받는 편이다.',
        performanceVenue: '서울특별시 강남구 영동대로 513',
        performanceImage: 'https://example.com/images/concert.jpg',
        createdAt: '2024-07-05T10:51:39.101Z',
        updatedAt: '2024-07-05T10:51:39.101Z',
      },
    },
  })
  @Get(':categoryId')
  getAllPerformances(@Param('categoryId') categoryId: number) {
    return this.performanceService.getAllPerformances(categoryId);
  }

  @ApiOperation({ summary: '공연 검색' })
  @ApiOkResponse({
    schema: {
      example: [
        {
          id: 5,
          userId: 1,
          categoryId: 1,
          performanceName: '워터밤 서울 2024 - 서울',
          performanceDescription:
            '워터밤은 여름 축제의 대명사가 될 정도로 대한민국 여름 대표 페스티벌로 자리 잡았다. 각종 콘텐츠에서 워터밤 출연을 희망하는 연예인들이 역으로 섭외 언급을 할 정도다. 출연진을 살펴보자면 탑티어 K-POP 아티스트부터 힙합, EDM까지 같이 뛰어놀 수 있는 다양한 음악의 아티스트들로 이루어져 있다. 낮시간부터 늦은 밤까지 비는 시간 없이 공연이 진행되며 아티스트의 라이브 공연과 유명 디제이가 번갈아 공연한다. 요일별로 박재범, 현아, 지코, 제시, 선미, aespa, 청하 등의 유명 케이팝 아티스트들 또한 이름을 올리기도 한다. 긍정적인 부분은 국내 EDM 프로듀서와 DJ들이 앞타임이 아닌 K-POP 아티스트와 라인업 타임 비중을 같이 두어, 피크타임에도 공연을 하기 때문에 다른 EDM 페스티벌과는 다르게 대우를 받는 편이다.',
          performanceVenue: '서울특별시 강남구 영동대로 513',
          performanceImage: 'https://example.com/images/concert.jpg',
          createdAt: '2024-07-05T10:51:39.101Z',
          updatedAt: '2024-07-05T10:51:39.101Z',
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
  @Get('search/:performanceName')
  getPerformance(@Param('performanceName') performanceName: string) {
    return this.performanceService.getPerformance(performanceName);
  }

  @ApiOperation({ summary: '공연 상세보기' })
  @ApiOkResponse({
    schema: {
      example: {
        id: 5,
        userId: 1,
        categoryId: 1,
        performanceName: '워터밤 서울 2024 - 서울',
        performanceDescription:
          '워터밤은 여름 축제의 대명사가 될 정도로 대한민국 여름 대표 페스티벌로 자리 잡았다. 각종 콘텐츠에서 워터밤 출연을 희망하는 연예인들이 역으로 섭외 언급을 할 정도다. 출연진을 살펴보자면 탑티어 K-POP 아티스트부터 힙합, EDM까지 같이 뛰어놀 수 있는 다양한 음악의 아티스트들로 이루어져 있다. 낮시간부터 늦은 밤까지 비는 시간 없이 공연이 진행되며 아티스트의 라이브 공연과 유명 디제이가 번갈아 공연한다. 요일별로 박재범, 현아, 지코, 제시, 선미, aespa, 청하 등의 유명 케이팝 아티스트들 또한 이름을 올리기도 한다. 긍정적인 부분은 국내 EDM 프로듀서와 DJ들이 앞타임이 아닌 K-POP 아티스트와 라인업 타임 비중을 같이 두어, 피크타임에도 공연을 하기 때문에 다른 EDM 페스티벌과는 다르게 대우를 받는 편이다.',
        performanceVenue: '서울특별시 강남구 영동대로 513',
        performanceImage: 'https://example.com/images/concert.jpg',
        createdAt: '2024-07-05T10:51:39.101Z',
        updatedAt: '2024-07-05T10:51:39.101Z',
        performanceTimes: [
          {
            id: 10,
            performanceId: 5,
            performanceDateTimes: '2024-07-26 20:00',
            seatsRemaining: 300,
            createdAt: '2024-07-05T10:51:39.128Z',
            updatedAt: '2024-07-05T10:51:39.128Z',
          },
          {
            id: 11,
            performanceId: 5,
            performanceDateTimes: '2024-07-25 19:00',
            seatsRemaining: 300,
            createdAt: '2024-07-05T10:51:39.127Z',
            updatedAt: '2024-07-05T10:51:39.127Z',
          },
          {
            id: 12,
            performanceId: 5,
            performanceDateTimes: '2024-07-27 21:00',
            seatsRemaining: 300,
            createdAt: '2024-07-05T10:51:39.130Z',
            updatedAt: '2024-07-05T10:51:39.130Z',
          },
        ],
      },
    },
  })
  @Get('detail/:performanceId')
  getPerformanceId(@Param('performanceId') performanceId: number) {
    return this.performanceService.getPerformanceById(performanceId);
  }
}
