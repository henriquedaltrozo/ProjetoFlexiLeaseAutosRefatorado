import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { VehicleModel } from '../models/vehicles.model'

export type VehicleId = {
  id: string
}

export type CreateVehicleProps = {
  id: string
  model: string
  color: string
  year: number
  value_per_day: number
  number_of_passengers: number
  accessories: {
    description: string
  }[]
  created_at: Date
  updated_at: Date
}

export interface VehiclesRepository
  extends RepositoryInterface<VehicleModel, CreateVehicleProps> {
  findByName(name: string): Promise<VehicleModel>
  findAllByIds(ids: VehicleId[]): Promise<VehicleModel[]>
  conflictingName(name: string): Promise<void>
}
