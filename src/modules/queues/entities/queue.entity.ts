import { Counter } from 'src/modules/counters/entities/counter.entity';
import { QueueStatus } from 'src/modules/queue-statuses/entities/queue-status.entity';
import { ServiceType } from 'src/modules/service-types/entities/service-type.entity';
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

  @Column({ name: 'current_queue' })
  currentQueue: string;

  @Column({ name: 'next_queue' })
  nextQueue: string;

  @Column({ name: 'prev_queue' })
  prevQueue: string;

  @Column({ name: 'start_time', nullable: true })
  startTime: Date;

  @Column({ name: 'end_time', nullable: true })
  endTime: Date;

  @Column({ name: 'service_type_id' })
  serviceTypeId: number;

  @Column({ name: 'service_id' })
  serviceId: number;

  @Column({ name: 'counter_id', nullable: true })
  counterId: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'status_id' })
  statusId: number;

  @ManyToOne(() => ServiceType, (servicetype) => servicetype.id)
  @JoinColumn({ name: 'service_type_id' })
  serviceType: ServiceType;

  @ManyToOne(() => Service, (service) => service.id)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Counter, (counter) => counter.id)
  @JoinColumn({ name: 'counter_id' })
  counter: Counter;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => QueueStatus, (queueStatus) => queueStatus.id)
  @JoinColumn({ name: 'status_id' })
  status: QueueStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
