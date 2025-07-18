import { ReserveModel } from '@/reserves/domain/models/reserves.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('reserves')
export class Reserve implements ReserveModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp' })
  start_date: Date

  @Column({ type: 'timestamp' })
  end_date: Date

  @Column('uuid')
  vehicle_id: string

  @Column('uuid')
  user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
