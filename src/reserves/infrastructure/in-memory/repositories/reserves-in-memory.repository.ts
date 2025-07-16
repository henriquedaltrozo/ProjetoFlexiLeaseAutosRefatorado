import { ReserveModel } from '@/reserves/domain/models/reserves.model'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'

export class ReservesInMemoryRepository
  extends InMemoryRepository<ReserveModel>
  implements ReservesRepository
{
  sortableFields: string[] = ['start_date', 'end_date', 'created_at']

  async findByUser(id_user: string): Promise<ReserveModel[]> {
    return this.items.filter(reserve => reserve.id_user === id_user)
  }

  async findByVehicle(id_car: string): Promise<ReserveModel[]> {
    return this.items.filter(reserve => reserve.id_car === id_car)
  }

  async findConflictingReserve(
    id_car: string,
    start_date: Date,
    end_date: Date,
  ): Promise<ReserveModel | null> {
    const conflictingReserve = this.items.find(reserve => {
      return (
        reserve.id_car === id_car &&
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
        reserve.id_user.toLowerCase().includes(filter.toLowerCase()) ||
        reserve.id_car.toLowerCase().includes(filter.toLowerCase())
      )
    })
  }
}
