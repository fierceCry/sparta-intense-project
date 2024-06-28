import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { User } from 'src/entities/User';

@ApiTags('USERS')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 201,
    description: `{ "message": "회원가입 성공하였습니다." }`,
  })
  @ApiResponse({
    status: 409,
    description: `{ "success": false, "status": 409, "message": "가입 된 이메일이 있습니다." }`,
  })
  @ApiResponse({
    status: 400,
    description: `{ "success": false, "status": 400, "message": "email must be an email" }`,
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    const { nickname, email, password } = signUpDto;
    return this.userService.signUp(email, nickname, password);
  }

  @ApiResponse({
    status: 201,
    description: `{ "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eyJpZCI6NiwiaWF0IjoxNzE5NTkxMzU5fQ.8eXmMa8s5BrD0TSbCdZJETGKHsakpQ8AArIoeR9q3R8" }`,
  })
  @ApiResponse({
    status: 409,
    description: `{ "success": false, "status": 400, "message": "비밀번호를 입력해주세요" }`,
  })
  @ApiResponse({
    status: 400,
    description: `{ "success": false, "status": 400, "message": "이메일을 입력해주세요." }`,
  })
  @ApiResponse({
    status: 401,
    description: `{ "success": false, "status": 401, "message": "비밀번호가 일치하지 않습니다." }`,
  })
  @ApiResponse({
    status: 401,
    description: `{ "success": false, "status": 401, "message": "가입되지 않은 이메일 입니다." }`,
  })
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    return this.userService.signIn(email, password);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({
    description: `{
    "id": 1,
    "email": "aa4518@naver.com",
    "nickname": "김만규",
    "point": 1000000,
    "role": "user",
    "createdAt": "2024-06-28T08:53:44.857Z",
    "updatedAt": "2024-06-28T08:53:44.857Z"
    }`,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  findByUser(@UserInfo() user: User) {
    const { password: _, ...result } = user;
    return result;
  }
}
