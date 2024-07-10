import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';

export class SignUpDto extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {}
