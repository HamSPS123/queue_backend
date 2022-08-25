import { Queue } from 'src/modules/queues/entities/queue.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { Zone } from 'src/modules/zones/entities/zone.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('service_types')
export class ServiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Service, (service) => service.type)
  services: Service[];

  @OneToMany(() => Queue, (queue) => queue.serviceType)
  queues: Queue[];

  @OneToMany(() => Zone, (zone) => zone.serviceType)
  zones: Zone[];
}
