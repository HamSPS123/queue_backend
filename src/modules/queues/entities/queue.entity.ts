import { Counter } from 'src/modules/counters/entities/counter.entity';
import { QueueStatus } from 'src/modules/queue-statuses/entities/queue-status.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('queues')
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  length: string;

  @Column()
  current_queue: string;

  @Column()
  next_queue: string;

  @Column()
  prev_queue: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => Counter, (counter) => counter.id)
  @JoinColumn({ name: 'counter_id' })
  counter: Counter;

  @ManyToOne(() => Service, (service) => service.id)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => QueueStatus, (queueStatus) => queueStatus.id)
  @JoinColumn({ name: 'status_id' })
  status: QueueStatus;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
