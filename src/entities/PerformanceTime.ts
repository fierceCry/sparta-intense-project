import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Performance } from './Performance';

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
}
