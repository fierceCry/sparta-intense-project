import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {

  @ApiProperty({
    required: true,
    type: String,
    description: '이메일'
  })
  @IsEmail()
  @IsNotEmpty({message: '이메일을 입력해주세요.'})
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '비밀번호'
  })
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  password: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '닉네임'
  })
  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  nickname: string;
}
