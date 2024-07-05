import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsArray,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PerformanceSeatDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '좌석 등급',
    example: 'standing',
  })
  @IsString()
  @IsNotEmpty({ message: '좌석 등급을 입력해주세요.' })
  grade: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: '공연 가격',
    example: 50000,
  })
  @IsNumber()
  @Max(50000, { message: '50000원을 넘길 수 없습니다.' })
  @IsNotEmpty({ message: '좌석 가격을 입력해주세요.' })
  price: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: '좌석 갯수',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seat_count: number;
}

export class CreatePerformanceDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '공연 이름',
    example: '워터밤 서울 2024 - 서울',
  })
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 작성해주세요.' })
  performanceName: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '공연 설명',
    example: 
    '워터밤은 여름 축제의 대명사가 될 정도로 대한민국 여름 대표 페스티벌로 자리 잡았다. 각종 콘텐츠에서 워터밤 출연을 희망하는 연예인들이 역으로 섭외 언급을 할 정도다. 출연진을 살펴보자면 탑티어 K-POP 아티스트부터 힙합, EDM까지 같이 뛰어놀 수 있는 다양한 음악의 아티스트들로 이루어져 있다. 낮시간부터 늦은 밤까지 비는 시간 없이 공연이 진행되며 아티스트의 라이브 공연과 유명 디제이가 번갈아 공연한다. 요일별로 박재범, 현아, 지코, 제시, 선미, aespa, 청하 등의 유명 케이팝 아티스트들 또한 이름을 올리기도 한다. 긍정적인 부분은 국내 EDM 프로듀서와 DJ들이 앞타임이 아닌 K-POP 아티스트와 라인업 타임 비중을 같이 두어, 피크타임에도 공연을 하기 때문에 다른 EDM 페스티벌과는 다르게 대우를 받는 편이다.',
  })
  @IsString()
  @IsNotEmpty({ message: '공연 설명을 작성해주세요.' })
  performanceDescription: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '공연 장소',
    example: '경기도 고양시 일산서구 킨텍스로 217-59',
  })
  @IsString()
  @IsNotEmpty({ message: '공연 장소를 선택해주세요.' })
  performanceVenue: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '공연 이미지 URL',
    example: 'https://example.com/images/concert.jpg',
  })
  @IsString()
  @IsNotEmpty({ message: '공연 이미지 URL을 입력해주세요.' })
  performanceImage: string;

  @ApiProperty({
    required: true,
    type: [String],
    description: '공연 시간 목록',
    example: ['2024-07-25 19:00', '2024-07-26 20:00', '2024-07-27 21:00'],
  })
  @IsArray()
  @ArrayMinSize(1, { message: '최소 하나 이상의 공연 시간을 입력해주세요.' })
  performanceTime: string[];

  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: '최소 하나 이상의 좌석 정보를 입력해주세요.' })
  @Type(() => PerformanceSeatDto)
  @ApiProperty({
    required: true,
    type: [PerformanceSeatDto],
    description: '좌석 정보 목록',
    example: [
      { grade: 'standing', price: 15000, seat_count: 100 },
      { grade: 'A', price: 30000, seat_count: 200 },
    ],
  })
  performanceSeats: PerformanceSeatDto[];

  @ApiProperty({
    required: true,
    type: Number,
    description: '공연 카테고리 ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: '카테고리를 선택해주세요.' })
  performanceCategory: number;
}
