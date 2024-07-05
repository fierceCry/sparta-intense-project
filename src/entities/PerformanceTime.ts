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

  @Column({name: 'performance_id', nullable: false})
  performanceId: number
  
  @ManyToOne(() => Performance, (performance) => performance.performanceTimes)
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ type: 'varchar', nullable: false, name: 'performance_date_times' })
  performanceDateTimes: string[];

  @Column({ nullable: false })
  seatsRemaining: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(()=> Seats, (seats) => seats.performanceTime)
  seats: Seats[];
}
