import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class SignInDto extends PickType(User, ['email', 'password']){}
