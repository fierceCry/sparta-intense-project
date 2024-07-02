import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
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

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({
    description: '회원가입 성공하였습니다.',
    schema: {
      example: { message: '회원가입 성공하였습니다.' },
    },
  })
  @ApiConflictResponse({
    description: '가입 된 이메일이 있습니다.',
    schema: {
      example: {
        status: 409,
        message: '가입 된 이메일이 있습니다.',
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청입니다.',
    schema: {
      examples: {
        invalidEmail: {
          summary: '유효하지 않은 이메일 주소',
          value: {
            status: 400,
            message: '유효한 이메일 주소를 입력해주세요.',
          },
        },
        emptyEmail: {
          summary: '이메일이 비어있음',
          value: {
            status: 400,
            message: '이메일을 입력해주세요.',
          },
        },
        emptyPassword: {
          summary: '비밀번호가 비어있음',
          value: {
            status: 400,
            message: '비밀번호를 입력해주세요.',
          },
        },
        emptyNickname: {
          summary: '닉네임이 비어있음',
          value: {
            status: 400,
            message: '닉네임을 입력해주세요.',
          },
        },
      },
    },
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    const { nickname, email, password } = signUpDto;
    return this.userService.signUp(email, nickname, password);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eyJpZCI6NiwiaWF0IjoxNzE5NTkxMzU5fQ.8eXmMa8s5BrD0TSbCdZJETGKHsakpQ8AArIoeR9q3R8',
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      examples: {
        emailNotRegistered: {
          summary: '가입되지 않은 이메일',
          value: {
            status: 401,
            message: '가입되지 않은 이메일 입니다.',
          },
        },
        passwordMismatch: {
          summary: '비밀번호 불일치',
          value: {
            status: 401,
            message: '비밀번호가 일치하지 않습니다.',
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signIn(@UserInfo() user: User) {
    return this.userService.login(user.email, user.id);
  }

  @ApiOperation({ summary: '프로필 조회' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        status: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiOkResponse({
    description: '사용자 정보 조회 성공',
    schema: {
      example: {
        id: 1,
        email: 'aa4518@naver.com',
        nickname: '김만규',
        point: 1000000,
        role: 'user',
        createdAt: '2024-06-28T08:53:44.857Z',
        updatedAt: '2024-06-28T08:53:44.857Z',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  findByUser(@UserInfo() user: User) {
    const { password: _, ...result } = user;
    return result;
  }
}
