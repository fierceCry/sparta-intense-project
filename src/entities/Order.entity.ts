import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Performance } from './Performance.entity';
import { Seats } from './Seats.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: false})
  userId: number;

  @Column({ name: 'performance_id', nullable: false})
  performanceId: number;

  @Column({ name: 'seat_number', type: 'varchar', nullable: false })
  seatNumber: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: false })
  paymentStatus: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
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
