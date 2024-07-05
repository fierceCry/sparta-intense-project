import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReservationDto {
  @ApiProperty({ example: 3, description: '공연 ID' })
  @IsNumber({}, { message: '공연을 선택해주세요'})
  performanceId: number;

  @ApiProperty({ example: 'standing', description: '좌석 등급' })
  @IsString({ message: '등급을 선택해주세요.' })
  grade: string;

  @ApiProperty({ example: 2, description: '좌석 갯수' })
  @IsNumber({}, { message: '좌석 갯수를 선택해주세요' })
  seatCount: number;

  @ApiProperty({ example: '2024-07-27 21:00', description: '공연 날짜' })
  @IsString({ message: '날짜를 선택해주세요.' })
  performanceTime: string;
}
