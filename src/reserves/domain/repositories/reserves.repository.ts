import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { ReserveModel } from '../models/reserves.model'

export type CreateReserveProps = {
  start_date: Date
  end_date: Date
  vehicle_id: string
  user_id: string
}

export type UpdateReserveProps = {
  id: string
  start_date?: Date
  end_date?: Date
  vehicle_id?: string
  user_id?: string
}

export interface ReservesRepository
  extends RepositoryInterface<ReserveModel, CreateReserveProps> {
  findByUser(user_id: string): Promise<ReserveModel[]>
  findByVehicle(vehicle_id: string): Promise<ReserveModel[]>
  findConflictingReserve(
    vehicle_id: string,
    start_date: Date,
    end_date: Date,
  ): Promise<ReserveModel | null>
}
