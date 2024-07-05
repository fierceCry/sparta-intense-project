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
import { PerformanceTime } from './PerformanceTime';

@Entity('seats')
export class Seats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'performance_id', nullable: false})
  performanceId: number

  @ManyToOne(() => Performance, (performance) => performance.seats)
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column('json',{ nullable: false, name: 'seat_number'})
  seatNumber: number[];

  @Column({ nullable: false, name: 'is_available'})
  isAvailable: boolean;

  @Column({ nullable: false })
  grade: string;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PerformanceTime, (performanceTime) => performanceTime.seats)
  @JoinColumn({ name: 'performance_time_id' })
  performanceTime: PerformanceTime;
  
  @Column({ nullable: false, name: 'performance_time_id' })
  performanceTimeId: number;

  @OneToMany(() => Order, (order) => order.seats)
  orders: Order[];
}
