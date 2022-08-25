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

  @Column({ name: 'type_id' })
  typeId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ServiceType, (serviceTypes) => serviceTypes.services)
  @JoinColumn({ name: 'type_id' })
  type: ServiceType;

  @OneToMany(() => Queue, (queue) => queue.service)
  queues: Queue[];
}
