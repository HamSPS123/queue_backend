import { Queue } from 'src/modules/queues/entities/queue.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('counters')
export class Counter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column({ name: 'avg_waiting_time', default: 0 })
  avgWaitingTime: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @OneToMany(() => Queue, (queue) => queue.counter)
  queues: Queue[];
}
