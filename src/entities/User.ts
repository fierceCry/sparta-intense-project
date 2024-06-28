import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Performance } from './Performance';
import { Order } from './Order';
import { Role } from './Role-enum';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ type: 'varchar', name: 'nickname' })
  nickname: string;

  @Column({ type: 'int', name: 'point', default: 1000000 })
  point: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER, // 기본값 설정
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Performance, (performance) => performance.user)
  performances: Performance[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
