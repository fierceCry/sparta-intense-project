import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, nickname: string, userPassword: string) {
    const userData = await this.findByEmail(email);
    if (userData) {
      throw new ConflictException('가입 된 이메일이 있습니다.');
    }
    const hashPassword = await hash(userPassword, 10);

    await this.userRepository.save({
      email,
      password: hashPassword,
      nickname,
    });
    return { message: '회원가입 성공하였습니다.' };
  }

  async validateUser(email: string, password: string){
    const user = await this.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async login(email:string) {
    const { id } = await this.findByEmail(email)
    const payload = { email: email, id: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findById(userId: number) {
    return this.userRepository.findOneBy({ id: userId });
  }
}
