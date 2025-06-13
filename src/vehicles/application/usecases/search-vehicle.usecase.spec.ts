import 'reflect-metadata'
import { VehiclesDataBuilder } from '@/vehicles/infrastructure/testing/helpers/vehicles-data-builder'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'
import { SearchVehicleUseCase } from './search-vehicle.usecase'

describe('SearchVehicleUseCase Unit Tests', () => {
  let sut: SearchVehicleUseCase.UseCase
  let repository: VehiclesInMemoryRepository

  beforeEach(() => {
    repository = new VehiclesInMemoryRepository()
    sut = new SearchVehicleUseCase.UseCase(repository)
  })

  test('should return the vehicles ordered by created_at', async () => {
    const created_at = new Date()
    const items = [
      { ...VehiclesDataBuilder({}) },
      {
        ...VehiclesDataBuilder({
          created_at: new Date(created_at.getTime() + 100),
        }),
      },
      {
        ...VehiclesDataBuilder({
          created_at: new Date(created_at.getTime() + 200),
        }),
      },
    ]
    repository.items = items

    const result = await sut.execute({})

    expect(result).toStrictEqual({
      items: [...items].reverse(),
      total: 3,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    })
  })

  test('should return output using pagination, sort and filter', async () => {
    const items = [
      { ...VehiclesDataBuilder({ name: 'a' }) },
      { ...VehiclesDataBuilder({ name: 'AA' }) },
      { ...VehiclesDataBuilder({ name: 'Aa' }) },
      { ...VehiclesDataBuilder({ name: 'b' }) },
      { ...VehiclesDataBuilder({ name: 'c' }) },
    ]
    repository.items = items

    let output = await sut.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'a',
    })

    expect(output).toStrictEqual({
      items: [items[1], items[2]],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    })

    output = await sut.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'a',
    })
    expect(output).toStrictEqual({
      items: [items[0], items[2]],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    })
  })
})
