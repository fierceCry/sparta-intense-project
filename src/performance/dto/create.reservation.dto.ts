import { IsNumber, IsString } from "class-validator";

export class CreateReservationDto {

  @IsNumber()
  performanceId: number;

  @IsString()
  grade: string;

  @IsNumber()
  seatCount: number;

  performanceTime:string
}
