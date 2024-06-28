import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(email: string, nickname: string, userPassword: string) {
    const userData = await this.findByEmail(email);
    if (userData) {
      throw new ConflictException('가입 된 이메일이 있습니다.');
    }
    const hashPassword = hashSync(userPassword, 10);

    const newUser = await this.userRepository.save({
      email,
      password: hashPassword,
      nickname,
    });

    const { password, ...user } = newUser;
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
