import { UserService } from './../user/user.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService :UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string){
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new UnauthorizedException('잘못된 데이터 형식입니다.');
    }
    const user = this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('유효하지 않는 정보입니다.');
    }
    return user;
  }
}
