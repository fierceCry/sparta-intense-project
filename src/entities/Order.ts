import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Performance } from './Performance';
import { Seats } from './Seats';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'performance_id' })
  performanceId: number;

  @Column({ name: 'seatId' })
  seatId: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: false })
  paymentStatus: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Performance, (performance) => performance.orders)
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @ManyToOne(() => Seats, (seats) => seats.orders)
  @JoinColumn({ name: 'seats_id' })
  seats: Seats;
}
