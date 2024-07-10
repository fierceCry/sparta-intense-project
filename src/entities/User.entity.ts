import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Performance } from './Performance.entity';
import { Order } from './Order.entity';
import { Role } from '../types/Role-enum';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  /**
   * 이메일
   * @example "example@naver.com"
   */
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @Column({ type: 'varchar', name: 'email', nullable: false})
  email: string;

  /**
   * 비밀번호
   * @example "Example1!!"
   */
  @IsString({message: '문자열로 입력해주세요.'})
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  @Column({ type: 'varchar', name: 'password', nullable: false
  })
  password: string;

  /**
   * 닉네임
   * @example "example"
   */
  @IsString({message: '닉네임은 숫자가 불가능합니다.'})
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @Column({ type: 'varchar', name: 'nickname', nullable: false})
  nickname: string;

  @Column({ type: 'int', name: 'point', default: 1000000 })
  point: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Performance, (performance) => performance.user)
  performances: Performance[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
