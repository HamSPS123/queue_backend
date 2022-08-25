import { Queue } from 'src/modules/queues/entities/queue.entity';
import { Zone } from 'src/modules/zones/entities/zone.entity';
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

  @Column({ name: 'zone_id' })
  zoneId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Zone, (zone) => zone.counters)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @OneToMany(() => Queue, (queue) => queue.counter)
  queues: Queue[];
}
