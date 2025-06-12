import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { UpdateVehicleUseCase } from './update-vehicle.usecase'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'

describe('UpdateProductUseCase Unit Tests', () => {
  let sut: UpdateVehicleUseCase.UseCase
  let repository: VehiclesInMemoryRepository

  beforeEach(() => {
    repository = new VehiclesInMemoryRepository()
    sut = new UpdateVehicleUseCase.UseCase(repository)
  })

  test('should throws error when product not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  test('should be able to update a product', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = {
      name: 'Vehicle 1',
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
