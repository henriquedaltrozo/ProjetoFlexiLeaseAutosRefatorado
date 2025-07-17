import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { ReserveModel } from '../models/reserves.model'

export type CreateReserveProps = {
  start_date: Date
  end_date: Date
  id_vehicle: string
  id_user: string
}

export type UpdateReserveProps = {
  id: string
  start_date?: Date
  end_date?: Date
  id_vehicle?: string
  id_user?: string
}

export interface ReservesRepository
  extends RepositoryInterface<ReserveModel, CreateReserveProps> {
  findByUser(id_user: string): Promise<ReserveModel[]>
  findByVehicle(id_vehicle: string): Promise<ReserveModel[]>
  findConflictingReserve(
    id_vehicle: string,
    start_date: Date,
    end_date: Date,
  ): Promise<ReserveModel | null>
}
