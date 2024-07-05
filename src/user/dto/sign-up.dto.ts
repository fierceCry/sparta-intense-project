import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '이메일',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '비밀번호',
    example: 'password1234',
  })
  @IsString({message: '문자열로 입력해주세요.'})
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  password: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '닉네임',
    example: '홍길동',
  })
  @IsString({message: '닉네임은 숫자가 불가능합니다.'})
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;
}
