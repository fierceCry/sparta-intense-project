import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    const { nickname, email, password } = signUpDto;
    return this.userService.signUp(email, nickname, password);
  }
}
