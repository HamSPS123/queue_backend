/* eslint-disable prettier/prettier */
import * as argon2 from 'argon2';
import { Queue } from 'src/modules/queues/entities/queue.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'default_password', nullable: true })
  defaultPassword: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Queue, (queue) => queue.user)
  queues: Queue[];

  @BeforeInsert()
  async setPassword() {
    const hashPassword = await argon2.hash(this.password);
    this.password = hashPassword;
  }
}
