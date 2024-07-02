import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested, ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PerformanceSeatDto {

  @ApiProperty({
    required: true,
    type: String,
    description: '좌석 등급',
    example: 'A',
  })
  @IsString()
  @IsNotEmpty({ message: '좌석 등급을 입력해주세요.' })
  grade: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: '공연 가격',
    example: 30000,
  })
  @IsNumber()
  @IsNotEmpty({ message: '좌석 가격을 입력해주세요.' })
  price: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: '좌석 갯수',
    example: 50,
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
    example: '싸이 공연',
  })
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 작성해주세요.' })
  performanceName: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '공연 설명',
    example: '이 공연을 정말 재미있고...',
  })
  @IsString()
  @IsNotEmpty({ message: '공연 설명을 작성해주세요.' })
  performanceDescription: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '공연 장소',
    example: '경기도 안산시 중앙동',
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
      { grade: 'A', price: 30000, seat_count: 50 },
      { grade: 'B', price: 20000, seat_count: 30 },
    ],
  })
  performanceSeats: PerformanceSeatDto[];

  @ApiProperty({
    required: true,
    type: Number,
    description: '공연 카테고리 ID',
    example: 23,
  })
  @IsNumber()
  @IsNotEmpty({ message: '카테고리를 선택해주세요.' })
  performanceCategory: number;
}
