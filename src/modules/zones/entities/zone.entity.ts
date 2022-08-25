import { Counter } from 'src/modules/counters/entities/counter.entity';
import { ServiceType } from 'src/modules/service-types/entities/service-type.entity';
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

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ name: 'service_type_id' })
  typeId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.zones)
  @JoinColumn({ name: 'service_type_id' })
  serviceType: ServiceType;

  @OneToMany(() => Counter, (counter) => counter.zone)
  counters: Counter[];
}
