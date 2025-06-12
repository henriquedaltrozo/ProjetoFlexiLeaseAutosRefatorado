import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { UpdateVehicleUseCase } from './update-vehicle.usecase'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'
import { VehiclesDataBuilder } from '@/vehicles/infrastructure/testing/helpers/vehicles-data-builder'
import { ConflictError } from '@/common/domain/errors/conflict-error'

describe('UpdateVehicleUseCase Unit Tests', () => {
  let sut: UpdateVehicleUseCase.UseCase
  let repository: VehiclesInMemoryRepository

  beforeEach(() => {
    repository = new VehiclesInMemoryRepository()
    sut = new UpdateVehicleUseCase.UseCase(repository)
  })

  test('should throws error when vehicle not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  it('should not be possible to register a vehicle with the name of another vehicle', async () => {
    const vehicle1 = repository.create(
      VehiclesDataBuilder({ name: 'Vehicle 1' }),
    )
    await repository.insert(vehicle1)

    const props = {
      name: 'Vehicle 2',
      color: 'Orange',
      year: 2020,
      value_per_day: 50,
      number_of_passengers: 5,
    }
    const model = repository.create(props)
    await repository.insert(model)

    const newData = {
      id: model.id,
      name: 'Vehicle 1',
      color: 'Blue',
      year: 2022,
      value_per_day: 100,
      number_of_passengers: 5,
    }
    await expect(sut.execute(newData)).rejects.toBeInstanceOf(ConflictError)
  })

  test('should be able to update a vehicle', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = {
      name: 'Vehicle',
      color: 'Blue',
      year: 2021,
      value_per_day: 10,
      number_of_passengers: 5,
    }
    const model = repository.create(props)
    await repository.insert(model)

    const newData = {
      id: model.id,
      name: 'Vehicle new name',
      color: 'Red',
      year: 2025,
      value_per_day: 200,
      number_of_passengers: 5,
    }
    const result = await sut.execute(newData)
    expect(result.name).toEqual(newData.name)
    expect(result.color).toEqual(newData.color)
    expect(result.year).toEqual(newData.year)
    expect(result.value_per_day).toEqual(newData.value_per_day)
    expect(result.number_of_passengers).toEqual(newData.number_of_passengers)
    expect(spyUpdate).toHaveBeenCalledTimes(1)
  })
})
