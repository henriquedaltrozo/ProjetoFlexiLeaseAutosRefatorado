import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { VehicleModel } from '../models/vehicles.model'

export type VehicleId = {
  id: string
}

export type CreateVehicleProps = {
  id?: string
  name: string
  color: string
  year: number
  value_per_day: number
  number_of_passengers: number
  created_at?: Date
  updated_at?: Date
}

export interface VehiclesRepository
  extends RepositoryInterface<VehicleModel, CreateVehicleProps> {
  findByName(name: string): Promise<VehicleModel>
  findAllByIds(vehicleIds: VehicleId[]): Promise<VehicleModel[]>
  conflictingName(name: string): Promise<void>
}
