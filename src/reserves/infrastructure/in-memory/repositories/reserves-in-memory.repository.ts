import { ReserveModel } from '@/reserves/domain/models/reserves.model'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'

export class ReservesInMemoryRepository
  extends InMemoryRepository<ReserveModel>
  implements ReservesRepository
{
  sortableFields: string[] = ['start_date', 'end_date', 'created_at']

  async findByUser(user_id: string): Promise<ReserveModel[]> {
    return this.items.filter(reserve => reserve.user_id === user_id)
  }

  async findByVehicle(vehicle_id: string): Promise<ReserveModel[]> {
    return this.items.filter(reserve => reserve.vehicle_id === vehicle_id)
  }

  async findConflictingReserve(
    vehicle_id: string,
    start_date: Date,
    end_date: Date,
  ): Promise<ReserveModel | null> {
    const conflictingReserve = this.items.find(reserve => {
      return (
        reserve.vehicle_id === vehicle_id &&
        ((start_date >= reserve.start_date && start_date < reserve.end_date) ||
          (end_date > reserve.start_date && end_date <= reserve.end_date) ||
          (start_date <= reserve.start_date && end_date >= reserve.end_date))
      )
    })

    return conflictingReserve || null
  }

  protected async applyFilter(
    items: ReserveModel[],
    filter: string | null,
  ): Promise<ReserveModel[]> {
    if (!filter) {
      return items
    }

    return items.filter(reserve => {
      return (
        reserve.user_id.toLowerCase().includes(filter.toLowerCase()) ||
        reserve.vehicle_id.toLowerCase().includes(filter.toLowerCase())
      )
    })
  }
}
