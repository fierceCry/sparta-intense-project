import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { compareSync, hashSync } from 'bcrypt';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signUp(email: string, nickname: string, userPassword: string) {
    const userData = await this.findByEmail(email);
    if (userData) {
      throw new ConflictException('가입 된 이메일이 있습니다.');
    }
    const hashPassword = hashSync(userPassword, 10);

    await this.userRepository.save({
      email,
      password: hashPassword,
      nickname,
    });
    return { message: '회원가입 성공하였습니다.' };
  }

  async signIn(email: string, password: string) {
    const userData = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(userData)) {
      throw new UnauthorizedException('가입되지 않은 이메일 입니다.');
    }

    if(!compareSync(password, userData.password)){
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const payload = {id: userData.id}
    return{
      accessToken: this.jwtService.sign(payload)
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
