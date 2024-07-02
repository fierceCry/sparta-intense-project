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
import { User } from './User';
import { Category } from './Category';
import { PerformanceTime } from './PerformanceTime';
import { Seats } from './Seats';
import { Order } from './Order';

@Entity({ name: 'performance' })
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'performance_name', nullable: false })
  performanceName: string;

  @Column({ name: 'performance_description', type: 'text', nullable: false })
  performanceDescription: string;

  @Column({ name: 'performance_venue', nullable: false })
  performanceVenue: string;

  @Column({ name: 'performance_image', nullable: false })
  performanceImage: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.performances)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.performances)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => PerformanceTime, (performanceTime) => performanceTime.performance)
  performanceTimes: PerformanceTime[];

  @OneToMany(() => Seats, (seats) => seats.performance)
  seats: Seats[];

  @OneToMany(() => Order, (order) => order.performance)
  orders: Order[];
}