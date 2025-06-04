import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Accessory } from './accessories.entity'

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  model: string

  @Column('varchar')
  color: string

  @Column('int')
  year: number

  @Column('numeric')
  value_per_day: number

  @Column('int')
  number_of_passengers: number

  @OneToMany(() => Accessory, accessory => accessory.vehicle, { cascade: true })
  accessories: Accessory[]

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}
