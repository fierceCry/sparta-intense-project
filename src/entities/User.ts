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
import { Role } from '../types/Role-enum';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'email', nullable: false})
  email: string;

  @Column({ type: 'varchar', name: 'password', nullable: false
  })
  password: string;

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
