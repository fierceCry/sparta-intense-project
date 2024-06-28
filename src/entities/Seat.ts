import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Performance } from './Performance';
import { Order } from './Order';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Performance, (performance) => performance.seats)
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ nullable: false })
  seatNumber: string;

  @Column({ nullable: false })
  isAvailable: boolean;

  @Column({ nullable: false })
  grade: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  isReserved: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.seat)
  orders: Order[];
}
