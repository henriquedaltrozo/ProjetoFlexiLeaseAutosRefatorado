import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Vehicle } from './vehicles.entity'

@Entity('accessories')
export class Accessory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  description: string

  @ManyToOne(() => Vehicle, vehicle => vehicle.accessories, {
    onDelete: 'CASCADE',
  })
  vehicle: Vehicle
}
