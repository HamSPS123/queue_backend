import { ServiceType } from './../../service-types/entities/service-type.entity';
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
import { Queue } from 'src/modules/queues/entities/queue.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'la_name' })
  laName: string;

  @Column({ name: 'en_name', nullable: true })
  enName: string;

  @ManyToOne(() => ServiceType, (serviceTypes) => serviceTypes.id)
  @JoinColumn({ name: 'type_id' })
  type: ServiceType;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @OneToMany(() => Queue, (queue) => queue.service)
  queues: Queue[];
}
