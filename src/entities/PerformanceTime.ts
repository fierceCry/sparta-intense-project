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
import { Seats } from './Seats';

@Entity('performanceTimes')
export class PerformanceTime {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Performance, (performance) => performance.performanceTimes)
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ nullable: false })
  performanceDateTime: Date;

  @Column({ nullable: false })
  seatsRemaining: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(()=> Seats, (seats) => seats.performanceTime)
  seats: Seats[];
}
