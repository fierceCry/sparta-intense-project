import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Performance } from './Performance';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Performance, (performance) => performance.category)
  performances: Performance[];
}
