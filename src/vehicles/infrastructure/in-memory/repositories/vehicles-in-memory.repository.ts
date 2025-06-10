import { ConflictError } from '@/common/domain/errors/conflict-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { VehicleModel } from '@/vehicles/domain/models/vehicles.model'
import {
  VehicleId,
  VehiclesRepository,
} from '@/vehicles/domain/repositories/vehicles.repository'

export class VehiclesInMemoryRepository
  extends InMemoryRepository<VehicleModel>
  implements VehiclesRepository
{
  sortableFields: string[] = ['name', 'created_at']

  async findByName(name: string): Promise<VehicleModel> {
    const vehicle = this.items.find(item => item.name === name)
    if (!vehicle) {
      throw new NotFoundError(`Vehicle with name ${name} not found`)
    }
    return vehicle
  }

  async findAllByIds(vehicleIds: VehicleId[]): Promise<VehicleModel[]> {
    const existingVehicles = []
    for (const vehicleId of vehicleIds) {
      const vehicle = this.items.find(item => item.id === vehicleId.id)
      if (vehicle) {
        existingVehicles.push(vehicle)
      }
    }
    return existingVehicles
  }

  async conflictingName(name: string): Promise<void> {
    const vehicle = this.items.find(item => item.name === name)
    if (vehicle) {
      throw new ConflictError(`Name already used on another vehicle`)
    }
  }

  protected async applyFilter(
    items: VehicleModel[],
    filter: string | null,
  ): Promise<VehicleModel[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  protected async applySort(
    items: VehicleModel[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<VehicleModel[]> {
    return super.applySort(items, sort ?? 'created_at', sort_dir ?? 'desc')
  }
}
